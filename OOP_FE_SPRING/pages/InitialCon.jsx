import React, { useRef, useEffect, useState } from "react";
import TimeCounter from "../components/TimeCounter";
import Navbar from "../components/Navbar";
import Hexagon from "./Hexagon";
import Link from "next/link";
import { useRouter } from "next/router";

import { Client } from "@stomp/stompjs";

const url = "ws://10.83.245.232:8080/project"; //"ws://echo.websocket.org:8080";
let client;

export default function InitialCon() {
  //const [Row, setSelectedRow] = useState("");
  //const [Column, setSelectedColumn] = useState("");
  //const [Player, setSelectedPlayer] = useState("");

  const [content, setContent] = useState("");
  const [Text, setText] = useState([]);

    // async function loadEditor() {
    //   const [AceEditor, modeJava, themeEclipse, extLanguageTools] = await Promise.all([
    //     import("react-ace"),
    //     import("ace-builds/src-noconflict/mode-java"),
    //     import("ace-builds/src-noconflict/theme-eclipse"),
    //     import("ace-builds/src-noconflict/ext-language_tools"),
    //   ]);

    //   setEditorLoaded(true);
    // }

    // loadEditor();
  // // useEffect(() => {
  // //   const searchParams = new URLSearchParams(window.location.search);
  // //   setSelectedRow(searchParams.get("Row"));
  // //   setSelectedColumn(searchParams.get("Column"));
  // //   setSelectedPlayer(searchParams.get("Player"));
  // //   //setTimeout(() => {
  // //   //  window.location.href = "/UPBEAT?Text=" + Text; //?Row=" + Row + "&Column=" + Column + "&Player=" + Player;
  // //   //}, 305000);
  // // }, []);

  function handleText(event) {
    setContent(event.target.value);
    setText(event.target.value.split("\n"));
    // setContent(value);
    // const newLines = value.split("\n");
    // setText(newLines);
    //setText(event.target.value);
  }

  const setConfig = () => {
    if (client) {
      if (client.connected) {
        client.publish({
          destination: "/app/config",
          body: JSON.stringify({
            Config: Text,
          }),
        });
      }
    }
  };

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
              <div
                className="construct"
                style={{ marginLeft: "100px", width: "750px" }}
              >
                <TimeCounter
                  MIN="03"
                  SEC="20"
                  countdownTimestampMs={Date.now() + 3 * 60 * 1000 + 20 * 1000}
                />
                <h2 style={{ fontFamily: "Lato", color: "#fcad03" }}>
                  {" "}
                  CONSTRUCTION PLAN
                </h2>
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
                  <Link
                    onClick={() => setConfig()}
                    href="/UPBEAT" //{"/UPBEAT?Text=" + `${Text}`}
                    as={useRouter().asPath}
                  >
                    <a>
                      <button
                        class="border-0 rounded-3 py-1 px-3 p-3"
                        style={{
                          color: "#5e1702",
                          fontFamily: "Lato",
                          background: "#fcad03",
                        }}
                      >
                        DONE
                      </button>
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