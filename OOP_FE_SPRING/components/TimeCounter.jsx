import React from "react";
import { useState, useEffect } from "react";
import { getRemainingTimeUnitMsTimestamp } from "./TimeCounterUtil";

const TimeCounter = ({ MIN, SEC, countdownTimestampMs }) => {
  const defaultRemainingTime = {
    seconds: SEC,
    minutes: MIN,
  };

  // const countdownTimestampMs =
  //   Date.now() + parseInt(MIN) * 60 * 1000 + parseInt(SEC) * 1000;

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemaininngTime(countdownTimestampMs);
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [countdownTimestampMs]);
  function updateRemaininngTime(countdown) {
    setRemainingTime(getRemainingTimeUnitMsTimestamp(countdown));
  }

  return (
    //<div class="m-4 d-flex justify-content-center overflow-hidden px-2">
    <h4
      id="TurnTime"
      //   style={{
      //     marginTop: "0px",
      //     width: "80px",
      //     height: "40px",
      //     padding: "5px",
      //   }}
      class="border-0 rounded-3 justify-content-center rounded-3 py-1 px-3 p-3"
      style={{
        color: "#5e1702",
        fontFamily: "Lato",
        background: "#fcad03",
        marginTop: "0px",
        marginRight: "20px",
        width: "120px",
        height: "40px",
        padding: "5px",
        textAlign: "center",
        borderRadius: "40px",
      }}
    >
      <strong>
        {remainingTime.minutes}:{remainingTime.seconds}
      </strong>
    </h4>
    //</div>
  );
};

export default TimeCounter;