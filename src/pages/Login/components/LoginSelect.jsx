import React from 'react';
import styled from '@emotion/styled';
import { KAKAO_AUTH_URL } from './Auth';

const LoginSelect = ({click, clickCheck}) => {
  const onClickHandler = () => {
    console.log('childeren to parents');
    clickCheck(click === true);
  }

  return(
    <div>
      <button onClick={onClickHandler}>이메일로 로그인</button>
      <button>네이버로 로그인</button>
      <button onClick={() => { window.location.href = KAKAO_AUTH_URL }}>카카오톡으로 로그인</button>
    </div>
  );
};
 
export default LoginSelect;