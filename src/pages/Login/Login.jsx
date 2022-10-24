import React, { useState } from 'react';
import styled from '@emotion/styled';
import AskSignup from './components/AskSignup';
import LoginSelect from './components/LoginSelect';
import LoginEmail from './components/LoginEmail';
import HeaderBar from '../../components/layout/HeaderBar';
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle';

const Login = () => {

  const [ click, setClick ] = useState(false);
  const clickCheck = (e) => {
    setClick(e)
  };
  // console.log(click)

    return (
      <StWrap>
        <HeaderBar />
        <Container>
          <Title>
            <Sth1>인코스</Sth1>
            <Sth3>인싸들의 데이트, 친목, 모임 코스</Sth3>
          </Title>
          <BtnWrap click={click} >
            {!click
              ? <LoginSelect clickCheck={clickCheck} />
              : <LoginEmail />}
            <AskSignup />
          </BtnWrap>
        </Container>
      </StWrap>
    );
};

export default Login;

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
  margin-top: 37px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Sth1 = styled.h1`
  color: ${colors.primary};
  font-size: ${fonts.headLine};
  font-weight: ${fontWeight.exrtaBold};
  line-height: ${lineHeights.headLine};
`

const Sth3 = styled.h3`
  color: ${colors.primary};
  font-size: ${fonts.subTitle};
  font-weight: ${fontWeight.normal};
  line-height: ${lineHeights.subTitle};
`

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
