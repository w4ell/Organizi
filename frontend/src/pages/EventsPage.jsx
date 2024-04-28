import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          {allEvents?.length === 0
            ? "Aucun événement pour l'instant!"
            : allEvents.map((item) => <EventCard key={item._id} data={item} />)}
        </div>
      )}
    </>
  );
};

export default EventsPage;
