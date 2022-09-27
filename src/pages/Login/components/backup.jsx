import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const NaverLogin = () => {
  const location = useLocation();
  const code = location.search.split('=')[1];
  console.log('code >>', code)
  const state = location.search.split('=')[2];
  console.log('state >>', state)
  const navigate = useNavigate();
  const { naver } = window

  // 로그인 기능 추가
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId(
      {
        clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
        callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URI,
        isPopup: false, // 팝업을 통한 연동처리 여부, true 면 팝업
        loginButton: {color: "green", type: 2, height: 40}, // 로그인 버튼의 타입을 지정
        // callbackHandle: true,
      }
    );
    naverLogin.init(); //로그인 설정

  };

  const getNaverToken = async () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0]; //token 출력
    
    try{
      // const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/member/naver`, {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/naver?code=${code}&state=${state}`, //서버주소+코드정보 로 get요청을 보내면 response에 토큰을 받을수있다.
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
  

  // const userAccessToken = () => {
  //   window.location.href.includes('access_token') && getToken()
  // };

  // const getToken = async () => {
  //   const token = window.location.href.split('=')[1].split('&')[0]
  //   console.log("check token>>", token)

  //   try{
  //     const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/member/naver`,
  //       {token}, 
  //       {
  //         withCredentials: true
  //       }
  //     );

  //     if(res.status === 200 || 201){
  //       navigate('/')
  //     }
  //     //서버측에서 로직이 완료되면 홈으로 보내준다
  //   }
  //   catch(err) {
  //     console.error("check error>>", err); 
  //   }
    
  // };

  // useEffect(() => {
  //   initializeNaverLogin();
  //   userAccessToken();
  // },[]);
  

  return (
    <>
      <div id="naverIdLogin"></div>
    </>
  );
};


export default NaverLogin;