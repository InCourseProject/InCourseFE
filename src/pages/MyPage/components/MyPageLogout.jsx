import React from "react";
import axios from "axios";
import styled from "@emotion/styled";


const MyPageLogout = () => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  const some = null

  //----------- logout handler -----------//
  const logoutHandler = async () => {
    try {
      const logout = await axios.post('http://3.36.71.186:8080/api/member/logout',
        some,
        {
          headers: {
            Authorization: `${accessToken}`,
            RefreshToken: `${refreshToken}`,
          }
        });
      console.log(logout)

      if (logout.status === 200 || 201) {
        console.log("status ok")
        // navigate('/')
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