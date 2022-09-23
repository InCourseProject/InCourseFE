import React, { useState } from 'react';

import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AskSignup from './components/AskSignup';
import LoginHeader from './components/LoginHeader';
import LoginSelect from './components/LoginSelect';
import LoginEmail from './components/LoginEmail';

const Login = () => {
  // const navigate = useNavigate();
  // const initialstate = {
  //   email:'',
  //   password:''
  // }
  // const [ login, setLogin ] = useState(initialstate);
  
  // const onChangeHandler = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setLogin({ ...login, [name]:value });
  // };


  // const useAxios = async () => { 
  //   const response = await axios.post('http://localhost:4001/login',
  //   {...login});
  //   try{
  //     if(response){

  //     }

  //   }catch(error){
  //     window.alert('알러트');
  //   }
  // } ;

  const [ click, setClick ] = useState(false);
  const clickCheck = () => {
    setClick(true)
  };

    return (
      <div>
        <StDiv click={click} clickCheck={clickCheck}>
          <LoginHeader/>
          {click === true
          ?<LoginEmail/>
          :<LoginSelect/>}
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

