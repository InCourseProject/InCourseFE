import React from "react";
import styled from "@emotion/styled";
import CardCompnent from "./components/CardCompnent";
const Card = () => {

  return (
    <StWrap >
      <CardCompnent />
    </StWrap>
  );
};

export default Card;

const StWrap = styled.div`
  min-width: 280px;
`

