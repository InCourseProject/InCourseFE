import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


const SignupDetail = () => {
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken
  const navigate = useNavigate();
  const location = useLocation();
  console.log('props to useNavigate>>', location.state.email)

  const initialstate = {
    email: location.state.email,
    nickname: '',
    location: ''
  }
  const [ info, setInfo] = useState(initialstate);
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]:value });
  };
  
  console.log(info)

  const submitHandler = async () => {
    
    try{
      const res = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/member/signup/detail`,
      info,
      {
        headers: {
          Authorization: `${accessToken}`,
          refreshToken: `${refreshToken}`,
        }
      });
      console.log('Axios Work>> ', res);

      if(res.status === 200 || 201) {
        window.alert(res.data.message)
        navigate('/')
      }
    }
    catch(err){
      window.alert('❌CHECKCONSOLE❌');
      console.error(err)
    };
  };

  useEffect(() => {
    // submitHandler();
  }, []);

  return(
    <div>
      <input 
        onChange={onChangeHandler} 
        placeholder='nickname' 
        name='nickname' 
        value={info.nickname} 
        type='text' 
      />
      <input 
        onChange={onChangeHandler} 
        placeholder='location' 
        name='location' 
        value={info.location} 
        type='text' 
      />
      <div onClick={() => navigate('/')}>다음에 입력</div>
      <button 
        onClick={submitHandler} 
        type='button'
      >
        입력완료
      </button>  
    </div>
  );
};

export default SignupDetail;