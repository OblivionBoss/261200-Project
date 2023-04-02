import React, { useState } from "react";
import Region from "../public/Region.png";
import CityCenter from "../public/CityCenter.png";
import City from "../public/City.png";
import MiniHexagon from "../components/MiniHexagon";
export default function Hexagon(props) {
  let row = props.row;
  let column = props.col;
  let regionSet = props.regionSet;
  const BigRegions = [];

  var ownerRegion = new Array(row);
  for(let i=0 ; i<row ; i++){
    ownerRegion[i] = new Array(column);
    for(let j=0 ; j<column ; j++){
      ownerRegion[i][j] = -1;
    }
  }
  if(!props.lost){
    for(let i=3 ; i<regionSet.length ; i+=3){
      ownerRegion[parseInt(regionSet[i])-1][parseInt(regionSet[i+1])-1] = parseInt(regionSet[i+2]);
    }
  }

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

  function findregion(row,col){

  }

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
                  isCityCenter={rowIndex+1 === props.citycenterRow && colIndex+1 === props.citycenterCol}
                  row={rowIndex+1}
                  col={colIndex+1}
                  deposit={ownerRegion[rowIndex][colIndex]}
                  backgroundColor={ownerRegion[rowIndex][colIndex]>0 ? props.playerColor : "white"}
                  text="69" /*"69"*/
                />
              </div>
            ) : (
              <div className="low" id={`${rowIndex},${colIndex}`}>
                <MiniHexagon
                  key={`${rowIndex},${colIndex}`}
                  id={`${rowIndex},${colIndex}`}
                  width="50px"
                  isCityCenter={rowIndex+1 === props.citycenterRow && colIndex+1 === props.citycenterCol}
                  row={rowIndex+1}
                  col={colIndex+1}
                  deposit={ownerRegion[rowIndex][colIndex]}
                  backgroundColor={ownerRegion[rowIndex][colIndex]>0 ? props.playerColor : "white"}
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