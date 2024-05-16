import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import Ratings from "../../Products/Ratings";
import Slider from "react-slick";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <div
            className="
        aspect-square 
        w-full 
        relative 
        overflow-hidden 
        rounded-xl
        border-2
        shadow-lg
        drop-shadow-lg
        border-[#EE317F]
      "
          >
            {data?.images?.length <= 1 ? (
              <img
                className="
    object-cover 
    h-full 
    w-full 
    group-hover:scale-110 
    transition
  "
                src={data?.images[0].url}
                alt=""
              />
            ) : (
              <Slider {...settings}>
                {data.images.map((photo, index) => (
                  <img
                    className="
        object-cover 
        h-full 
        w-full 
        group-hover:scale-110 
        transition
      "
                    src={photo.url}
                    alt=""
                    key={index}
                  />
                ))}
              </Slider>
            )}

            <div
              className="
        absolute
        top-3
        right-3
      "
            >
              {click ? (
                <AiFillHeart
                  size={22}
                  className="cursor-pointer"
                  onClick={() => removeFromWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  className="cursor-pointer"
                  onClick={() => addToWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Add to wishlist"
                />
              )}
            </div>
          </div>
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            {data?.type === "Service" && (
              <div className="font-semibold text-md">{data?.location}</div>
            )}
            <div className="font-semibold text-lg text-[#EE317F]">
              {data.name.length > 20
                ? data.name.slice(0, 20) + "..."
                : data.name}
            </div>
            {data?.type === "Product" && (
              <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                  {data?.discountPrice}
                  TND
                </div>
              </div>
            )}

            <span className="font-[400] text-[15px] text-[#68d284]">
              {data?.sold_out} vendu
            </span>
            <Ratings rating={data?.ratings} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
