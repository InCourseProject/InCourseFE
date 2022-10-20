/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { colors, fonts, fontWeight, lineHeights } from "../../../lib/constants/GlobalStyle";
import { XCircleIcon } from'@heroicons/react/24/outline'

const SearchHistory = ({history}) => {
  return(
    <StDiv>
      <XCircleIcon style={{width:'1.6rem', color:`${colors.secondary}`}}/>
      <StSpan>{history}</StSpan>
    </StDiv>
  )
};

export default SearchHistory;

const StDiv = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  
  background-color: ${colors.primary};
  margin: 1rem;
  padding: 0.4rem 1.2rem 0.4rem 0.8rem;
  border-radius: 30rem;
`

const StSpan =styled.span`
  margin-left: 0.5rem;
  color: ${colors.black};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.normal};
  line-height: ${lineHeights.caption};
`