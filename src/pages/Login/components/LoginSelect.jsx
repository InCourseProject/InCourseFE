import React, { useState } from 'react';
import styled from '@emotion/styled';
import { KAKAO_AUTH_URL, NAVER_REST_AUTH_URL } from './Auth';
import NaverLogin from './NaverLogin';
import Btn from '../../../components/Button';
import naverlogo from '../../../lib/constants/img/naverLogo.svg'
import kakaologo from '../../../lib/constants/img/kakaoLogo.svg'

const LoginSelect = (props) => {
  const [ isClick, setIsClick ] = useState(false)

  return(
    <StWrap>
      <BtnWrap>
        <Container>
          <ClickNaver onClick={() => { window.location.href = NAVER_REST_AUTH_URL }}>
            <Btn
              size='default'
              variant='naver'
            >
              <StImg src={naverlogo} alt="naverLogo"/>
              네이버로 로그인
            </Btn>
            <NaverLogin />
          </ClickNaver>

          <Btn
            onClick={() => { window.location.href = KAKAO_AUTH_URL }}
            size='default'
            variant='kakao'
          >
            <StImg src={kakaologo} alt="kakoLogo"/>
            카카오톡으로 로그인</Btn>
          <Btn
            onClick={() => {
              props.clickCheck(!isClick);
              setIsClick(!isClick)
            }}
            size='default'
            variant='line'
          >
            이메일로 로그인
          </Btn>
        </Container>
      </BtnWrap>
    </StWrap>
  );
};
 
export default LoginSelect;

const StWrap = styled.div`
  /* width: 100%; */
  /* display: flex; */
  /* flex-direction: column; */
`

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  min-width: 330px;
`
const ClickNaver = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
`

const StImg = styled.img`
  height: 100%;
  margin-right: 10px
`