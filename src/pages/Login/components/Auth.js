// KAKAO
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY
// const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI
// const REDIRECT_URI = 'http://192.168.1.32:3000/kakao'
const REDIRECT_URI = `${process.env.PUBLIC_URL}/kakao`

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// NAVER
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
// const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI
const NAVER_REDIRECT_URI = `${process.env.PUBLIC_URL}/login`
const STATE_STRING = process.env.REACT_APP_STATE_STRING

// 네이버 로그인 JDK 사용 시 auth url
export const NAVER_JDK_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${NAVER_REDIRECT_URI}`;
// 네이버 로그인 REST API 사용시 auth url
export const NAVER_REST_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${STATE_STRING}`;
   