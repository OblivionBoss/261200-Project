import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// This page will be automately directed you to game page (UPBEAT) once player are full.
export default function WaitRoom(props) {
  //const [Row, setSelectedRow] = useState("");
  //const [Column, setSelectedColumn] = useState("");

  let numPlayer = props.numPlayer;
  let amountPlayer = props.amountPlayer;
  let client = props.user;

  const handleClick = () => {
    if (client) {
      if (client.connected) {
        if(numPlayer === amountPlayer){
          client.publish({
            destination: "/app/wait",
            body: JSON.stringify({
              user: props.username,
              host: props.host,
              isClick: "true",
            }),
          });
          client.publish({
            destination: "/app/game/new",
            body: JSON.stringify({
              user: props.username,
              host: props.host,
              isClick: "true",
            }),
          });
        }
      }
    }
  };

  /*useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    //setSelectedRow(searchParams.get("Row"));
    //setSelectedColumn(searchParams.get("Column"));
    setSelectedPlayer(searchParams.get("Player"));
    if (count === parseInt(Player)) {
      setTimeout(() => {
        window.location.href = "/InitialCon"; //?Row=" + Row + "&Column=" + Column + "&Player=" + Player;
      }, 3000);
    }
  }, [count]);*/

  return (
    <div class="m-4 d-flex justify-content-right overflow-hidden px-2">
      <div
        className="construct"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "560px",
          marginLeft: "0px",
          marginTop: "0px",
        }}
      >
        <h2 style={{ color: "white", fontSize: "100px" }}>WAITING...</h2>
        <h3 style={{ color: "#fcad03" }}>STILL WAITING FOR SOME PLAYER.</h3>
        <span
          class="border-0 rounded-3 py-1 px-3 p-3"
          style={{
            background: "#570273" /*"#0352fc"*/,
            color: "#fcad03",
            fontFamily: "Lato",
            fontSize: "80px",
          }}
        >
          <strong>
            {amountPlayer} / {numPlayer}
          </strong>
        </span>
        <button 
          class="border-0 rounded-3 py-1 px-3 p-3"
          style={{
            color: "#5e1702",
            fontFamily: "Lato",
            background: "#fcad03",
          }}
          onClick={handleClick}
          disabled={numPlayer === amountPlayer ? false : true}
        >
          START GAME
        </button>
      </div>
    </div>
  );
}
