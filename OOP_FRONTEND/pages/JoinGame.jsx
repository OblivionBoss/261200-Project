import React, { useRef } from "react";
import Navbar from "../components/Navbar";

export default function JoinGame() {
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
                Local-Host
              </h4>
              <div /*className="log-inputBox"*/>
                <input
                  style={{ width: "300px" }}
                  type="local"
                  placeholder="Local-Host"
                />
              </div>
              <a href="about:blank" target="_blank" rel="noopener noreferrer">
                <span
                  class="border-0 rounded-3 py-1 px-3 p-3"
                  style={{
                    color: "#5e1702",
                    fontFamily: "Lato",
                    background: "#fcad03",
                  }}
                >
                  JOIN
                </span>
                <i></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <form action="/about:blank">
                <div
                  className="border-0 rounded-3 py-1 px-3 p-3"
                  style={{
                    color: "#5e1702",
                    fontFamily: "Lato",
                    background: "#fcad03",
                  }}
                >
                  <input type="submit" value="Join" id="btn" />
                </div>
              </form> */
}
