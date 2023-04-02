import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function JoinGame(props) {
  const [Name, setName] = useState("");
  const [Host, setHost] = useState("");

  let client = props.user;

  /*useEffect(() => {
    if (!client) {
      client = new Client({
        brokerURL: url,
        onConnect: () => {
          client.subscribe("/app/game", (message) => {
            const body = JSON.parse(message.body);
            //setNameP1(body["nameP1"]);
            //setP1Ready(body["p1Ready"]);
            //setP2Ready(body["p2Ready"]);
          });

          client.subscribe("/topic/game", (message) => {
            const body = JSON.parse(message.body);
            //setNameP1(body["nameP1"]);
            //setP1Ready(body["p1Ready"]);
            //setP2Ready(body["p2Ready"]);
          });
        },
      });

      client.activate();
    }
  }, []);*/

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   setSelectedRow(searchParams.get("Row"));
  //   setSelectedColumn(searchParams.get("Column"));
  //   setSelectedPlayer(searchParams.get("Player"));
  //   //setTimeout(() => {
  //   //  window.location.href = "/UPBEAT?Text=" + Text; //?Row=" + Row + "&Column=" + Column + "&Player=" + Player;
  //   //}, 305000);
  // }, []);

  function handleName(event) {
    setName(event.target.value);
  }

  function handleHost(event) {
    setHost(event.target.value);
  }

  const setConfig = () => {
    if (client) {
      if (client.connected) {
        client.publish({
          destination: "/app/join",
          body: JSON.stringify({
            user: props.username,
            username: Name,
            host: Host,
          }),
        });
      }
    }
  };
  return (
    // <div id="log-bg-video">
    //   <video src={myLogin} autoPlay loop muted></video>
    //</div>
    <div>
      <Navbar key="JoinGame" link="JoinGame" />

      <div class="m-5 mt-0 py-4">
        <div
          style={{ alignContent: "center" }}
          class="mx-4 my-4 vstack d-flex justify-content-center"
        >
          <div class="m-4 d-flex justify-content-center overflow-hidden px-2">
            <div className="construct">
              <h2
                style={{
                  color: "white",
                  fontSize: "50px",
                  marginBottom: "5%",
                  marginTop: "5%",
                }}
              >
                JOIN GAME
              </h2>
              <div
                class=" d-flex justify-content-center rounded-3 overflow-hidden"
                style={{
                  backgroundColor: "Black",
                  marginTop: "10px",
                }}
              >
                <h4
                  style={{
                    fontFamily: "Lato",
                    color: "White",
                    width: "120px",
                    marginTop: "7px",
                    marginLeft: "5px",
                  }}
                >
                  Your Name
                </h4>
                <input
                  onChange={handleName}
                  style={{
                    width: "200px",
                    marginLeft: "5px",
                  }}
                  type="text"
                  placeholder="Please enter your name"
                />
              </div>
              <div
                class=" d-flex justify-content-center rounded-3 overflow-hidden"
                style={{
                  backgroundColor: "White",
                  marginTop: "10px",
                }}
              >
                <h4
                  style={{
                    fontFamily: "Lato",
                    color: "Black",
                    width: "120px",
                    marginTop: "7px",
                    marginLeft: "5px",
                  }}
                >
                  Local-Host
                </h4>
                <input
                  onChange={handleHost}
                  style={{
                    width: "200px",
                    marginLeft: "5px",
                  }}
                  type="text"
                  placeholder="Please enter your local-host"
                />
              </div>
                <button
                  class="border-0 rounded-3 py-1 px-3 p-3"
                  style={{
                    color: "#5e1702",
                    fontFamily: "Lato",
                    background: "#fcad03",
                  }}
                  onClick={setConfig}
                >
                  JOIN
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}