import React, { useRef, useEffect, useState } from "react";
import TimeCounter from "../components/TimeCounter";
import Navbar from "../components/Navbar";
import Hexagon from "./Hexagon";
//import { useRouter } from "next/router";
import Link from "next/link";
import EndGame from "./EndGame";
import { Client } from "@stomp/stompjs";

/*import "./components/hexagon.css";*/
const playerColor = ["red","blue","green","yellow","orange"];

export default function UPBEAT(props) {
  const [content, setContent] = useState("");
  const [Text, setText] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  let client = props.user;
  
  function handleText(event) {
    setContent(event.target.value);
    setText(event.target.value.split("\n"));
    // setContent(value);
    // const newLines = value.split("\n");
    // setText(newLines);
    //setText(event.target.value);
  }

  const handleClick = () => {
    if (client) {
      if (client.connected) {
        if(props.isMyTurn){
          client.publish({
            destination: "/app/game/plan",
            body: JSON.stringify({
              user: props.username,
              host: props.host,
              playerNum: props.playerNum,
              isRev: props.turn === 1 || !isEdit ? "false" : "true",
              cons_plan: content,
            }),
          });
          setIsEdit(false);
          setCanEdit(false);
        }
      }
    }
  };

  const handleEdit = () => {
    if(props.budget >= props.revCost){
      setIsEdit(true);
      setCanEdit(true);
    }else{
      alert("Not enough budget!!!");
    }
  }

  /*useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsWin(Math.random() < 0.5 ? false : true); // set isWin to true after 20 seconds
      setShowEnd(true); // show popup after 20 seconds
    }, 20000);
    return () => clearTimeout(timeoutId); // clear timeout when component is unmounted
  }, []);*/

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   //setSelectedRow(searchParams.get("Row"));
  //   //setSelectedColumn(searchParams.get("Column"));
  //   setText(searchParams.get("Text"));
  //   //  const handleBeforeUnload = (event) => {
  //   //    event.preventDefault();
  //   //    router.push("/UPBEAT?Text=" + Text);
  //   //  };

  //   //  window.addEventListener("beforeunload", handleBeforeUnload);

  //   //  return () => {
  //   //    window.removeEventListener("beforeunload", handleBeforeUnload);
  //   //  };
  // }, []);

  return (
    <div id="UPBEAT">
      {props.gameOver && <EndGame isWin={!props.lost} winnerName={props.winnerName} winnerColor={props.winnerNum !== 0 ? playerColor[props.winnerNum-1] : "white"}/>}
      {!props.gameOver && (
        //<Navbar id="NavBar" key="UPBEAT" link="UPBEAT" />
        <div id="EntireSpace" class="mx-5 py-4">
          <div
            id="EntirePadding"
            style={{ alignContent: "center" }}
            class=" vstack d-flex justify-content-center"
          >
            <div id="TitleContainer" class="m-3">
              <h1 id="Title" style={{ textAlign: "center" }}>
                UPBEAT
              </h1>
              <hr />
            </div>

            <div class=" d-flex justify-content-center overflow-hidden px-2">
              <div
                id="leftSide"
                className="cst-show-regions"
                style={{ position: "relative", top: "-80px", height: "800px" }}
              >
                <div
                  id="PlayerTurnTime"
                  class="m-4 d-flex justify-content-center overflow-hidden px-2"
                >
                  <TimeCounter
                    MIN="05"
                    SEC="20"
                    countdownTimestampMs={
                      Date.now() + 5 * 60 * 1000 + 20 * 1000
                    }
                  />
                  <h4
                    id="TurnTime"
                    class="border-0 rounded-3 justify-content-center rounded-3 py-1 px-3 p-3"
                    style={{
                      color: "#fcad03",
                      fontFamily: "Lato",
                      background: playerColor[props.playerTurn-1], //change with player assign colour
                      marginTop: "0px",
                      marginRight: "20px",
                      width: "180px",
                      height: "40px",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "40px",
                    }}
                  >
                    {" "}
                    <strong>{props.playerTurnName}</strong> turn
                  </h4>
                </div>

                <div style={{ marginTop: "50px" }}>
                  <Hexagon row={props.row} col={props.col} citycenterRow={props.citycenterRow} citycenterCol={props.citycenterCol}
                   regionSet={props.regionSet} playerColor={playerColor[props.playerNum-1]} lost={props.lost}></Hexagon>
                </div>
              </div>

              <div class="m-4 d-flex justify-content-right overflow-hidden px-2">
                <div
                  className="construct"
                  style={{ marginLeft: "100px", width: "750px" }}
                >
                  <h4
                    id="TurnTime"
                    class="border-0 rounded-3 justify-content-center rounded-3 py-1 px-3 p-3"
                    style={{
                      color: "#fcad03",
                      fontFamily: "Lato",
                      background: "black" /*"#5e1702"*/,
                      marginTop: "0px",
                      width: "240px",
                      height: "40px",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "40px",
                    }}
                  >
                    {" "}
                    Budget : <strong>{props.budget}</strong>
                  </h4>
                  <h3 style={{ fontFamily: "Lato", color: "#fcad03" }}>
                    {" "}
                    {props.turn === 1 ? "INITIAL " : ""}
                    CONSTRUCTION PLAN
                  </h3>

                  <textarea
                    value={content}
                    onChange={handleText}
                    className="placeholder-color"
                    style={{
                      fontFamily: "Lato",
                      color: "black",
                    }}
                    placeholder="Tips : Remember! Peace was never an option"
                    required
                    disabled={(props.isMyTurn && canEdit) || (props.isMyTurn && props.turn === 1) ? false : true}
                  ></textarea>
                  <div>
                    { props.turn !== 1 ?
                      <button
                        class="border-0 rounded-3 py-1 px-3 p-3"
                        style={{
                          color: "#fcad03",
                          fontFamily: "Lato",
                          background: "#570273",
                          marginRight: "20px",
                        }}
                        onClick={handleEdit}
                        disabled={props.isMyTurn ? false : true}
                      >
                        EDIT {"(cost "+props.revCost+")"} 
                      </button> : <i></i>
                    }
                    <button
                      class="border-0 rounded-3 py-1 px-3 p-3"
                      style={{
                        color: "#5e1702",
                        fontFamily: "Lato",
                        background: "#fcad03",
                      }}
                      onClick={handleClick}
                      disabled={props.isMyTurn ? false : true}
                    >
                      DONE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/*If you can't beat someone in this game, you might also beat them up after this.*/