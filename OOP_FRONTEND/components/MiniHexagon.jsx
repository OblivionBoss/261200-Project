import React from "react";
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
`;

const HexagonText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const MiniHexagon = ({ width, text, backgroundColor }) => (
  <HexagonWrapper width={width} backgroundColor={backgroundColor}>
    <HexagonText>{text}</HexagonText>
  </HexagonWrapper>
);

export default MiniHexagon;
