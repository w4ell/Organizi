import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { categoriesData } from "../../../static/data";

const FilterService = ({
  onLocationChange,
  onDatesChange,
  onCategoryChange,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [category, setCategory] = useState("");
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    onLocationChange(location);
  };
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onCategoryChange(newCategory); // Pass the updated category value
  };

  useEffect(() => {
    if (selectedDates) {
      onDatesChange(selectedDates.map((date) => date.format()));
    }
  }, [selectedDates]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-around h-full gap-y-3 p-3 sm:ml-0 md:ml-[-150px] lg:ml-0">
      <div className="flex gap-2">
        <label className="text-[#EE317F] font-semibold p-3">Catégorie:</label>
        <select
          id="category"
          value={category}
          className="w-full p-3 rounded-lg border-slate-300 border-2"
          onChange={handleCategoryChange}
        >
          <option value="">Sélectionnez</option>
          {categoriesData.map((option, index) => (
            <option value={option.title} key={index}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <label className="text-[#EE317F] font-semibold p-3">Ville:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange}
          className="w-full p-3 rounded-lg border-slate-300 border-2"
        >
          <option value="">Sélectionnez</option>
          <option value="Tunis">Tunis</option>
          <option value="Sfax">Sfax</option>
          <option value="Sousse">Sousse</option>
          <option value="Kairouan">Kairouan</option>
          <option value="Bizerte">Bizerte</option>
          <option value="Gabès">Gabès</option>
          <option value="Ariana">Ariana</option>
          <option value="Gafsa">Gafsa</option>
          <option value="La Marsa">La Marsa</option>
          <option value="Kasserine">Kasserine</option>
          <option value="Ben Arous">Ben Arous</option>
          <option value="Monastir">Monastir</option>
          <option value="Médenine">Médenine</option>
          <option value="Nabeul">Nabeul</option>
          <option value="Tataouine">Tataouine</option>
          <option value="Hammamet">Hammamet</option>
          <option value="Douz">Douz</option>
          <option value="Mahdia">Mahdia</option>
          <option value="El Kef">El Kef</option>
          <option value="Beja">Beja</option>
          <option value="Le Kram">Le Kram</option>
          <option value="Rades">Rades</option>
          <option value="Jendouba">Jendouba</option>
          <option value="Tozeur">Tozeur</option>
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <label className="text-[#EE317F] font-semibold p-3">Date:</label>
        <DatePicker
          multiple
          value={selectedDates}
          onChange={setSelectedDates}
          format="DD/MM/YYYY"
          placeholder="Dates de reservation"
          minDate={new Date()}
        />
      </div>
    </div>
  );
};

export default FilterService;
