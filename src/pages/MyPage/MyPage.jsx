import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { colors } from '../../lib/constants/GlobalStyle';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import MyPageLogout from './components/MyPageLogout';

const MyPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  
  const initialState = {
    email: '',
    id: '',
    location: '',
    nickname: '',
    password: '',
    profileImage : ''
  };
  const [ info, setInfo ] = useState(initialState);
  //----------- axios get -----------//
  const getInfo = async () => {
    try{
      const res = await axios.get(`http://3.36.71.186:8080/api/member/mypage`, {
      headers:{
        Authorization: `Bearer ${accessToken}`,
        RefreshToken: `${refreshToken}`,
      }
      });

      if (res.status = 200 || 201){
        setInfo(res.data);
        console.log("work!",info);
      }
    }catch(err){
      console.error(err.response);
    }
  };

  const clickMyprofile = () => {
    navigate('edit', {
      state: {
        email: info.email,
        id: info.id,
        location: info.location,
        nickname: info.nickname,
        password: info.password,
        profileImage: info.profileImage
      }
    });
  };
    
  // 마운트 시 axios get
  useEffect(() => {
    getInfo();
  },[]);
  //----------- axios get -----------//
  
  return (
    <div>
      <StDiv>
        <ProfileContainer>
          {
            info.profileImage === null
              ? <DefaultProfileImg>
                <UserCircleIcon alt='default profile Image' />
              </DefaultProfileImg>
              : <ProfileImg src={`${info.profileImage}`} alt='profile Image' />
          }
        </ProfileContainer>
        <button 
          onClick={() => clickMyprofile()}
        >프로필 보기</button>
        {/* 아래 두 요소 와이어프레임 없음 */}
        <button>내가 작성한 게시물</button> 
        <button>내가 찜한 게시물</button>
        <MyPageLogout/>
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
  /* background-color: ${colors.primary}; */
  ::after{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

const DefaultProfileImg = styled.div`
  width: 20%;
  color: ${colors.primary};
`

const ProfileImg = styled.img`
  width: 50%;
  `