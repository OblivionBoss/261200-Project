import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function exp() {
  return (
    <div>
      <Navbar key="GameOption" link="GameOption" />

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
          <a href="/JoinGame" style={{ marginBottom: "20px" }}>
            <Card
              isLeftCard={true}
              imgSrc="./multi_icon.png"
              title="JOIN GAME"
              content="Find you opponent and play with them!"
            />
          </a>

          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginBottom: "20px" }}
          >
            <Card
              isLeftCard={true}
              imgSrc="./hosting_icon.png"
              title="HOST GAME"
              content="Host your own game and play against your friend!"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
