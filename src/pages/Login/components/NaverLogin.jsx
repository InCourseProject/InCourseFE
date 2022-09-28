import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { colors } from "../../../lib/constants/GlobalStyle";

const NaverLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('code is>>>', code);

  useEffect(() => {
    getNaverToken()
  },[]);

  const getNaverToken = async () => {
    if (!location.search) return;
    try{
      // 서버주소 + 코드정보로 get요청을 보내면 response에 토큰을 받을수있다.
      const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/naver?code=${code}&stat=${process.env.REACT_APP_STATE_STRING}`);
      console.log("res >>", res)
    
      if(res.status === 200 || 201) {        
        console.log(res.data.message)
        localStorage.setItem('Authorization', res.data.authorization);
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

const NaverIdLogin = styled.div`
	display: none;
`

const NaverLoginBtn = styled.button`
	display: flex;
	align-items: center;
	width: 360px;
	height: 56px;
	background-color: #03c75a;
	border-radius: 6px;
`

// 로그인 버튼 사용가이드 링크를 들어가면 이미지를 받아 이렇게 적용이 가능하다 ! 
const NaverIcon = styled.div`
	width: 30px;
	height: 30px;
	margin-left: 10px;
	background: url('/images/Login/navericon.png') no-repeat center;
	background-size: 30px;
`

const NaverLoginTitle = styled.span`
	margin-left: 90px;
	color: ${colors.white};
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;
  `