import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineSearch } from "react-icons/ai";
import DatePicker from "react-multi-date-picker";
import { categoriesData } from "../../../static/data";
const images = [
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "image 1",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1663837827386-2eb667eca095?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "image 2",
  },
];
const Hero = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [category, setCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDates, setSearchDates] = useState([]);
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    setSearchLocation(location);
  };
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setSearchCategory(newCategory);
  };

  useEffect(() => {
    if (selectedDates) {
      setSearchDates(selectedDates.map((date) => date.format()));
    }
  }, [selectedDates]);
  const handleSearch = (event) => {
    const searchParams = {
      location: searchLocation,
      dates: searchDates,
      category: searchCategory,
    };
    const queryString = new URLSearchParams(searchParams).toString();

    return `/services?${queryString}`;
  };
  return (
    <Carousel
      showStatus={false}
      showThumbs={false}
      autoPlay
      interval={3000}
      infiniteLoop={true}
      stopOnHover={true}
      swipeable={true}
      emulateTouch={true}
      showArrows={false}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.src} alt={image.alt} />
          <div className="legend flex flex-col items-center">
            <h1 className="text-[25px] leading-[1.2] 800px:text-[60px] text-[#ffffff] font-[600] capitalize">
              Rendez vos événements spéciaux <br /> inoubliables avec notre
              plateforme
            </h1>
            <p className="pt-2 mb-0 md:mb-40 text-[12px] 800px:text-[25px] font-[Poppins] font-[400] text-[black] hidden sm:block">
              Créez des souvenirs magiques avec notre sélection exclusive de
              services pour tous vos événements heureux.
            </p>
            <form
              className="flex flex-col md:flex-row justify-between w-full max-w-[1200px] items-center search"
              onSubmit={handleSearch}
            >
              <div className="box flex flex-col w-full">
                <span>Oû?</span>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  className="w-full p-3 rounded-lg border-[#EE317F] border-2 text-black"
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
              <div className="box  flex flex-col w-full text-[#EE317F]">
                <span>Quand?</span>
                <DatePicker
                  multiple
                  value={selectedDates}
                  onChange={setSelectedDates}
                  format="DD/MM/YYYY"
                  placeholder="Sélectionnez"
                  minDate={new Date()}
                />
              </div>
              <div className="box flex flex-col w-full">
                <span>Quoi?</span>
                <select
                  id="category"
                  value={category}
                  className="w-full p-3 rounded-lg border-[#EE317F] border-2 text-black"
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
              <Link
                to={handleSearch()}
                className="bg-[#EE317F] hover:bg-[#ff87b9] text-[#ffffff] rounded-full p-3"
                type="submit"
              >
                <AiOutlineSearch size={30} />
              </Link>
            </form>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Hero;
