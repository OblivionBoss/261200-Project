import React, { useRef, useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
//import Hyperlink from "../components/Hyperlink";
import Navbar from "../components/Navbar";
//import Hexagon from "./Hexagon";
/*import "./components/hexagon.css";*/
import { Client } from "@stomp/stompjs";


export default function HostGame(props) {
  const [Name, setName] = useState("");
  const [Host, setHost] = useState("");
  const [Row, setSelectedRow] = useState("9");
  const [Column, setSelectedColumn] = useState("9");
  const [Player, setSelectedPlayer] = useState("2");
  const [ICM, setICM] = useState("0");
  const [ICS, setICS] = useState("0");
  const [RPM, setRPM] = useState("0");
  const [RPS, setRPS] = useState("0");
  const [IB, setIB] = useState("10000");
  const [ID, setID] = useState("100");
  const [MD, setMD] = useState("1000000");
  const [RC, setRC] = useState("100");
  const [IR, setIR] = useState("5");
  
  let client = props.user;

  function handleName(event) {
    setName(event.target.value);
  }

  function handleHost(event) {
    setHost(event.target.value);
  }

  function handleChangeRow(event) {
    setSelectedRow(event.target.value);
  }

  function handleChangeColumn(event) {
    setSelectedColumn(event.target.value);
  }

  function handleChangePlayer(event) {
    setSelectedPlayer(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleInitialConsMin(event) {
    setICM(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleInitialConsSec(event) {
    setICS(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleRevPlanMin(event) {
    setRPM(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleRevPlanSec(event) {
    setRPS(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleInitialBudget(event) {
    setIB(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleInitialDeposit(event) {
    setID(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleMaxDeposit(event) {
    setMD(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleRevCost(event) {
    setRC(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  function handleIntRate(event) {
    setIR(event.target.value);
    //console.log(event.target.value + " and " + Player);
  }

  const setConfig = () => {
    if (client) {
      if (client.connected) {
        client.publish({
          destination: "/app/host",
          body: JSON.stringify({
            user: props.username,
            username: Name,
            host: Host,
            m: Row,
            n: Column,
            num_player: Player,
            init_plan_min: ICM,
            init_plan_sec: ICS,
            init_budget: IB,
            init_center_dep: ID,
            plan_rev_min: RPM,
            plan_rev_sec: RPS,
            rev_cost: RC,
            max_dep: MD,
            interest_pct: IR,
          }),
        });
      }
    }
  };

  function createSelect(N, values) {
    // Create a new <select> element
    const select = document.createElement("select");

    // Loop through N and create <option> elements with corresponding values
    for (let i = 0; i < N; i++) {
      const option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      select.appendChild(option);
    }

    // Return the new <select> element
    return select;
  }

  function HOST() {
    const str = "/WaitRoom?Player=" + Player;

    return (
      <a href={str} style={{ marginTop: "20px" }} onClick={() => setConfig()}>
        <span
          class="border-0 rounded-3 py-1 px-3 p-3"
          style={{
            color: "#5e1702",
            fontFamily: "Lato",
            background: "#fcad03",
          }}
        >
          HOST
        </span>
        <i></i>
      </a>
    );
  }
  return (
    <div>
      <Navbar key="UPBEAT" link="UPBEAT" />
      <div class="mx-5 py-4">
        <div
          style={{ alignContent: "center" }}
          class="m-4 vstack d-flex justify-content-center"
        >
          <div class="m-4 d-flex justify-content-center overflow-hidden px-2">
            <div class="m-4 d-flex justify-content-right overflow-hidden px-2">
              <div className="construct" style={{ width: "600px" }}>
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
                      color: "gold",
                      width: "130px",
                      marginTop: "7px",
                      marginLeft: "5px",
                    }}
                  >
                    Your Name
                  </h4>
                  <input
                    value={Name}
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
                        width: "130px",
                        marginTop: "7px",
                        marginLeft: "5px",
                      }}
                    >
                      Room Name
                    </h4>
                    <input
                      onChange={handleHost}
                      style={{
                        width: "200px",
                        marginLeft: "5px",
                      }}
                      type="text"
                      placeholder="Please enter room name"
                    />
                  </div>
                

                <h2
                  style={{
                    color: "white",
                    fontSize: "50px",
                    marginBottom: "5%",
                    marginTop: "5%",
                  }}
                >
                  CONFIGURATION PLAN
                </h2>
                <div class=" d-flex justify-content-center overflow-hidden px-2">
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "green",
                      marginRight: "50px",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "#fcad03",
                        width: "45px",
                        marginLeft: "5px",
                        marginTop: "7px",
                      }}
                    >
                      Row
                    </h5>
                    <select
                      value={Row}
                      onChange={handleChangeRow}
                      style={{ width: "45px" }}
                    >
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                    </select>
                  </div>
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "green",
                      marginRight: "50px",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "#fcad03",
                        width: "75px",
                        marginLeft: "5px",
                        marginTop: "7px",
                      }}
                    >
                      Column
                    </h5>
                    <select
                      value={Column}
                      onChange={handleChangeColumn}
                      style={{ width: "45px" }}
                    >
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                    </select>
                  </div>
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "purple",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "#fcad03",
                        width: "60px",
                        marginLeft: "5px",
                        marginTop: "7px",
                      }}
                    >
                      Player
                    </h5>
                    <select
                      value={Player}
                      onChange={handleChangePlayer}
                      style={{ width: "45px" }}
                    >
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
                <div class=" d-flex justify-content-left overflow-hidden px-2">
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "burlywood",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "purple",
                        width: "235px",
                        marginTop: "7px",
                        marginLeft: "5px",
                      }}
                    >
                      Initial Construction Time
                    </h5>
                    <select
                      value={ICM}
                      onChange={handleInitialConsMin}
                      style={{ width: "45px" }}
                    >
                      {Array.from(Array(61).keys()).map((number) => (
                        <option key={number} value={number.toString()}>
                          {number}
                        </option>
                      ))}
                    </select>
                    <select
                      value={ICS}
                      onChange={handleInitialConsSec}
                      style={{ width: "45px" }}
                    >
                      {Array.from(Array(60).keys()).map((number) => (
                        <option key={number} value={number.toString()}>
                          {number}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  class=" d-flex justify-content-center rounded-3 overflow-hidden"
                  style={{
                    backgroundColor: "aqua",
                    marginBottom: "10px",
                  }}
                >
                  <h5
                    style={{
                      fontFamily: "Lato",
                      color: "purple",
                      width: "235px",
                      marginTop: "7px",
                      marginLeft: "5px",
                    }}
                  >
                    Revision Planning Time
                  </h5>
                  <select
                    value={RPM}
                    onChange={handleRevPlanMin}
                    style={{ width: "45px" }}
                  >
                    {Array.from(Array(61).keys()).map((number) => (
                      <option key={number} value={number.toString()}>
                        {number}
                      </option>
                    ))}
                  </select>
                  <select
                    value={RPS}
                    onChange={handleRevPlanSec}
                    style={{ width: "45px" }}
                  >
                    {Array.from(Array(60).keys()).map((number) => (
                      <option key={number} value={number.toString()}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
                <div class=" d-flex justify-content-left overflow-hidden px-2">
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "gold",
                      marginRight: "50px",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "purple",
                        width: "120px",
                        marginTop: "7px",
                        marginLeft: "5px",
                      }}
                    >
                      Initial Budget
                    </h5>
                    <input
                      value={IB}
                      onChange={handleInitialBudget}
                      style={{
                        width: "80px",
                        marginLeft: "5px",
                      }}
                      type="text"
                      placeholder="ex. 10000"
                    />
                  </div>
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "gold",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "purple",
                        width: "135px",
                        marginTop: "7px",
                        marginLeft: "5px",
                      }}
                    >
                      Initial Deposit
                    </h5>
                    <input
                      value={ID}
                      onChange={handleInitialDeposit}
                      style={{
                        width: "80px",
                        marginLeft: "5px",
                      }}
                      type="text"
                      placeholder="ex. 100"
                    />
                  </div>
                </div>

                <div class=" d-flex justify-content-center overflow-hidden px-2">
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "red",
                      marginRight: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "gold",
                        width: "100px",
                        marginTop: "7px",
                        marginLeft: "5px",
                      }}
                    >
                      Maximum Deposit
                    </h5>
                    <input
                      value={MD}
                      onChange={handleMaxDeposit}
                      style={{
                        width: "90px",
                        marginLeft: "5px",
                      }}
                      type="text"
                      placeholder="ex. 1000000"
                    />
                  </div>
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "darkred",
                      marginRight: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "gold",
                        width: "90px",
                        marginTop: "7px",
                        marginLeft: "5px",
                      }}
                    >
                      Revision Cost
                    </h5>
                    <input
                      value={RC}
                      onChange={handleRevCost}
                      style={{
                        width: "80px",
                        marginLeft: "5px",
                      }}
                      type="text"
                      placeholder="ex. 100"
                    />
                  </div>
                  <div
                    class=" d-flex justify-content-center rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: "royalblue",
                      marginBottom: "10px",
                    }}
                  >
                    <h5
                      style={{
                        fontFamily: "Lato",
                        color: "gold",
                        width: "80px",
                        marginTop: "7px",
                        marginLeft: "5px",
                      }}
                    >
                      Interest Rate
                    </h5>
                    <input
                      value={IR}
                      onChange={handleIntRate}
                      style={{
                        width: "80px",
                        marginLeft: "5px",
                      }}
                      type="text"
                      placeholder="0 - 100"
                    />
                  </div>
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
                  CREATE ROOM
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*<h4 style={{ fontFamily: "Lato", color: "#fcad03" }}>
                  {" "}
                  Configuration plan
                </h4>
                <textarea
                  className="placeholder-color"
                  style={{
                    fontFamily: "Lato",
                    color: "black",
                  }}
                  placeholder="Configuration plan here..."
                  required
                ></textarea> */
