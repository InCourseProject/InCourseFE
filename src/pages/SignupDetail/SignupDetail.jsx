/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle';
import Input from '../../components/Input';
import Btn from '../../components/Button';
import HeaderBar from '../../components/layout/HeaderBar';


const SignupDetail = () => {
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('props to useNavigate>>', location.state.email)

  const initialstate = {
    email: location.state.email,
    nickname: '',
    gender: '',
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
          Authorization: accessToken,
          refreshToken: refreshToken,
        }
      });
      // console.log('Axios Work>> ', res);
      if(res.status === 200 || 201) {
        window.alert(res.data.message)
        navigate('/login')
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

  const important = !info.nickname ? {visibility:'visible'}
  : !info.gender ? {visibility:'visible'}
  : !info.location ? {visibility:'visible'}
  : {visibility:'hidden'}

  return(
    <StWrap>
      <HeaderBar />
      <Container>
        <FormWrap>
          <Sth1>회원정보 입력</Sth1>
          <Input
            onChange={onChangeHandler}
            placeholder='*nickname'
            name='nickname'
            value={info.nickname}
            type='text'
            size='default'
            variant='input'
          />

          <StSelect 
            onChange={onChangeHandler}  
            name='gender' 
            defaultValue="default"
            required
            >
            <StOption value='default' disabled>*gender</StOption>  
            <option value='남성'>남성</option>
            <option value='여성'>여성</option>
          </StSelect>

          <Input
            onChange={onChangeHandler}
            placeholder='*location'
            name='location'
            value={info.location}
            type='text'
            size='default'
            variant='input'
          />
          <ErrTxt css={important}>* 필수 정보를 입력해주세요.</ErrTxt>

          {/* <Later onClick={() => navigate('/login')}>다음에 입력</Later> */}
          <Btn
            onClick={submitHandler}
            type='button'
            size='default'
            variant='main'
            disabled={!info.nickname || !info.gender || !info.location}
          >
            입력완료
          </Btn>
        </FormWrap>
      </Container>
    </StWrap>
  );
};

export default SignupDetail;

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
  margin-bottom: 1.5rem;
  color: ${colors.black};
  font-size: ${fonts.headLine};
  font-weight: ${fontWeight.exrtaBold};
  line-height: ${lineHeights.headLine};
`

const ErrTxt = styled.div`
  margin-top: 0.8rem;
  margin-left: 2.5rem;
  color: ${colors.danger};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.light};
  line-height: ${lineHeights.caption};
`

const Later = styled.div`
  width: fit-content;
  margin: 4rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.light};
  line-height: ${lineHeights.caption};
  
  cursor: pointer;
`

const StSelect = styled.select`
  width: 100%;
  max-width: 33rem;
  height: 5.9rem;
  margin: 0;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px 22px;

  font-size: ${fonts.body};
  line-height: ${lineHeights.body};
  font-weight: ${fontWeight.light};

  color: ${colors.gray};
  background-color: ${colors.tone};
  border: 1px solid ${colors.lightGray};
  border-radius: 15px;
  :active,:focus,::selection{
    outline: 1px solid ${colors.secondary};
  }
  `

  const StOption = styled.option`
  color: ${colors.caution} ;
  display: none;
`