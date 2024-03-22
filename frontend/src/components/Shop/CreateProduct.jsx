import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import styles from "../../styles/styles";

const CreateProduct = () => {
  const [active, setActive] = useState(1);

  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [type, setType] = useState("Service");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Création reussie!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (active === 1) {
      if (!name) {
        toast.error("Le champ Nom est obligatoire!");
        return;
      }

      if (!description) {
        toast.error("Le champ Description est obligatoire!");
        return;
      }

      if (!location) {
        toast.error("Veuillez sélectionner une ville!");
        return;
      }

      if (!category || category === "Choose a category") {
        toast.error("Veuillez choisir une catégorie!");
        return;
      }

      if (images.length === 0) {
        toast.error("Veuillez importer au moins une image!");
        return;
      }
    } else {
      if (!name) {
        toast.error("Le champ Nom est obligatoire!");
        return;
      }

      if (!description) {
        toast.error("Le champ Description est obligatoire!");
        return;
      }

      if (!category || category === "Choose a category") {
        toast.error("Veuillez choisir une catégorie!");
        return;
      }

      if (discountPrice === 0) {
        toast.error("Le champ Prix est obligatoire!");
        return;
      }

      if (stock === 0) {
        toast.error("Le champ Stock est obligatoire!");
        return;
      }

      if (images.length === 0) {
        toast.error("Veuillez importer au moins une image!");
        return;
      }
    }
    setLoading(true);
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("location", location);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(
      createProduct({
        type: type,
        name,
        description,
        location,
        category,
        tags,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
    setLoading(false);
  };
  return (
    <>
      <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
        <div className="flex items-center justify-around">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => {
              setActive(1);
              setType("Service");
            }}
          >
            Créer un Service
          </h5>
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => {
              setActive(2);
              setType("Product");
            }}
          >
            Créer un Produit
          </h5>
        </div>

        <div className="relative">
          {active === 1 ? (
            <div>
              <h5 className="text-[30px] font-Poppins text-center mt-10">
                Service
              </h5>
              {/* create service form */}
              <form onSubmit={handleSubmit}>
                <br />
                <div>
                  <label className="pb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrez le nom de votre produit..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    cols="30"
                    rows="8"
                    type="text"
                    name="description"
                    value={description}
                    className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Entrez la description de votre produit..."
                  ></textarea>
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="cities"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Sélectionner la ville</option>
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
                <br />
                <div>
                  <label className="pb-2">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Choose a category">
                      Choisissez une catégorie
                    </option>
                    {categoriesData &&
                      categoriesData.map((i) => (
                        <option value={i.title} key={i.title}>
                          {i.title}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="pb-2">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={tags}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Entrez vos tags de produits..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Importer des images <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name=""
                    id="upload"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                  <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                      <AiOutlinePlusCircle
                        size={30}
                        className="mt-3"
                        color="#555"
                      />
                    </label>
                    {images &&
                      images.map((i) => (
                        <img
                          src={i}
                          key={i}
                          alt=""
                          className="h-[120px] w-[120px] object-cover m-2"
                        />
                      ))}
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      disabled={loading}
                      className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        <div className="relative">
          {active === 2 ? (
            //add product start
            <div>
              <h5 className="text-[30px] font-Poppins text-center mt-10">
                Produit
              </h5>
              {/* create product form */}
              <form onSubmit={handleSubmit}>
                <br />
                <div>
                  <label className="pb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrez le nom de votre produit..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    cols="30"
                    rows="8"
                    type="text"
                    name="description"
                    value={description}
                    className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Entrez la description de votre produit..."
                  ></textarea>
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Choose a category">
                      Choisissez une catégorie
                    </option>
                    {categoriesData &&
                      categoriesData.map((i) => (
                        <option value={i.title} key={i.title}>
                          {i.title}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="pb-2">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={tags}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Entrez vos tags de produits..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Prix
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={discountPrice}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="Entrez le prix de votre produit..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Stock de produits <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={stock}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Entrez votre stock de produits..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Importer des images <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name=""
                    id="upload"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                  <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                      <AiOutlinePlusCircle
                        size={30}
                        className="mt-3"
                        color="#555"
                      />
                    </label>
                    {images &&
                      images.map((i) => (
                        <img
                          src={i}
                          key={i}
                          alt=""
                          className="h-[120px] w-[120px] object-cover m-2"
                        />
                      ))}
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      disabled={loading}
                      className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default CreateProduct;
