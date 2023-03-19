import React, { useRef, useEffect, useState } from "react";
import TimeCounter from "../components/TimeCounter";
import Navbar from "../components/Navbar";
import Hexagon from "./Hexagon";
import Link from "next/link";
import { useRouter } from "next/router";
/*import "./components/hexagon.css";*/

export default function InitialCon() {
  const [Row, setSelectedRow] = useState("");
  const [Column, setSelectedColumn] = useState("");
  const [Player, setSelectedPlayer] = useState("");
  const [Text, setText] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSelectedRow(searchParams.get("Row"));
    setSelectedColumn(searchParams.get("Column"));
    setSelectedPlayer(searchParams.get("Player"));
    setTimeout(() => {
      window.location.href = "/UPBEAT?Text=" + Text; //?Row=" + Row + "&Column=" + Column + "&Player=" + Player;
    }, 305000);
  }, []);

  function handleText(event) {
    setText(event.target.value);
  }

  return (
    <div>
      <div class="mx-5 py-4">
        <div
          style={{ alignContent: "center" }}
          class="m-4 vstack d-flex justify-content-center"
        >
          <div class="m-3 justify-content-center">
            <h1 style={{ textAlign: "center" }}>Initial Construction Plan</h1>

            <hr />
          </div>

          <div class="m-4 d-flex justify-content-center overflow-hidden px-2">
            <div class="m-4 d-flex justify-content-right overflow-hidden px-2">
              <div className="construct" style={{ marginLeft: "100px" }}>
                <TimeCounter
                  countdownTimestampMs={Date.now() + 5 * 60 * 1000 + 5 * 1000}
                />
                <h2 style={{ fontFamily: "Lato", color: "#fcad03" }}>
                  {" "}
                  CONSTRUCTION PLAN
                </h2>

                <textarea
                  className="placeholder-color"
                  id="InitialConst"
                  onChange={handleText}
                  style={{
                    fontFamily: "Lato",
                    color: "black",
                  }}
                  placeholder="Tips : Remember! Peace was never an option"
                  required
                ></textarea>
                <div>
                  <Link
                    href={"/UPBEAT?Text=" + `${Text}`}
                    as={useRouter().asPath}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
