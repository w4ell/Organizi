import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  LoginPage,
  SignupPage,
  ShopCreatePage,
  ShopLoginPage,
} from "../routes/Routes.js";

const Auth = () => {
  const params = useParams();
  const { av } = params;
  const [active, setActive] = useState(av ? parseInt(av) : 1);
  useEffect(() => {
    setActive(av ? parseInt(av) : 1);
  }, [av]);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-around">
          <Link to="/">
            <img src="/logo.png" alt="logo" width={200} height={100} />
          </Link>
        </div>
        <div className="flex items-center justify-around mt-5">
          <h2
            className={
              "hidden md:inline-block text-[18px]  leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
          >
            Vous êtes un:
          </h2>
          <button
            className={
              "text-[18px] px-2 py-2 rounded-lg leading-5 font-bold cursor-pointer " +
              (active === 1 || active === 3
                ? "bg-[#EE317F] text-[#ffffff]"
                : "text-[#EE317F]") +
              " 800px:text-[20px]"
            }
            onClick={() => {
              setActive(1);
            }}
          >
            Client
          </button>
          <button
            className={
              "text-[18px] px-2 py-2 rounded-lg leading-5 font-bold cursor-pointer " +
              (active === 2 || active === 4
                ? "bg-[#EE317F] text-[#ffffff]"
                : "text-[#EE317F]") +
              " 800px:text-[20px]"
            }
            onClick={() => {
              setActive(2);
            }}
          >
            Fournisseur
          </button>
        </div>
      </div>
      <div className="relative">
        {active === 1 ? (
          <div>
            <LoginPage />
          </div>
        ) : active === 2 ? (
          <div>
            <ShopLoginPage />
          </div>
        ) : active === 3 ? (
          <div>
            <SignupPage />
          </div>
        ) : active === 4 ? (
          <div>
            <ShopCreatePage />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Auth;
