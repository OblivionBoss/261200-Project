import React, { useState } from "react";
import Region from "../public/Region.png";
import CityCenter from "../public/CityCenter.png";
import City from "../public/City.png";
import MiniHexagon from "../components/MiniHexagon";
export default function Hexagon() {
  let row = 16; //16
  let column = 16; //16
  const BigRegions = [];
  const centerC = 2;
  const centerR = 5;
  const C = 2;
  const R = 4;

  const [hoveredHex, setHoveredHex] = useState(null);
  const [clickedHex, setClickedHex] = useState(null);
  //const [clickedHexColor, setClickedHexColor] = useState(null);

  const handleHexClick = (rowIndex, colIndex) => {
    setClickedHex({ row: rowIndex, col: colIndex, clicked: false });
  };

  const handleHexHover = (rowIndex, colIndex) => {
    setHoveredHex({
      row: rowIndex,
      col: colIndex,
      value: Math.floor(Math.random() * 100),
    });
  };

  //max 16*16
  //min 9*9
  if (row > 16) row = 16;
  else if (row < 9) row = 9;
  if (column > 16) column = 16;
  else if (column < 9) column = 9;

  //keep picture hexagon(region) in array
  for (let i = 0; i < row; i++) {
    const hexrow = [];
    for (let j = 0; j < column; j++) {
      hexrow.push(
        "Pneuma"
        // <div>
        //   <MiniHexagon text="123" />
        // </div>
      );
      // if (j === centerC - 1 && i === centerR - 1)
      //   hexrow.push("./Region.png"); //"./CityCenter.png"
      // else if (j === C - 1 && i === R - 1)
      //   hexrow.push("./Region.png"); //"./City.png"
      // else hexrow.push("./Region.png");
    }
    BigRegions.push(hexrow);
  }

  return (
    <div
      id="HexagonGrid"
      style={{
        width: "60%",
        //display: "flex" ,
        justifycontent: "center",
        alignitems: "center",
        marginLeft: "20%",
      }}
    >
      {BigRegions.map((hexrow, rowIndex) => (
        <div
          id={"HexagonRow" + `${rowIndex}`}
          className="rowcss"
          key={rowIndex}
        >
          {hexrow.map((img, colIndex) =>
            colIndex % 2 === 0 ? (
              <div id={`${rowIndex},${colIndex}`}>
                <MiniHexagon
                  key={`${rowIndex},${colIndex}`}
                  id={`${rowIndex},${colIndex}`}
                  width="50px"
                  backgroundColor="white"
                  changeColor="green"
                  text="69" /*"69"*/
                />
              </div>
            ) : (
              <div className="low" id={`${rowIndex},${colIndex}`}>
                <MiniHexagon
                  key={`${rowIndex},${colIndex}`}
                  id={`${rowIndex},${colIndex}`}
                  width="50px"
                  backgroundColor="white"
                  changeColor="green"
                  text="420" /*"420"*/
                />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

/*return (
    <div
      style={{
        width: "60%",
        //display: "flex" ,
        justifycontent: "center",
        alignitems: "center",
        marginLeft: "17.5%",
      }}
    >
      {BigRegions.map((hexrow, rowIndex) => (
        <div className="rowcss" key={rowIndex}>
          {hexrow.map((img, colIndex) =>
            colIndex % 2 === 0 ? (
              <img
                key={`${rowIndex}-${colIndex}`}
                src={img}
                className="low"
                style={{ width: "10%" }}
              />
            ) : (
              <img
                key={`${rowIndex}-${colIndex}`}
                src={img}
                style={{ width: "10%" }}
              />
            )
          )}
        </div>
      ))}
    </div>
  );*/

/*
{hoveredHex &&
                  hoveredHex.row === rowIndex &&
                  hoveredHex.col === colIndex && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {hoveredHex.value}
                    </div>
                  )}*/
