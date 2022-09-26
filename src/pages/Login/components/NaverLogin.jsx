import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
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
        callbackHandle: true,
      }
    );
    naverLogin.init(); //로그인 설정

    // // 로그인한 유저 정보를 직접 접근, 추출 가능
    // naverLogin.getLoginStatus(async function(status){
    //   if (status) {
    //     const userId = naverLogin.user.getEmail();
    //     const userName = naverLogin.user.getName();
    // // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
    //     setUserInfo(naverLogin.user)
    //   }
    // })
  };

  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken()
  };

  const getToken = async () => {
    const token = window.location.href.split('=')[1].split('&')[0]
    console.log("check token>>", token)

    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/member/naver`,
        {token}, 
        {
          withCredentials: true
        }
      );

      if(res.status === 200 || 201){
        navigate('/')
      }
      //서버측에서 로직이 완료되면 홈으로 보내준다
    }
    catch(err) {
      console.error("check error>>", err); 
    }
    
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  },[]);
  

  return (
    <>
      <div id="naverIdLogin"></div>
    </>
  );
};



// https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=CLIENT_ID&state=STATE_STRING&redirect_uri=CALLBACK_URL

export default NaverLogin;