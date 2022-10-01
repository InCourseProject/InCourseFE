import React, { useState } from 'react';

import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AskSignup from './components/AskSignup';
import LoginHeader from './components/LoginHeader';
import LoginSelect from './components/LoginSelect';
import LoginEmail from './components/LoginEmail';

const Login = () => {

  const [ click, setClick ] = useState(false);
  const clickCheck = (e) => {
    setClick(e)
  };
  console.log(click)

    return (
      <div>
        <StDiv click={click} >
          <LoginHeader/>
          {!click
          ?<LoginSelect clickCheck={clickCheck}/>
          :<LoginEmail/>}
          <AskSignup/>
        </StDiv>
      </div>
    );
};

export default Login;

const StDiv = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
`
const SnsLoginWrap = styled.div`
  display: flex;
  flex-direction: row;
`

