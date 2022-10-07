
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle';
import { UserCircleIcon, HeartIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import MyPageLogout from './components/MyPageLogout';
import Btn from '../../components/Button';
import NaviBar from '../../components/layout/NaviBar';
import HeaderBar from '../../components/layout/HeaderBar';



const MyPage = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  
  const initialState = {
    email: '',
    id: '',
    image: '',
    kakaoId: '',
    location: '',
    naverId: '',
    nickname: '',
    password: '',
  };
  const [ info, setInfo ] = useState(initialState);
  //----------- axios get -----------//
  const getInfo = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/mypage`, {
      headers:{
        Authorization: `${accessToken}`,
        RefreshToken: `${refreshToken}`,
      }
      });
      
      if (res.status = 200 || 201){
        setInfo(res.data);  
      }
    }catch(err){
      console.error(err.response);
    }

    
  };
  console.log("work!",info);
  const clickMyprofile = () => {
    navigate('edit', {
      state: {
        email: info.email,
        id: info.id,
        image: info.image,
        kakaoId: info.kakaoId,
        location: info.location,
        naverId: info.naverId,
        nickname: info.nickname,
        password: info.password,
      }
    });
  };
    
  // 마운트 시 axios get
  useEffect(() => {
    getInfo();
  },[]);
  //----------- axios get -----------//
  
  const styles = {
    icon: {
      width: '1.6rem',
      color: `${colors.danger}`
    },
    btnFill: {
      marginBottom: '-4.47rem' 
    },
    btnLine: {
      marginBottom: '-7.27rem' 
    }
  };

  return (
    <div>
      <StDiv>
        <HeaderBar/>
        <ProfileContainer>
          {
            info.image === null || '' || undefined
              ? <DefaultProfileImg>
                <UserCircleIcon alt='default profile Image' />
              </DefaultProfileImg>
              : <ProfileImg src={`${info.image}`} alt='profile Image' />
          }
          <UserNickname>{info.nickname}</UserNickname>
        </ProfileContainer>
        <span>나의 인싸력</span>
        <span>내가 받은 좋아요</span>
        <span>핵인싸 뱃지</span>
        <div>
        <HeartIcon style={{...styles['icon']}}/>
        <span>100</span>
        </div>
        <Btn 
          onClick={() => clickMyprofile()}
          size='default'
          variant='main'
          style={{...styles['btnFill']}}
        >
          프로필 보기
        </Btn>
        {/* 아래 두 요소 와이어프레임 없음 */}
        <Btn
          size='default'
          variant='line'
          style={{...styles['btnLine']}}
        >
          내가 작성한 게시물
        </Btn> 
        <Btn
          size='default'
          variant='line'
        >
          내가 찜한 게시물
        </Btn>
        <MyPageLogout/>
      </StDiv>
      <NaviBar/>
    </div>
  );
};

export default MyPage;

const StDiv = styled.div`
  width: 100%;
  margin: 0px auto;
  margin-bottom: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
`

const ProfileContainer = styled.div`
  width: 100;
  margin-top: 5.4rem;
  position: relative;
  /* background-color: ${colors.primary}; */
  ::after{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

const UserNickname = styled.div`
  
  color: ${colors.secondary};
  font-size: ${fonts.headLine};
  font-weight: ${fontWeight.exrtaBold};
  line-height: ${lineHeights.headLine};
`

const DefaultProfileImg = styled.div`
  width: 20%;
  color: ${colors.primary};
`

const ProfileImg = styled.img`
  width: 50%;
  `

