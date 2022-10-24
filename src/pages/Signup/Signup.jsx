
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, fonts, fontWeight } from '../../lib/constants/GlobalStyle';
import { NAVER_REST_AUTH_URL, KAKAO_AUTH_URL } from '../Login/components/Auth';
import NaverLogin from '../Login/components/NaverLogin';
import naverlogo from '../../lib/constants/img/naverLogo.svg'
import kakaologo from '../../lib/constants/img/kakaoLogo.svg'
import Btn from '../../components/Button';
import HeaderBar from '../../components/layout/HeaderBar';

const Signup = () => {
  const navigate = useNavigate();


  //회원가입 시 이메일 회원가입으로 바로 가게끔 변경!
  return (
    <StWrap>
        <HeaderBar/>
        <Container>
        <Title>
          <Sth1>인코스</Sth1>
          <Sth3>인싸들의 데이트, 친목, 모임 코스</Sth3>
        </Title>

          <BtnWrap>
            <Btn
            onClick={() => { window.location.href = NAVER_REST_AUTH_URL }}
            size='default'
            variant='naver'
            >
              <StNImg src={naverlogo} alt="naverLogo"
              />
              네이버로 회원가입
              <NaverLogin />
            </Btn>

            <Btn 
              onClick={() => {window.location.href = KAKAO_AUTH_URL}}
              size='default'
              variant='kakao'
              >
              <StImg src={kakaologo} alt="kakoLogo"/>
              카카오톡으로 회원가입
            </Btn>

            <Btn 
              onClick={() => navigate('./email')}
              size='default'
              variant='line'
              >
              이메일로 회원가입
            </Btn>
          </BtnWrap>
          
        </Container>
    </StWrap>
  );
};

export default Signup;

const StWrap = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  `

const Container = styled.div`
  width: 100%;
  padding: 0px 15px;
`

const Title = styled.div`
  margin-top: 57px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`


const Sth1 = styled.h1`
  color: ${colors.primary};
  font-size: ${fonts.headLine};
  font-weight: ${fontWeight.exrtaBold};
`

const Sth3 = styled.h3`
  color: ${colors.primary};
  font-size: ${fonts.subTitle};
  font-weight: ${fontWeight.normal};
`

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StImg = styled.img`
  width: 7%;
  margin-right: 10px;
`

const StNImg = styled.img`
  width: 12%;
  margin-right: 8px
`