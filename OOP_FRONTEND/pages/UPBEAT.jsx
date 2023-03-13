import React from "react";
import Hyperlink from "../components/Hyperlink";
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
            <div className="cst-show-regions">
              <Hexagon />
            </div>
            <div class="m-4 d-flex justify-content-right overflow-hidden px-2">
              <div className="construct">
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
                <a href="about:blank" target="_blank" rel="noopener noreferrer">
                  <span
                    className="border-0 rounded-3 py-1 px-3 p-3"
                    style={{
                      color: "#5e1702",
                      fontFamily: "Lato",
                      background: "#fcad03",
                    }}
                  >
                    START
                  </span>
                  <i></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*If you can't beat someone in this game, you might also beat them up after this.*/
