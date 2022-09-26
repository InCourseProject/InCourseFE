import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Oauth2Handler = () => {
  const navigate = useNavigate();
  // 인가코드
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('code is(on useEffect)>>>', code);

  useEffect(() => {
    kakaoLogin(code)
  },[]);

  console.log('code is(under useEffect)>>>', code);
  const kakaoLogin = async (code) => {

    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/kakao?code=${code}`);
      console.log(res)
      localStorage.setItem('Authorization', res.headers.Authorization);    //예시로 로컬에 저장함    
      localStorage.setItem('RefreshToken', res.headers.RefreshToken);
      
      if(res.state === 200 || 201){
        navigate('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        window.alert('로그인에 성공했습니다.');
      }
    }catch(err){
      console.log('소셜로그인 에러', err);
      window.alert('로그인에 실패하였습니다.');
      navigate('/login'); // 로그인 실패하면 로그인화면으로 돌려보냄
    };
  }
  return null;
};

export default Oauth2Handler;