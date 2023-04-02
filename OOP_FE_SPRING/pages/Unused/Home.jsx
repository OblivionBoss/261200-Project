import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

export default function Home() {
  /*const contentBar = {
    backgroundColor: rgba"#f8f8ff",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  };*/
  /*style={contentBar} */
  return (
    <div>
      <Navbar key="index" link="index" />

      <div className="m-5 mt-0 py-4">
        <div className="mx-4 my-4 vstack d-flex justify-content-center">
          <div className="m-3 mt-5">
            <h1 style={{ textAlign: "center" }}>Home</h1>
            <hr />
          </div>

          {/*cards*/}
          <a href="/GameOption" style={{ marginBottom: "20px" }}>
            <Card
              isLeftCard={true}
              imgSrc="./game_icon.png"
              title="PLAY GAME"
              content="Finally, A Worthy Opponent , Our Battle Will Be Legendary! - certain someone"
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
              imgSrc="./help_icon.png"
              title="HOW TO PLAY"
              content="Provide the instruction of this game at very basic level, never too old to learn!"
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
              imgSrc="./info_icon.png"
              title="INFORMATION"
              content="Game description & In-game information"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
