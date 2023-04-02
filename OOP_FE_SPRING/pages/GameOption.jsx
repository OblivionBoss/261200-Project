import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { Client } from "@stomp/stompjs"
import JoinGame from "./JoinGame";
import HostGame from "./HostGame";
import WaitRoom from "./WaitRoom";
import UPBEAT from "./UPBEAT";

const url = "ws://192.168.1.109:8080/upbeat-websocket";
let client;
let username;
let numPlayer;
let host;
let playerNum;
let playerName;
let row;
let col;
let initPlanMin;
let initPlanSec;
let revCost;
let planError;
let winnerNum;
let winnerName;

export default function exp() {
  const [gameState,setGameState] = useState(0);
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState(1);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [playerTurnName, setPlayerTurnName] = useState("");
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [budget, setBudget] = useState(0);
  const [citycenterRow, setCitycenterRow] = useState(0);
  const [citycenterCol, setCitycenterCol] = useState(0);
  const [regionSet, setRegionSet] = useState([]);
  const [lost, setLost] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function sendWait(){
    if (client) {
      if (client.connected) {
        client.publish({
          destination: "/app/wait",
          body: JSON.stringify({
            user: username,
            host: host,
            isClick: "false",
          }),
        });
      }
    }
  }

  function handleGame(body){
    if(body[0][0] === host){
      if(body[0][1] !== "plan" && body[0][1] !== "GameOver"){
        planError = false;
        const gameData = body[0][1];
        const gameDataArr = gameData.split("/");
        setTurn(parseInt(gameDataArr[0]));
        setPlayerTurn(parseInt(gameDataArr[1]));
        setPlayerTurnName(body[parseInt(gameDataArr[1])][1]);
        if(gameDataArr.length !== 2){
          row = parseInt(gameDataArr[2]);
          col = parseInt(gameDataArr[3]);
          initPlanMin = parseInt(gameDataArr[4]);
          initPlanSec = parseInt(gameDataArr[5]);
          revCost = parseInt(gameDataArr[6]);
          for(let i=1 ; i<body.length ; i++){
            if(body[i][0] === username){
              playerNum = i;
              playerName = body[i][1];
              break;
            }
          }
        }
        if(body[playerNum][2] !== "lost"){
          const regionData = body[playerNum][2];
          const regionDataArr = regionData.split("/");
          setBudget(parseInt(regionDataArr[0]));
          setCitycenterRow(parseInt(regionDataArr[1]));
          setCitycenterCol(parseInt(regionDataArr[2]));
          setRegionSet(regionDataArr);
          if(parseInt(gameDataArr[1]) === playerNum){
            setIsMyTurn(true);
          }else{
            setIsMyTurn(false);
          }
        }else{
          setLost(true);
          setIsMyTurn(false);
        }
      }else if(body[0][1] === "plan"){
        if(body[1][0] === username){
          planError = true;
          alert("Syntax Error : "+body[1][1]);
        }
      }else if(body[0][1] === "GameOver"){
        if(body[playerNum][2] === "lost"){
          setLost(true);
          setIsMyTurn(false);
          winnerNum = 0;
          winnerName = "NOBODY";
          for(let i=1 ; i<body.length ; i++){
            if(body[i][2] === "win"){
              winnerNum = i;
              winnerName = body[i][1];
              break;
            }
          }
        }else{
          winnerNum = playerNum;
          winnerName = playerName;
          setIsMyTurn(false);
        }
        setGameOver(true);
      }
    }
  }

  function handleHost(body){
    if(body[0] === username){
      if(body[2] === "false"){
        host = body[1];
        numPlayer = body[3];
        setGameState(3);
        sendWait();
      }else{
        alert("Room name is duplicate!");
      }
    }
  }

  function handleJoin(body){
    if(body[0] === username){
      if(body[2] === "true"){
        if(body[3] === "false"){
          alert("Room is full!");
        }else{
          host = body[1];
          numPlayer = body[3];
          setGameState(3);
          sendWait();
        }
      }else{
        alert("Room name not found!");
      }
    }
  }

  function handleWait(body){
    if(body[1] === host){
      if(body[2] === "true"){
        setGameState(4);
      }else{
        setCount(body[2]);
        setGameState(3);
      }
    }
  }

  useEffect(() => {
    if (!client) {
      username = Math.floor(Math.random()*16777215).toString(16)+Math.floor(Math.random()*16777215).toString(16);
      client = new Client({
        brokerURL: url,
        onConnect: () => {
          client.subscribe("/topic/game", (message) => {
            const body = JSON.parse(message.body);
            handleGame(body);
          });
          client.subscribe("/topic/host", (message) => {
            const body = JSON.parse(message.body);
            handleHost(body);
          });
          client.subscribe("/topic/join", (message) => {
            const body = JSON.parse(message.body);
            handleJoin(body);
          });
          client.subscribe("/topic/wait", (message) => {
            const body = JSON.parse(message.body);
            handleWait(body);
          });
        },
      });
      client.activate();
    }
  }, []);

  if(gameState === 0){
    return (
      <div>
        <div class="m-5 mt-0 py-4">
          <div
            style={{ alignContent: "center" }}
            class="mx-4 my-4 vstack d-flex justify-content-center"
          >
            <div class="m-3">
              <h1 style={{ textAlign: "center" }}>Game Option</h1>
              <hr />
            </div>

            {/* cards */}
            <div onClick={()=>setGameState(1)} style={{ marginBottom: "20px" }}>
              <Card
                isLeftCard={true}
                imgSrc="./multi_icon.png"
                title="JOIN GAME"
                content="Find you opponent and play with them!"
              />
            </div>

            <div onClick={()=>setGameState(2)} style={{ marginBottom: "20px" }}>
              <Card
                isLeftCard={true}
                imgSrc="./hosting_icon.png"
                title="HOST GAME"
                content="Host your own game and play against your friend!"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }else if(gameState === 1){
    return (<div><JoinGame user={client} username={username}></JoinGame></div>)
  }else if(gameState === 2){
    return (<div><HostGame user={client} username={username}></HostGame></div>)
  }else if(gameState === 3){
    return (<div><WaitRoom user={client} username={username} host={host} amountPlayer={count} numPlayer={numPlayer}></WaitRoom></div>)
  }else if(gameState === 4){
    return (<div><UPBEAT user={client} username={username} host={host} row={row} col={col} initPlanMin={initPlanMin} initPlanSec={initPlanSec}
      revCost={revCost} planError={planError} turn={turn} isMyTurn={isMyTurn} playerTurnName={playerTurnName} playerTurn={playerTurn}
      playerName={playerName} playerNum={playerNum} budget={budget} regionSet={regionSet} citycenterRow={citycenterRow} citycenterCol={citycenterCol}
      lost={lost} gameOver={gameOver} winnerName={winnerName} winnerNum={winnerNum}></UPBEAT></div>)
  }
}
