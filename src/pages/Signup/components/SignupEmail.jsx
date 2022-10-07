import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { colors, fonts, fontWeight, lineHeights } from '../../../lib/constants/GlobalStyle';
import Input from '../../../components/Input';
import Btn from '../../../components/Button';
import HeaderBar from '../../../components/layout/HeaderBar';

const SignupEmail = () => {
  const navigate = useNavigate();
  //----------- input handler -----------//
  const initialstate = {
    email: '',
    password: '',
    passwordConfirm: ''
  }
  const [ signup, setSignup] = useState(initialstate);
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]:value });
  };

  console.log(signup)
  //----------- input handler -----------//
  // 이메일로 본인 인증
  // 비밀번호 양식 대소문자숫자포함 8~20자
  // axios.post('/api/member/signup')

  const signupInputHandler = async () => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/member/signup`,
      signup);

      if((res.state === 200 || 201)){
        // send signup data
        console.log('newSignupUseEmail>> ', res);
        window.alert(res.data.message);
        res.data.emailAuth===0 
        ?navigate('/emailconfirm', { 
          state: {
            email: res.data.email,
          }})
        :navigate('/login');

        //모달창으로 이메일 본인인증 해야함.
      }else{
        console.error('notOk', res);
      };
    }
    catch(err){
      console.error(err.response.data.errors)
      setSignup(initialstate);
      window.alert('❌CHECKCONSOLE❌');
    };
  };

  useEffect(() => {

  },[]);

  return(
    <StWrap>
      <HeaderBar/>
      <Container>
        <FormWrap>
          <Sth1>회원가입</Sth1>
          <Input 
            onChange={onChangeHandler} 
            placeholder='Email' 
            name='email' 
            value={signup.email} 
            type='email' 
            size='default'
            variant='input'
          />
          
          {/* <ErrTxt style={`${!signup.email || 8 < signup.email.length < 20 ? {display:'none'}:null}`}>이미 가입된 이메일입니다.</ErrTxt> */}
          <Input 
            onChange={onChangeHandler} 
            placeholder='Password' 
            name='password' 
            value={signup.password} 
            minLength='8' 
            maxLength='20' 
            type='password' 
            size='default'
            variant='input'
          />
          <ErrTxt>숫자, 영문 대소문자를 포함 8~20길이로 입력해 주세요.</ErrTxt>
          <Input 
            onChange={onChangeHandler} 
            placeholder='Password Confirm' 
            name='passwordConfirm' 
            value={signup.passwordConfirm} 
            type='password' 
            size='default'
            variant='input'
          />
          <ErrTxt>입력하신 비밀번호와 다릅니다.</ErrTxt>
          <Btn 
            onClick={signupInputHandler}
            size='default'
            variant='main'
            type='button'
            disabled={!signup.email || !signup.password || !signup.passwordConfirm}
          >
            회원가입
          </Btn>  
        </FormWrap>
      </Container>
    </StWrap>
  );
}

export default SignupEmail;

const StWrap = styled.div`
  width: 100%;
  `
  
const Container = styled.div`
/* margin: 0px auto; */
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

    color: ${colors.black};
    font-size: ${fonts.headLine};
    font-weight: ${fontWeight.exrtaBold};
    line-height: ${lineHeights.headLine};
  `

  const ErrTxt = styled.span`
    margin-top: 0.5rem;
    margin-left: 2.5rem;
    color: ${colors.danger};
    font-size: ${fonts.caption};
    font-weight: ${fontWeight.light};
    line-height: ${lineHeights.caption};
  `