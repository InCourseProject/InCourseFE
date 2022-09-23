import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { colors } from '../../lib/constants/GlobalStyle';
import SignupEmail from './components/SignupEmail';

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
  },[]);

    return (
      <div>
        <button onClick={() => navigate('./email')}>이메일로 회원가입</button>
        <button>네이버로 로그인</button>
        <button>카카오톡으로 로그인</button>
        
      </div>
    );
};

export default Signup;


const StForm = styled.form`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  `

  const StDiv = styled.div`
    width: 100%;
    position: relative;
    background-color: ${colors.incourse};
    margin-bottom: 30px;
    ::after{
      content: '';
      display: block;
      padding-bottom: 30%;
    }
  `