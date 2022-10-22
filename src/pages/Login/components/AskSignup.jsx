import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { colors, fonts, fontWeight, lineHeights } from '../../../lib/constants/GlobalStyle';


const AskSignup = () => {
  const navigate =useNavigate();

  return(
    <StWrap>
      <StHr/>
      <AskWrap>
      <span>아직 회원이 아니신가요?</span>
      <SignupTxt
        onClick={() => navigate('/signup/email')}
      >
        회원가입
      </SignupTxt>
      </AskWrap>
    </StWrap>
  );
};

export default AskSignup;

const StWrap = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StHr = styled.hr`
  width: 100%;
  max-width: 330px;
  margin: 5rem 0rem;
  border: 1px solid ${colors.lightGray};
`

const AskWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: ${colors.deepGray};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.light};
  line-height: ${lineHeights.caption};
`
const SignupTxt = styled.span`
  margin-left: 1rem;
  color: ${colors.info};
  font-weight: ${fontWeight.bold};
  cursor: pointer;
`