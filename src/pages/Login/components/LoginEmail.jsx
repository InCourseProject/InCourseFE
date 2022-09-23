import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AskSignup from './AskSignup';


const LoginEmail = () => {
  const navigate = useNavigate();
  const initialstate = {
    email:'',
    password:''
  }
  const [ login, setLogin ] = useState(initialstate);
  
  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({ ...login, [name]:value });
  };

  console.log(login)

  const useAxios = async () => { 
    try{
      const response = await axios.post('http://localhost:4001/login',
      {...login});
      if(response.state === 200 || 201){
        console.log(response)
        navigate('/')
      }

    }catch(error){
      window.alert('❌CHECKCONSOLE❌');
      console.error(error);
      setLogin(initialstate);
    }
  } ;

  return(
    <div>
      <form onSubmit={useAxios}>
        <input placeholder='email' name='email' value={login.email} type='email'
          onChange={onChangeHandler} />
        <input placeholder='password' name='password' value={login.password} type='password'
          onChange={onChangeHandler} />
        <button type='submit'>로그인</button>
        <AskSignup/>
      </form>
    </div>
  );
};

export default LoginEmail;