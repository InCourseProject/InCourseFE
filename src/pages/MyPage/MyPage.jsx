import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate} from 'react-router-dom';
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle';
import { UserCircleIcon, HeartIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import MyPageLogout from './components/MyPageLogout';
import Btn from '../../components/Button';
import NaviBar from '../../components/layout/NaviBar';
import HeaderBar from '../../components/layout/HeaderBar';
import Badge from '../../components/badge';



const MyPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  
  const initialState = {
    badge: '',
    email: '',
    gender: '',
    heartSum: 0,
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
      
      if (res.status === 200 || 201){
        setInfo(res.data);  
      } 
    }catch(err){
      console.error(err.response);
      window.alert('로그인이 필요합니다.')
      localStorage.clear();
      navigate('/')
    }

    
  };
  // console.log("work!",info);
  const clickMyprofile = () => {
    navigate('edit', {
      state: {
        email: info.email,
        gender: info.gender,
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
      marginBottom: '-5.5rem' 
    }
  };

  return (
    <div>
      <StDiv>
        <HeaderBar/>
        <ProfileContainer>
          {
            info.image === null
              ? <DefaultProfileImg>
                <UserCircleIcon alt='default profile Image' />
              </DefaultProfileImg>
              :info.image === ''
              ? <DefaultProfileImg>
                <UserCircleIcon alt='default profile Image' />
              </DefaultProfileImg>
              : <ProfileImg src={`${info.image}`} alt='profile Image' />
          }
          <UserNickname>{info.nickname}</UserNickname>
        </ProfileContainer>
        <InfluWrap style={{marginBottom:'0.8rem'}}>
          <Influ>나의 인싸력</Influ>
          <Badge title={info.badge}>{info.badge}</Badge>
        </InfluWrap>
        <InfluWrap>
          <Influ>내가 받은 좋아요</Influ>
            <LikeCount>
            <HeartIcon style={{...styles['icon']}}/>
            <span>{info.heartSum}</span>
            </LikeCount>
        </InfluWrap>
        
        <Btn 
          onClick={() => clickMyprofile()}
          size='default'
          variant='main'
          style={{...styles['btnFill']}}
        >
          프로필 보기
        </Btn>
        <Btn
          size='default'
          variant='line'
          style={{...styles['btnLine']}}
          onClick = {()=>{navigate('/mypostpage')}}
        >
          내가 작성한 게시물
        </Btn> 
        <Btn
          size='default'
          variant='line'
          onClick = {()=>{navigate('/mylikepost')}}
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
  max-width: 36rem;
  padding: 0px 15px;
  margin: 0px auto;
  margin-bottom: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ProfileContainer = styled.div`
  width: 100%;
  margin-top: 5.4rem;
  position: relative;
  /* background-color: ${colors.caution}; */
  ::after{
    content: '';
    display: block;
    padding-bottom: 2rem;
  }
`

const UserNickname = styled.div`
  max-width: 33rem;
  text-align: center;
  color: ${colors.secondary};
  font-size: ${fonts.headLine};
  font-weight: ${fontWeight.exrtaBold};
  line-height: ${lineHeights.headLine};
`

const DefaultProfileImg = styled.div`
  width: 14.8rem;
  margin: 0 auto;
  color: ${colors.primary};
`

const ProfileImg = styled.img`
  width: 12rem;
  display: flex;
  margin: 0 auto;
  margin-bottom: 1.3rem;
  justify-content: center;
  align-items: center;
  border: 0.5px solid ${colors.lightGray};
  border-radius: 100%;
`

const InfluWrap = styled.div`
  width: 100%;
  padding: 0rem 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Influ = styled.span`
  color: ${colors.black};
  font-size: ${fonts.body};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.body};
  
`

const InfluBadge = styled.span`
  color: ${colors.info};
  padding: 2px 10px;
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
  border: 1px solid ${colors.info};
  border-radius: 18px;
`

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  span{
    color: ${colors.deepGray};
    font-size: ${fonts.caption};
    line-height: ${lineHeights.caption};
    font-weight: ${fontWeight.bold};
  }
`