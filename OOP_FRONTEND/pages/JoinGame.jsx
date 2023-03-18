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
                  style={{
                    width: "200px",
                    marginLeft: "5px",
                  }}
                  type="text"
                  placeholder="Please enter your local-host"
                />
              </div>
              <a href="/WaitRoom" style={{ marginTop: "20px" }}>
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
