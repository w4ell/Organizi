import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img src="/logo.png" alt="logo" width={200} height={100} />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Chercher un service ou produit..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#EE317F] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData &&
            searchData.length !== 0 &&
            searchTerm.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-[100%]">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div
                          className="w-full flex items-start-py-3 hover:bg-[#f2f2f2]"
                          key={index}
                        >
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="mr-[10px]"
                            width={70}
                            height={70}
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {isSeller && (
            <div className={`${styles.button} p-3`}>
              <Link to="/dashboard">
                <h1 className="text-[#fff] flex items-center">
                  Tableau de bord
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
          {!isAuthenticated && !isSeller && (
            <div className={`${styles.button} p-3`}>
              <Link to="/auth/1">
                <h1 className="text-[#fff] flex items-center">
                  Connexion
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
          {isAuthenticated && !isSeller && (
            <div className={`${styles.button} p-3`}>
              <Link to="/auth/2">
                <h1 className="text-[#fff] flex items-center">
                  Zone Fournisseur
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-50" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#EE317F] h-[70px] z-50`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : isSeller && !isAuthenticated ? (
                  <>
                    <Link to="/auth/1">
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                  </>
                ) : null}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="/logo.png"
                alt="logo"
                width={125}
                height={100}
                className="mt-2"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData &&
                    searchData.length !== 0 &&
                    searchTerm.length !== 0 ? (
                      <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                        {searchData &&
                          searchData.map((i, index) => {
                            return (
                              <Link to={`/product/${i._id}`} key={index}>
                                <div
                                  className="w-full flex items-start-py-3 hover:bg-[#f2f2f2]"
                                  key={index}
                                >
                                  <img
                                    src={`${i.images[0]?.url}`}
                                    alt=""
                                    className="mr-[10px]"
                                    width={50}
                                    height={50}
                                  />
                                  <h1>{i.name}</h1>
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              {isSeller && (
                <div className={`${styles.button} p-3`}>
                  <Link to="/dashboard">
                    <h1 className="text-[#fff] flex items-center">
                      Tableau de bord
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
              )}
              {!isAuthenticated && !isSeller && (
                <div className={`${styles.button} p-3`}>
                  <Link to="/auth/1">
                    <h1 className="text-[#fff] flex items-center">
                      Connexion
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
              )}
              {isAuthenticated && !isSeller && (
                <div className={`${styles.button} p-3`}>
                  <Link to="/auth/2">
                    <h1 className="text-[#fff] flex items-center">
                      Zone Fournisseur
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
              )}
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : isSeller && !isAuthenticated ? (
                  <>
                    <Link
                      to="/auth/1"
                      className="text-[18px] pr-[10px] text-[#000]"
                    >
                      Connexion
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
