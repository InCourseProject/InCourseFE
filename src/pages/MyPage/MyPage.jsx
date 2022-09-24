import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { colors } from '../../lib/constants/GlobalStyle';
import axios from 'axios';

const MyPage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  console.log('param', param)

  const [ info, setInfo ] = useState([]);
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  //----------- axios get -----------//
  const getInfo = async () => {
    // const res = await axios.get(`http://3.36.71.186:8080/api/member/mypage/${id}`,
    const res = await axios.get(`http://3.36.71.186:8080/api/member/mypage`,
    {
      headers:{
        Authorization: `${accessToken}`,
        RefreshToken: `${refreshToken}`,
      }
    }
    );
    console.log(res.data);
    setInfo(res.data);
  };

  const logoutHandler = async () => {
    try{
      const logout = await axios.post('http://3.36.71.186:8080/api/member/logout',
      {
        headers:{
          Authorization: `${accessToken}`,
          RefreshToken: `${refreshToken}`,
        }
      });
      console.log(logout)

      if(logout.status === 200 || 201){
        console.log("status ok")
        // navigate('/')
      }
      else{
        console.log("not ok")
      }
    }
    catch(err){
      window.alert('CheckConsole!')
      console.error(err);
    };
  };
    
  
  // 마운트 시 axios get
  useEffect(() => {
    getInfo();
  },[]);
  //----------- axios get -----------//
  return (
    <div>
      <StDiv>
        <ProfileContainer>프로필사진</ProfileContainer>
        <button 
          onClick={() => navigate('edit')}
          email={info.email} 
          nickname={info.nickname} 
          password={info.password} 
          image={info.image}
        >프로필 보기</button>
        {/* 아래 두 요소 와이어프레임 없음 */}
        <button>내가 작성한 게시물</button> 
        <button>내가 찜한 게시물</button>
        <button onClick={logoutHandler}>로그아웃</button>
      </StDiv>
    </div>
  );
};

export default MyPage;

const StDiv = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const ProfileContainer = styled.div`
  width: 100;
  position: relative;
  background-color: ${colors.incourse};
  ::after{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`