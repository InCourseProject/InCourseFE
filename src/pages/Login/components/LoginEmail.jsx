import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginEmail = () => {
  const navigate = useNavigate();

  const initialstate = {
    email:'',
    password:''
  }
  const [ login, setLogin ] = useState(initialstate);
    
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

    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/member/login`,
      login
      );
      console.log('Axios Work>> ', res);
      // setTokens
      localStorage.setItem("Authorization", res.data.authorization)    //accesstoken
      localStorage.setItem("RefreshToken", res.data.refreshToken)   //refreshtoken 
      
      if(res.status === 200 || 201){
        console.log('loginUseEmail>>',res)
        window.alert(res.data.message)
        res.data.emailAuth === 0
        ?navigate('/emailconfirm', { 
          state: {
            email: res.data.email,
          }})
        :navigate('/');
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
        <button 
          onClick={loginHandler} 
          type='button'
        >
          로그인
        </button>
    </div>
  );
};

export default LoginEmail;