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
          <div class="m-4 d-flex justify-content-center overflow-hidden px-2">
            <div class="m-4 d-flex justify-content-right overflow-hidden px-2">
              <div className="construct">
                <h4 style={{ fontFamily: "Lato", color: "#fcad03" }}>
                  {" "}
                  Your Name
                </h4>
                <div /*className="log-inputBox "*/>
                  <input
                    style={{ width: "300px" }}
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <h4 style={{ fontFamily: "Lato", color: "#fcad03" }}>
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
                ></textarea>
                <a href="/WaitRoom">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
