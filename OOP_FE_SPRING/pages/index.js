import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Home() {
  /*const contentBar = {
    backgroundColor: rgba"#f8f8ff",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  };*/
  /*style={contentBar} */

  return (
    <div>
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
              href="https://docs.google.com/document/d/178zlqZoyArUVYOj2J9ZbJuMi6aIJDD7tY7OyVKaqOsU/edit?usp=sharing"
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
              href="https://github.com/OblivionBoss/261200-Project"
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

/*<div className="m-4 mt-5 d-flex justify-content-center overflow-hidden">
          {/* Introduction }*/
/*<img
            src="./me.jpg"
            alt=""
            width="250px"
            height="250px"
            style={{ objectFit: "cover" }}
            className="rounded-circle mx-4 my-auto"
          />
        </div>*/
