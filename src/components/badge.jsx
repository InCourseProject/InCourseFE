/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { colors, fonts, fontWeight, lineHeights } from "../lib/constants/GlobalStyle";

const Badge = ({children, title, css}) => {

  const badgeStyle = {
    '아싸':{
      backgroundColor: colors.primary
    },
    '자발적 아싸':{
      backgroundColor: colors.secondary
    },
    '흔남흔녀':{
      backgroundColor: colors.caution
    },
    '인싸':{
      backgroundColor: colors.success
    },
    '핵인싸':{
      backgroundColor: colors.danger
    },
  }

  return(
    <Stdiv 
      css={{
        ...badgeStyle[title],
        css
      }}>
      <div>
        {!children ? '신입' : children} 
      </div>
    </Stdiv>
  );
};

export default Badge;

const Stdiv = styled.div`
  width: fit-content;
  
  background-color: ${colors.gray};
  padding: 0.3rem 1.6rem;
  box-sizing: border-box;
  border: none;
  border-radius: 4rem;

  color: ${colors.white};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
  text-align: center;
`