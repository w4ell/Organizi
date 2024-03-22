import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import FilterProduct from "../components/Route/Products/FilterProduct";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
const ProductsPage = () => {
  const [categoryData, setCategoryData] = useState("");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredData = allProducts?.filter((product) => {
      const matchesCategory =
        categoryData === "" || product.category === categoryData;

      const isProductType = product.type === "Product";
      return isProductType && matchesCategory;
    });

    setData(filteredData);
  }, [allProducts, categoryData]);

  const handleCategoryChange = (category) => {
    setCategoryData(category);
  };

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(15);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <Header activeHeading={4} />
          <br />
          <br />
          <div className="flex flex-col md:flex-row justify-between items-center max-w-[500px] border-[2px] border-[#EE317F] search">
            <FilterProduct onCategoryChange={handleCategoryChange} />
          </div>
          <div className={`${styles.section} mt-10`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                currentItems.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>
          <div className="flex justify-center items-center">
            <ReactPaginate
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              activeClassName={"active"}
              breakLabel="..."
              onPageChange={handlePageClick}
              pageCount={pageCount}
              pageRangeDisplayed={3}
              previousLabel={
                <IconContext.Provider
                  value={{ color: "#B8C1CC", size: "36px" }}
                >
                  <AiFillLeftCircle />
                </IconContext.Provider>
              }
              nextLabel={
                <IconContext.Provider
                  value={{ color: "#B8C1CC", size: "36px" }}
                >
                  <AiFillRightCircle />
                </IconContext.Provider>
              }
              renderOnZeroPageCount={null}
              marginPagesDisplayed={0}
            />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
