import React from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { colors, fonts, fontWeight, lineHeights } from "../../../lib/constants/GlobalStyle";


const MyPageLogout = () => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  const navigate = useNavigate();

  //----------- logout handler -----------//
  const logoutHandler = async () => {
    try {
      const logout = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/logout`,
        {
          headers: {
            Authorization: `${accessToken}`,
            RefreshToken: `${refreshToken}`,
          }
        });
      console.log(logout)

      if (logout.status === 200 || 201) {
        localStorage.clear();
        window.alert('로그아웃 되었습니다.')
        navigate('/')
      }
    }
    catch (err) {
      // window.alert('CheckConsole!')
      console.error(err.response);
      localStorage.clear();
      navigate('/')
    };
  };

  return (
    <StDiv onClick={logoutHandler}>
      로그아웃
    </StDiv>
  )
};

export default MyPageLogout;

const StDiv = styled.div`
  width: 100%;
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
  cursor: pointer;
`