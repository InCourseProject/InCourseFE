import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';


const AskSignup = () => {
  const navigate =useNavigate();

  return(
    <div>
      <hr />
      <span>아직 회원이 아니신가요?</span>
      <span onClick={() => navigate('/signup')}>회원가입</span>
    </div>
  );
};

export default AskSignup;