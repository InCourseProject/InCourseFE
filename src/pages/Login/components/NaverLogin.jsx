import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { colors } from "../../../lib/constants/GlobalStyle";


const NaverLogin = () => {
  const naverRef = useRef()
  const location = useLocation();


  const navigate = useNavigate();
  const { naver } = window

  // 로그인 기능 추가
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
        clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
        callbackUrl: 'http://192.168.1.32:3000/login',
        // callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URI,
        isPopup: false, // 팝업을 통한 연동처리 여부, true 면 팝업
        loginButton: {color: "green", type: 2, height: 40}, // 로그인 버튼의 타입을 지정
        callbackHandle: true,
      });
    naverLogin.init(); //로그인 설정

  };

  // http://192.168.1.32:3000/login#access_token=AAAANdNmKHLL3ptCEUlLfjGZq-o7Tb6C8-f7PYC0IsvXqW-gljlU0vb-HcuVWEOmBjkkV0wLLsan3bNqR75ey2f6V9g&state=0921167a-9f93-400f-b3e2-3b9d3a4de45e&token_type=bearer&expires_in=3600
  const getNaverToken = async () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0]; //token 출력
    console.log(token)
    
    try{
      // const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/member/naver`, {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/naver`, //서버주소+코드정보 로 get요청을 보내면 response에 토큰을 받을수있다.
        { token },
        {
          withCredentials: true
        });
      console.log("res >>", res)
      
      if(res.status === 200 || 201) {        
        localStorage.setItem('Authorization', res.headers.Authorization);
        localStorage.setItem('RefreshToken', res.headers.RefreshToken);
        navigate('/')
      };
    }
    catch(err) {
      console.error("check error>>", err); 
    };
  };

   useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  },[]);

  const handleNaverLogin = () => {
		naverRef.current.children[0].click()
	}
  

  return (
    <>
      <NaverIdLogin ref={naverRef} id="naverIdLogin" />
			<NaverLoginBtn onClick={handleNaverLogin}>
				<NaverIcon alt="navericon" />
				<NaverLoginTitle>네이버로 로그인</NaverLoginTitle>
			</NaverLoginBtn>
    </>
  );
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