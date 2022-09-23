const REST_API_KEY = '58a918ce1a7631c2f849c76b91744d19';
const REDIRECT_URI = 'http://192.168.1.32:3000/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;