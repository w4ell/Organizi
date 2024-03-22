import React from "react";
import Slider from "react-slick";

export default function ProductGallery({ data }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="h-[500px] max-w-full">
      {data?.images?.length <= 1 ? (
        <img
          className="
    object-contain 
    h-full 
    w-full 
  "
          src={data?.images[0].url}
          alt=""
        />
      ) : (
        <Slider {...settings}>
          {data?.images.map((photo, index) => (
            <img
              className="
        object-contain 
        w-full 
        max-h-[500px]
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
    </div>
  );
}
