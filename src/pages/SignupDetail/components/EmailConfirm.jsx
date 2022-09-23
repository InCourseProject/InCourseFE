import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { Navigate } from "react-router-dom";

const EmailConfrim = () => {
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken
  
  const initialstate = {
    email: '회원가입 한 이메일',
    authkey: ''
  }
  const [ input, setInput ] = useState(initialstate);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]:value });
  };

  // 회원 가입용 이메일 인증 번호 보내기
  const sendConfirm = async () => {
    const send = await axios.post('http://3.34.141.121/api/member/signup_send',
    input,
    {
      headers:{
        Authorization: `${accessToken}`,
        RefreshToken: `${refreshToken}`,
      }
    }
    )
  };

  // 회원 가입용 이메일 인증 번호 확인
  const checkConfirm = async () => {
    try{
      const res = await axios.post('http://3.34.141.121/api/member/signup_confirm',
      input,
      {
        headers:{
          Authorization: `${accessToken}`,
          RefreshToken: `${refreshToken}`,
        }
      }
      )
      if(res.status === 200 || 201) {
        window.alert('이메일 인증이 성공했습니다.')
        Navigate('signup/detail')
      }else{
        window.alert('인증에 실패했습니다.')  
      }
    }
    catch(err){
      console.error(err);
      window.alert('인증에 실패했습니다.')
    };
  };
  
  
  

  return (
    <div>
      <button onClick={sendConfirm}>인증번호 받기</button>
      <input 
        onChange={onChangeHandler}
        placeholder="인증번호 입력" 
        name='authkey' 
        value={input.authkey} 
        type='number'
        // maxLength="8"
      />
      <button onClick={checkConfirm}>이메일 인증</button>

    </div>
  );
};

export default EmailConfrim;