import React, { useState } from 'react';
import styled from '@emotion/styled';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from './Auth';
import NaverLogin from './NaverLogin';

const LoginSelect = (props) => {
  const [ isClick, setIsClick ] = useState(false)

  return(
    <div>
      <button 
        onClick={() => {
          setIsClick(!isClick)
          props.clickCheck(isClick);
        }}>이메일로 로그인</button>
      <NaverLogin onClick={() => { window.location.href = NAVER_AUTH_URL }}/>
      <button onClick={() => { window.location.href = KAKAO_AUTH_URL }}>카카오톡으로 로그인</button>
    </div>
  );
};
 
export default LoginSelect;