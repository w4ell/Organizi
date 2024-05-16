import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import styles from "../../../styles/styles";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img src="/logo.png" alt="" width={125} height={50} />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to={`/shop/${seller._id}`}>
            <div
              className={`${styles.button} !w-full !h-[42px] px-5 !rounded-[5px]`}
            >
              <span className="text-white">Voir boutique</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
