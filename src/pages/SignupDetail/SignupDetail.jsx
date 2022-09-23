import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignupDetail = () => {
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken
  const navigate = useNavigate();

  const initialstate = {
    email: '',
    nickname: '',
    location: ''
  }
  const [ signup, setSignup] = useState(initialstate);
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]:value });
  };
  
  const submitHandler = async () => {
    try{
      const res = await axios.put('http://3.34.141.121/api/member/signup/detail',
      {...signup},
      {
        headers: {
          Authorization: `${accessToken}`,
          refreshToken: `${refreshToken}`,
        }
      });
      console.log('Axios Work>> ', res);

      if(res.status === 200 || 201) {
        window.alert('회원 정보가 변경되었습니다.')
        navigate('/')
      }
    }
    catch(err){
      window.alert('❌CHECKCONSOLE❌');
      console.error(err)
    };
  };

  useEffect(() => {
    submitHandler();
  }, []);

  return(
    <div>
      <form onSubmit={submitHandler}>
      <input onChange={onChangeHandler} placeholder='nickname' name='nickname' value={signup.nickname} type='text' />
      <input onChange={onChangeHandler} placeholder='location' name='location' value={signup.location} type='text' />
      <div onClick={() => navigate('/')}>다음에 입력</div>
      <button type='submit'>입력완료</button>  
      </form>

    </div>
  );
};

export default SignupDetail;