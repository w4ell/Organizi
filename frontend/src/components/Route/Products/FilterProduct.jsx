import React, { useEffect, useState } from "react";
import { categoriesData } from "../../../static/data";

const FilterProduct = ({ onCategoryChange }) => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onCategoryChange(newCategory); // Pass the updated category value
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center  h-full gap-y-3 p-3">
      <div className="flex gap-5">
        <label className="text-[#EE317F] font-semibold p-3">Catégorie:</label>
        <select
          id="category"
          value={category}
          className="w-full p-3 rounded-lg border-slate-300 border-2"
          onChange={handleCategoryChange}
        >
          <option value="">Choose a category</option>
          {categoriesData.map((option, index) => (
            <option value={option.title} key={index}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterProduct;
