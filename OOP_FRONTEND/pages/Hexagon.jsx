import React from "react";
import Region from "../public/Region.png";
import CityCenter from "../public/CityCenter.png";
import City from "../public/City.png";

export default function Hexagon() {
  let row = 9; //16
  let column = 9; //16
  const BigRegions = [];
  const centerC = 2;
  const centerR = 5;
  const C = 2;
  const R = 4;

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
      if (j === centerC - 1 && i === centerR - 1)
        hexrow.push("./Region.png"); //"./CityCenter.png"
      else if (j === C - 1 && i === R - 1)
        hexrow.push("./Region.png"); //"./City.png"
      else hexrow.push("./Region.png");
    }
    BigRegions.push(hexrow);
  }

  return (
    <div>
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
  );
}
