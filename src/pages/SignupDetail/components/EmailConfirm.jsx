import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { colors, fonts, fontWeight, lineHeights } from '../../../lib/constants/GlobalStyle';
import Btn from "../../../components/Button";
import Input from "../../../components/Input";
import HeaderBar from '../../../components/layout/HeaderBar';


const EmailConfrim = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('props to useNavigate>>', location.state.email)
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

  // const [ time, setTime ] = useState();

  // 회원 가입용 이메일 인증 번호 보내기
  const sendConfirm = async () => {
    try{
    const send = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/member/signup_send`,
    input,
    {
      headers:{
        Authorization: accessToken,
        RefreshToken: refreshToken,
      }
    });
    if(send.status === 200 || 201) {
      window.alert('인증 메일을 전송했습니다.')
    }
    }
    catch(err) {
      console.error(err);
    }
  };

  // 회원 가입용 이메일 인증 번호 확인
  const checkConfirm = async () => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/member/signup_confirm`,
      input,
      {
        headers:{
          Authorization: accessToken,
          RefreshToken: refreshToken,
        }
      }
      )
      if(res.status === 200 || 201) {
        window.alert(res.data);
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
    <StWrap>
      <HeaderBar/>
      <Container>
        <FormWrap>
          <Sth1>이메일 인증</Sth1>
          <Btn 
            onClick={sendConfirm}
            size='default'
            variant='line'
            // css={{marginTop:'1rem'}}
            css={css`
              margin-top: 1rem;
            `}
          >
            인증번호 받기
          </Btn>
          <Input 
            onChange={onChangeHandler}
            placeholder="인증번호" 
            name='authkey' 
            value={input.authkey} 
            type='number'
            size='default'
            variant='input'
          />
          {/* <CountTime css={{visibility: 'hidden'}}>03:00</CountTime> */}
          <Btn 
            onClick={checkConfirm}
            size='default'
            variant='main'
            disabled={!input.authkey}

          >
            이메일 인증
          </Btn>
        </FormWrap>
      </Container>
    </StWrap>
  );
};

export default EmailConfrim;

const StWrap = styled.div`
  width: 100%;
  `
  
const Container = styled.div`
  width: 100%;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormWrap = styled.div`
  min-width: 330px;
`

const Sth1 = styled.h1`
    margin-top: 12.4rem;
    margin-bottom: -4rem;

    color: ${colors.black};
    font-size: ${fonts.headLine};
    font-weight: ${fontWeight.exrtaBold};
    line-height: ${lineHeights.headLine};
  `

const CountTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 0.8rem;
  margin-right: 2.2rem;
  color: ${colors.gray};
  font-size: ${fonts.body};
  font-weight: ${fontWeight.normal};
  line-height: ${lineHeights.body};
`