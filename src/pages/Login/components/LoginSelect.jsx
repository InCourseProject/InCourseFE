import React, { useState } from 'react';
import styled from '@emotion/styled';
import { KAKAO_AUTH_URL, NAVER_REST_AUTH_URL } from './Auth';
import NaverLogin from './NaverLogin';

const LoginSelect = (props) => {
  const [ isClick, setIsClick ] = useState(false)

  return(
    <div>
      <button 
        onClick={() => {
          setIsClick(!isClick)
          props.clickCheck(isClick);
        }}>
          이메일로 로그인
      </button>
      <div onClick={() => { window.location.href = NAVER_REST_AUTH_URL }}>
        <button>네이버으로 로그인</button>
        <NaverLogin/>
      </div>

      <button onClick={() => { window.location.href = KAKAO_AUTH_URL }}>카카오톡으로 로그인</button>
    </div>
  );
};
 
export default LoginSelect;