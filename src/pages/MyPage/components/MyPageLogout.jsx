import React from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";


const MyPageLogout = () => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  const navigate = useNavigate();

  //----------- logout handler -----------//
  const logoutHandler = async () => {
    try {
      const logout = await axios.get('http://3.36.71.186:8080/api/member/logout',
        {
          headers: {
            Authorization: `${accessToken}`,
            RefreshToken: `${refreshToken}`,
          }
        });
      console.log(logout)

      if (logout.status === 200 || 201) {
        localStorage.removeItem('Authorization'); //accessToken
        localStorage.removeItem('RefreshToken'); //refreshToken
        window.alert('로그아웃 되었습니다.')
        navigate('/')
      }
      else {
        console.log("not ok")
      }
    }
    catch (err) {
      window.alert('CheckConsole!')
      console.error(err.response);
    };
  };

  return (
    <>
    <button onClick={logoutHandler}>로그아웃</button>
    </>
  )
};

export default MyPageLogout;