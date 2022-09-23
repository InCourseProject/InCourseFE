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
    // 임시 URL
    // const response = await axios.get(`http://localhost:4001/api/member/mypage/${id}`,
    const response = await axios.get(`http://3.36.71.186:8080/api/member/mypage/${id}`,
    {
      headers:{
        Authorization: `${accessToken}`,
        RefreshToken: `${refreshToken}`,
      }
    }
    );
    console.log(response.data);
    setInfo(response.data);
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