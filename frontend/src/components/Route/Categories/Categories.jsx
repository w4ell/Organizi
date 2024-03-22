import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  const handleSubmit = (title) => {
    navigate(`/products?category=${title}`);
  };
  return (
    <>
      {/*
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div> 
      
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[75px] object-cover filter grayscale"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
      */}
      <div class="p-5 sm:p-8">
        <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-1">
          <div class="before:rounded-2xl relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[#000000] before:opacity-50">
            <img
              className="rounded-2xl"
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="absolute inset-0 h-full w-full flex flex-col justify-center items-center text-[#EE317F] font-bold z-10 rounded">
              <button
                class=" h-[50px] p-2 border-[2px] border-[#EE317F] hover:bg-[#EE317F] flex justify-center items-center text-white font-semibold rounded"
                onClick={() => handleSubmit(categoriesData[0].title)}
              >
                {categoriesData[0].title}
              </button>
            </div>
          </div>
          <div class="before:rounded-2xl relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[#000000] before:opacity-50">
            <img
              className="mt-1 rounded-2xl"
              src="https://tunisia-tomorrow.com/wp-content/uploads/2019/06/61376443_2480957158605078_4280272408994119680_o.jpg"
            />
            <div className="absolute inset-0 h-full w-full flex flex-col justify-center items-center text-[#EE317F] font-bold z-10 rounded">
              <button
                class=" h-[50px] p-2 border-[2px] border-[#EE317F] hover:bg-[#EE317F] flex justify-center items-center text-white font-semibold rounded"
                onClick={() => handleSubmit(categoriesData[3].title)}
              >
                {categoriesData[3].title}
              </button>
            </div>
          </div>
          <div class="before:rounded-2xl relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[#000000] before:opacity-50">
            <img
              className="rounded-2xl"
              src="https://plus.unsplash.com/premium_photo-1661479328777-e1692d224ae6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="absolute inset-0 h-full w-full flex flex-col justify-center items-center text-[#EE317F] font-bold z-10 rounded">
              <button
                class=" h-[50px] p-2 border-[2px] border-[#EE317F] hover:bg-[#EE317F] flex justify-center items-center text-white font-semibold rounded"
                onClick={() => handleSubmit(categoriesData[1].title)}
              >
                {categoriesData[1].title}
              </button>
            </div>
          </div>
          <div class=" before:rounded-2xl relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[#000000] before:opacity-50">
            <img
              className="rounded-2xl"
              src="https://static.bhphotovideo.com/explora/sites/default/files/shutterstock_57342523.jpg"
            />
            <div className="absolute inset-0 h-full w-full flex flex-col justify-center items-center text-[#EE317F] font-bold z-10 rounded">
              <button
                class=" h-[50px] p-2 border-[2px] border-[#EE317F] hover:bg-[#EE317F] flex justify-center items-center text-white font-semibold rounded"
                onClick={() => handleSubmit(categoriesData[7].title)}
              >
                {categoriesData[7].title}
              </button>
            </div>
          </div>
          <div class="before:rounded-2xl relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[#000000] before:opacity-50">
            <img
              className="mt-1 rounded-2xl"
              src="https://www.mariageatoutprix.com/wp-content/uploads/2021/02/extraservices-serveurs-mariage-reception-tunis-13.jpg"
            />
            <div className="absolute inset-0 h-full w-full flex flex-col justify-center items-center text-[#EE317F] font-bold z-10 rounded">
              <button
                class=" h-[50px] p-2 border-[2px] border-[#EE317F] hover:bg-[#EE317F] flex justify-center items-center text-white font-semibold rounded"
                onClick={() => handleSubmit(categoriesData[2].title)}
              >
                {categoriesData[2].title}
              </button>
            </div>
          </div>
          <div class="before:rounded-2xl relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[#000000] before:opacity-50">
            <img
              className="rounded-2xl"
              src="https://149451308.v2.pressablecdn.com/wp-content/uploads/2018/04/Mediterranean-Meets-Africa-Colorful-Tunisian-Wedding-Inspiration-Ness-Photography-43-555x832.jpg"
            />
            <div className="absolute inset-0 h-full w-full flex flex-col justify-center items-center text-[#EE317F] font-bold z-10 rounded">
              <button
                class=" h-[50px] p-2 border-[2px] border-[#EE317F] hover:bg-[#EE317F] flex justify-center items-center text-white font-semibold rounded"
                onClick={() => handleSubmit(categoriesData[10].title)}
              >
                {categoriesData[10].title}..
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
