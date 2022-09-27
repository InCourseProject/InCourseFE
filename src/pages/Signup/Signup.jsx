import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../../lib/constants/GlobalStyle';
import { NAVER_AUTH_URL, KAKAO_AUTH_URL } from '../Login/components/Auth';
import NaverLogin from '../Login/components/NaverLogin';

const Signup = () => {
  const navigate = useNavigate();


    return (
      <StWrap>
        <StDiv>
        </StDiv>
          <button 
            onClick={() => navigate('./email')}
            >
            이메일로 회원가입
          </button>
          <NaverLogin onClick={() => { window.location.href = NAVER_AUTH_URL }}/>
          <button 
            onClick={() => { 
              window.location.href = KAKAO_AUTH_URL
            }}
            >
            카카오톡으로 로그인
          </button>
      </StWrap>
    );
};

export default Signup;


const StWrap = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  `

  const StDiv = styled.div`
    width: 100%;
    position: relative;
    background-color: ${colors.primary};
    margin-bottom: 30px;
    ::after{
      content: '';
      display: block;
      padding-bottom: 30%;
    }
  `