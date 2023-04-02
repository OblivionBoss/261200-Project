import React, { useRef, useEffect, useState } from "react";

export default function EndGame(props) {
  const [countdown, setCountdown] = useState(20);

  //   useEffect(() => {
  //     document.body.style.filter = "blur(5px)"; // blur the entire page when popup is opened
  //     return () => {
  //       document.body.style.filter = ""; // remove blur effect when popup is closed
  //     };
  //   }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.location.href = "/"; // redirect to another page after 5 seconds
    }, countdown * 1000);
    return () => clearTimeout(timeoutId); // clear timeout when component is unmounted
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(intervalId); // clear interval when component is unmounted
  }, [countdown]);

  return (
    <div
      className="construct"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "480px",
        width: "800px",
        marginLeft: "0px",
        marginTop: "0px",
      }}
    >
      {/* <h1 style={{ fontSize: "100px", color: "#fcad03" }}>
        {isWin ? "🎉YOU WIN🎉" : "💥YOU LOSE💥"}
      </h1> */}

      {props.isWin ? (
        <div>
          <h1 style={{ fontSize: "100px", color: "#03fc6f" }}>🎉YOU WIN🎉</h1>
          <h1 style={{ fontSize: "100px", color: props.winnerColor }}>{props.winnerName} WIN</h1>
        </div>
      ) : (
        <div>
          <h1 style={{ fontSize: "100px", color: "#fc0303" }}>💥YOU LOSE💥</h1>
          <h1 style={{ fontSize: "100px", color: props.winnerColor }}>{props.winnerName} WIN</h1>
        </div>
      )}
      <h3 style={{ color: "#fcad03" }}>Redirected back in {countdown}...</h3>
    </div>
  );
}
