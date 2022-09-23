import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginEmail = () => {
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken
  const navigate = useNavigate();

  const initialstate = {
    email:'',
    password:''
  }
  const [ login, setLogin ] = useState(initialstate);
  // const [ formData ] = useState(new FormData());

  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]:value });
  };

  console.log(login)

  const loginHandler = async () => { 
    
    //빈값 체크
    if (login.email === "" || login.password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
    };


    // formData.append('email', login.email);
    // formData.append('password', login.password);
    // formData console check
    // for (const keyValue of formData){
    // console.log('Ready to change', keyValue[0]+', '+keyValue[1])
    // }

    try{
      // const res = await axios.post('http://localhost:4001/login',
      const res = await axios.post('http://3.36.71.186:8080/api/member/login',
      login
      );
      console.log('Axios Work>> ', res);
      // setTokens
      localStorage.setItem("Authorization", res.headers.authorization)    //accesstoken
      localStorage.setItem("RefreshToken", res.headers.refreshtoken)   //refreshtoken 
      
      if(res.state === 200 || 201){
        console.log(res)
        navigate('/')
      }else{
        console.log("post는 잘 넘어감 근데 Not OK ", res)
        window.alert('로그인에 실패하였습니다.');  
      }
    }catch(err){
      console.error(err);
      window.alert('로그인에 실패하였습니다.');
      setLogin(initialstate);
    }
  };

  return(
    <div>
      <form onSubmit={loginHandler}>
        <input 
          placeholder='email' 
          name='email' 
          value={login.email} 
          type='email'
          onChange={onChangeHandler}
        />
        <input 
          placeholder='password' 
          name='password' 
          value={login.password} 
          type='password'
          onChange={onChangeHandler} 
        />
        <button type='submit'>로그인</button>
      </form>
    </div>
  );
};

export default LoginEmail;