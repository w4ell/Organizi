import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    const deleteEvent = async () => {
      try {
        await axios.delete(`${server}/event/delete-event/${data?._id}`, {
          withCredentials: true,
        });
        console.log("Event deleted successfully");
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    };

    if (
      typeof timeLeft.jours === "undefined" &&
      typeof timeLeft.heures === "undefined" &&
      typeof timeLeft.minutes === "undefined" &&
      typeof timeLeft.secondes === "undefined"
    ) {
      deleteEvent();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, data, server]);

  function calculateTimeLeft() {
    const difference = +new Date(data?.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        secondes: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval, index) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span key={index} className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Evènement expiré</span>
      )}
    </div>
  );
};

export default CountDown;
