import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../../lib/constants/GlobalStyle";

const EmailConfrim = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('props to useNavigate>>', location.state.email)
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken
  
  
  const initialstate = {
    email: location.state.email, /// 이메일이 리스폰스로 오니까 그걸 받아야함.
    authkey: ''
  }
  const [ input, setInput ] = useState(initialstate);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]:value });
  };

  // 회원 가입용 이메일 인증 번호 보내기
  const sendConfirm = async () => {
    const send = await axios.post('http://3.36.71.186:8080/api/member/signup_send',
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
      const res = await axios.post('http://3.36.71.186:8080/api/member/signup_confirm',
      input,
      {
        headers:{
          Authorization: `${accessToken}`,
          RefreshToken: `${refreshToken}`,
        }
      }
      )
      if(res.status === 200 || 201) {
        window.alert(res.data.message)
        navigate('/signup/detail', {
          state:{
            email: input.email
          }})
      }else{
        window.alert('인증번호를 확인해주세요.')  
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
      <StInput 
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

const StInput = styled.input`
  /* width: 100%;
  height: 4em;
  border: 0px;
  padding-left: 10px;
  border-bottom: 1px solid ${colors.lightgray}; */
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  /* ::placeholder{
    color: ${colors.gray}
  } */
`