/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors, fonts, fontWeight, lineHeights } from "../lib/constants/GlobalStyle";
import axios from "axios";

const Badge = ({children, css}) => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  
  const fetchBadge = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/haert`,
      {
        headers:{
          Authorization: accessToken,
          RefreshToken: refreshToken,
        }
        });
      console.log(res)
    }
    catch(err){
      console.error(err);
    }
  }

  // useEffect(() => {
  //   fetchBadge();
  // },[]);

  return(
    <Stdiv css={css}>
      <div>
        {children}
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