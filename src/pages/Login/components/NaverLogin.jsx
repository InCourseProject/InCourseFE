import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { colors } from "../../../lib/constants/GlobalStyle";

const NaverLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    getNaverToken()
  },[]);

  const getNaverToken = async () => {
    if (!location.search) return;
    try{
      // 서버주소 + 코드정보로 get요청을 보내면 response에 토큰을 받을수있다.
      const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/naver?code=${code}&stat=${process.env.REACT_APP_STATE_STRING}`);
    
      if(res.status === 200 || 201) {        
        localStorage.setItem('Authorization', 'Bearer ' + res.data.authorization);
        localStorage.setItem('RefreshToken', res.data.refreshToken);
        navigate('/')
      };
    }
    catch(err) {
      console.error("check error>>", err); 
    };
  };
  return null;
};


export default NaverLogin;

