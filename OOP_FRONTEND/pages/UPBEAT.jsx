import React, { useRef, useEffect, useState } from "react";
import TimeCounter from "../components/TimeCounter";
import Navbar from "../components/Navbar";
import Hexagon from "./Hexagon";
//import { useRouter } from "next/router";
import Link from "next/link";
import EndGame from "./EndGame";
import { Client } from "@stomp/stompjs";

const url = "ws://10.83.245.232:8080/project";
let client;
/*import "./components/hexagon.css";*/

export default function UPBEAT() {
  const [content, setContent] = useState("");
  const [Text, setText] = useState([]);
  const [showEnd, setShowEnd] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsWin(Math.random() < 0.5 ? false : true); // set isWin to true after 20 seconds
      setShowEnd(true); // show popup after 20 seconds
    }, 20000);
    return () => clearTimeout(timeoutId); // clear timeout when component is unmounted
  }, []);

  useEffect(() => {
    if (!client) {
      client = new Client({
        brokerURL: url,
        onConnect: () => {
          client.subscribe("/app/game");
          client.subscribe("/topic/game");
        },
      });

      client.activate();
    }
  }, []);

  function handleText(event) {
    setContent(event.target.value);
    setText(event.target.value.split("\n"));
    // setContent(value);
    // const newLines = value.split("\n");
    // setText(newLines);
    //setText(event.target.value);
  }
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
      {showEnd && <EndGame isWin={isWin} />}
      {!showEnd && (
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
                      background: "#570273", //change with player assign colour
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
                    <strong>Player's</strong> turn
                  </h4>
                </div>

                <div style={{ marginTop: "50px" }}>
                  <Hexagon />
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
                    Budget : <strong>1000000</strong>
                  </h4>
                  <h3 style={{ fontFamily: "Lato", color: "#fcad03" }}>
                    {" "}
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
                  ></textarea>
                  <div>
                    <a
                      href="about:blank"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        class="border-0 rounded-3 py-1 px-3 p-3"
                        style={{
                          color: "#fcad03",
                          fontFamily: "Lato",
                          background: "#570273",
                          marginRight: "20px",
                        }}
                      >
                        EDIT
                      </span>
                      <i></i>
                    </a>
                    <Link
                      href="/UPBEAT"
                      //as={useRouter().asPath}
                    >
                      <a>
                        <span
                          class="border-0 rounded-3 py-1 px-3 p-3"
                          style={{
                            color: "#5e1702",
                            fontFamily: "Lato",
                            background: "#fcad03",
                          }}
                        >
                          DONE
                        </span>
                        <i></i>
                      </a>
                    </Link>
                    {/* <a
                    href="about:blank"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      class="border-0 rounded-3 py-1 px-3 p-3"
                      style={{
                        color: "#5e1702",
                        fontFamily: "Lato",
                        background: "#fcad03",
                      }}
                    >
                      DONE
                    </span>
                    <i></i>
                  </a> */}
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
