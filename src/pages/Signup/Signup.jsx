
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../../lib/constants/GlobalStyle';
import { NAVER_JDK_AUTH_URL, NAVER_REST_AUTH_URL, KAKAO_AUTH_URL } from '../Login/components/Auth';
import NaverLogin from '../Login/components/NaverLogin';
import Button from '../../components/Button';

const Signup = () => {
  const navigate = useNavigate();


    return (
      <StWrap>
        <StDiv>
        </StDiv>
        {/* <Button>이건 무엇인가!</Button> */}
          <div>
            인코스
          </div>
          <div>
            인싸들의 데이트, 친목, 모임 코스
          </div>
          <button 
            onClick={() => navigate('./email')}
            >
            이메일로 회원가입
          </button>

          <div onClick={() => { window.location.href = NAVER_REST_AUTH_URL }}>
            <button>네이버으로 로그인</button>
            <NaverLogin />
          </div>
          
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

