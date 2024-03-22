import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
  const [discountPrices, setDiscountPrices] = useState([]);

  const handleDiscountPriceChange = (index, value) => {
    const newDiscountPrices = [...discountPrices];
    newDiscountPrices[index] = value;
    setDiscountPrices(newDiscountPrices);
  };
  const handleUpdateServicePrice = async (index, itemId) => {
    try {
      await axios
        .put(
          `${server}/order/update-service-price/${id}/${itemId}`,
          {
            discountPrice: discountPrices[index],
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Prix mis avec success");
          window.location.reload();
        });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Détails de la commande</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Liste des commandes
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Commande ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placé le: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5" key={index}>
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="mr-10"
              width={80}
              height={80}
            />

            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <select
                value=""
                className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
                readOnly
              >
                {item.bookedDates.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
              {item.discountPrice !== 0 ? (
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                  {item.discountPrice} TND{" "}
                  {item.type === "Product" ? `x ${item.qty}` : ""}
                </h5>
              ) : (
                <div>
                  <input
                    className="mt-3 h-8"
                    type="number"
                    placeholder="saisir votre prix"
                    onChange={(e) =>
                      handleDiscountPriceChange(index, e.target.value)
                    }
                  />
                  <button
                    className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[35px] text-[15px]`}
                    onClick={() => handleUpdateServicePrice(index, item?._id)}
                  >
                    Mis a jour
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Prix Total: <strong>{data?.totalPrice}TND</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Adresse de livraison:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Information de paiement:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      {/*
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
      >
        {[
          "En attente",
          "En attente pour paiment",
          "En cours de livraison",
          "Réservé (payé une avance)",
          "Payé",
          "Livré (Payé)",
        ]
          .slice(
            [
              "En attente",
              "En attente pour paiment",
              "En cours de livraison",
              "Réservé (payé une avance)",
              "Payé",
              "Livré (Payé)",
            ].indexOf(data?.status)
          )
          .map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
      </select>

      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={orderUpdateHandler}
      >
        Mis a jour
      </div>
      */}
    </div>
  );
};

export default OrderDetails;
