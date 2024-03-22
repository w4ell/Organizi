import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "En attente" ? (
          <h1 className="text-[20px]">
            Votre commande est en cours de traitement.
          </h1>
        ) : data?.status === "Réservé (payé une avance)" ? (
          <h1 className="text-[20px]">
            Votre commande est réuissie il vous reste de payer le reste.
          </h1>
        ) : data?.status === "Payé" ? (
          <h1 className="text-[20px]">Votre commande est réuissie et payé.</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
