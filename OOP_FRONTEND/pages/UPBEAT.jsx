import React from "react";
import TimeCounter from "../components/TimeCounter";
import Navbar from "../components/Navbar";
import Hexagon from "./Hexagon";
/*import "./components/hexagon.css";*/

export default function UPBEAT() {
  return (
    <div>
      <Navbar key="UPBEAT" link="UPBEAT" />
      <div class="mx-5 py-4">
        <div
          style={{ alignContent: "center" }}
          class="m-4 vstack d-flex justify-content-center"
        >
          <div class="m-3">
            <h1 style={{ textAlign: "center" }}>UPBEAT</h1>
            <hr />
          </div>

          <div class="m-4 d-flex justify-content-center overflow-hidden px-2">
            <div
              className="cst-show-regions"
              style={{ position: "relative", top: "-80px" }}
            >
              <div class="m-4 d-flex justify-content-center overflow-hidden px-2">
                <TimeCounter
                  countdownTimestampMs={Date.now() + 5 * 60 * 1000 + 5 * 1000}
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
              <div className="construct">
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
                  <a
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*If you can't beat someone in this game, you might also beat them up after this.*/
