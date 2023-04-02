import React, { useState } from "react";
import styled from "styled-components";

const HexagonWrapper = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: calc(${(props) => props.width} * 0.866025403784);
  background-color: ${(props) => props.backgroundColor};
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  display: flex;
  align-items: center;
  justify-content: center;

  /* Apply lower opacity when hovered over */
  &:hover {
    opacity: 0.5;
  }
`;

const HexagonText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  visibility: "visible";
`;

const MiniHexagon = ({ width, text, backgroundColor, isCityCenter, row, col, deposit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if(backgroundColor !== "white")
      alert(`Region (${row},${col}) : Deposit = ${deposit}`);
  };

  return (
    <HexagonWrapper
      width={width}
      backgroundColor={backgroundColor}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HexagonText>
        {isCityCenter ? "C" : ""}
      </HexagonText>
    </HexagonWrapper>
  );
};

export default MiniHexagon;
