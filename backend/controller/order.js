const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const User = require("../model/user");
const Product = require("../model/product");

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (
        req.body.status === "En attente" ||
        req.body.status === "En attente pour paiment"
      ) {
        order.status = req.body.status;
      }
      if (req.body.status === "En cours de livraison") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }
      if (
        req.body.status === "Réservé (payé une avance)" ||
        req.body.status === "Payé" ||
        req.body.status === "Livré (Payé)"
      ) {
        order.status = req.body.status;
        for (const item of order.cart) {
          const product = await Product.findById(item._id);

          if (product) {
            product.bookedDates.push(...item.bookedDates);

            await product.save({ validateBeforeSave: false });
          }
        }
      }
      if (req.body.status === "Payé" || req.body.status === "Livré (Payé)") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Réussie";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);

        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update service price for seller
router.put(
  "/update-service-price/:orderId/:itemId",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { orderId, itemId } = req.params;
      const { discountPrice } = req.body;

      const updatedItem = await Order.findOneAndUpdate(
        { _id: orderId, "cart._id": itemId },
        {
          $set: { "cart.$.discountPrice": discountPrice },
          $inc: { totalPrice: discountPrice },
        },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }

      res
        .status(200)
        .json({ message: "Discount price updated successfully", updatedItem });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for Admin
router.put(
  "/admin-update-order-status/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      const shopId = order.cart[0].shopId;
      console.log(shopId);
      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (
        req.body.status === "En attente" ||
        req.body.status === "En attente pour paiment"
      ) {
        order.status = req.body.status;
      }
      if (req.body.status === "En cours de livraison") {
        order.status = req.body.status;
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }
      if (
        req.body.status === "Réservé (payé une avance)" ||
        req.body.status === "Payé" ||
        req.body.status === "Livré (Payé)"
      ) {
        order.status = req.body.status;
        for (const item of order.cart) {
          const product = await Product.findById(item._id);

          if (product) {
            product.bookedDates.push(...item.bookedDates);

            await product.save({ validateBeforeSave: false });
          }
        }
      }
      if (req.body.status === "Payé" || req.body.status === "Livré (Payé)") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Réussie";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerInfo(order.totalPrice - serviceCharge);
        updateAdminBalance(serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(shopId);

        seller.availableBalance = amount;

        await seller.save();
      }
      async function updateAdminBalance(amount) {
        const Admin = await User.findOne({ role: "Admin" });

        Admin.balance += amount;

        await Admin.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update service price for admin
router.put(
  "/admin-update-service-price/:orderId/:itemId",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { orderId, itemId } = req.params;
      const { discountPrice } = req.body;

      const updatedItem = await Order.findOneAndUpdate(
        { _id: orderId, "cart._id": itemId },
        {
          $set: { "cart.$.discountPrice": discountPrice },
          $inc: { totalPrice: discountPrice },
        },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }

      res
        .status(200)
        .json({ message: "Discount price updated successfully", updatedItem });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
