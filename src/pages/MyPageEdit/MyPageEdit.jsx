/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Input from '../../components/Input';
import Btn from '../../components/Button';
import HeaderBar from '../../components/layout/HeaderBar';
import NaviBar from '../../components/layout/NaviBar'


const MyPageEdit = () => {
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken
  const location = useLocation();
  const navigate = useNavigate();

  const initialState = {
    email: location.state.email,
    gender: location.state.gender,
    id: location.state.id,
    location: '',
    nickname: '',
    // legacypassword: '',
    password: '',
    image : location.state.image,
  };

  const [ info, setInfo ] = useState(initialState); // info value
  const [ profileImg, setProfileImg ] = useState(initialState.image); // img input value
  const [ formData ] = useState(new FormData());
  const inputRef = useRef(null);

  // console.log(initialState)
  // console.log(profileImg)
  //----------- info handler -----------//
  const infoHandler = (e) => {
    const { name, value } = e.target;
    // InfoValue console check
    console.log(info) 
    setInfo({ ...info, [name]: value });
  }
  //----------- info handler -----------//

  //----------- img upload handler -----------//
  const uploadImg = useCallback((fileBlob) => {
    formData.append('image', fileBlob);
    // file formData console check
    for (const keyValue of formData){
      console.log(keyValue[0]+', '+keyValue[1])
    };  

    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setProfileImg(reader.result);
        resolve();
      };
    });
  },[]);
  // console.log('포스트이미지scr:', postImg)

  // mkBtn for useRef
  const fileInputBtnClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  },[]);
  //----------- img upload handler -----------//

  const editInfoHandler = async (e) => {
    e.preventDefault();

    formData.append('email', info.email);
    formData.append('gender', info.gender);
    formData.append('location', info.location);
    formData.append('nickname', info.nickname);
    formData.append('password', info.password);

    // formData console check
    // for (const keyValue of formData){
    //   console.log('Ready to change', keyValue[0]+', '+keyValue[1])
    // }

    try {
      const res = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/member/mypage`, 
      formData,
      {
        headers: {
          Authorization: accessToken,
          refreshToken: refreshToken,
          'Content-Type': 'multipart/form-data',
        }
      });
      if (res.status === 200 || 201) {
        window.alert('프로필 정보가 변경되었습니다.')
        navigate('/mypage')
      }
    }
    catch(err) {
      window.alert('오류가 발생했습니다.');
      console.error(err.response);
      setInfo(initialState)
      setProfileImg(initialState.profileImage);
    };
  };

  useEffect(() => {
  }, []);

  const pswrd = new String('location.state.password')
  let dot = '';
  for (let i = 0; i < pswrd.length; i++){
    dot += '●';
  };

  return (
    <div>
      <StDiv>
        <HeaderBar/>
        <ProfileContainer onClick={fileInputBtnClick} >
          <input
            name='profileImg'
            type='file'
            accept='image/jpg, image/png, image/jpeg, image/gif'
            style={{display: 'none', zIndex:'10px'}}
            ref={inputRef}
            onChange={(e) => {uploadImg(e.target.files[0])}}
            />
            {
              profileImg === null || ''
              ? <DefaultProfileImg>
                <UserCircleIcon alt='default profile Image'/>
              </DefaultProfileImg>
              : <ProfileImg src={`${profileImg}`} alt='profile Image'/>
            }
        </ProfileContainer>
          <Btn 
            onClick={fileInputBtnClick} 
            size='sm'
            variant='badge'
            style={{marginTop:'0.1rem', marginBottom:'4.2rem'}}
          >
            이미지 올리기
          </Btn>

        <StForm onSubmit={editInfoHandler}>
          <Input 
            onChange={infoHandler} 
            placeholder={location.state.nickname} 
            name='nickname' 
            value={info.nickname} 
            type='text' 
            size='default'
            variant='input'
          />
          <StSelect 
            onChange={infoHandler}  
            name='gender' 
            defaultValue="default"
            required
            >
            <StOption value='default' disabled>{info.gender}</StOption>  
            <option value='남자'>남자</option>
            <option value='여자'>여자</option>
          </StSelect>

          <Input 
            onChange={infoHandler} 
            placeholder={location.state.location} 
            name='location' 
            value={info.location} 
            type='text' 
            size='default'
            variant='input'
          />
          <div
            css={{
              marginTop: '3.8rem',
              marginLeft: '1.2rem',
              color: `${colors.lightGray}`,
              fontSize: `${fonts.body}`,
              fontWeight: `${fontWeight.normal}`,
              lineHeight: `${lineHeights.body}`,
            }}
          >
            비밀번호 변경
          </div>
          <Input 
            onChange={infoHandler} 
            placeholder={dot} 
            name='password' 
            value={info.password} 
            type='password'
            size='default'
            variant='input' 
          />
          {/* <input onChange={infoHandler} placeholder='비밀번호 변경 확인' name='passwordConfirm' value={info.password} type='password' /> */}
          <Btn 
            type='submit' 
            size='default'
            variant='main'
          >
            프로필 수정
          </Btn>
        </StForm>
      </StDiv>
      <NaviBar/>
    </div>
  );
};

export default MyPageEdit;

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
    /* padding-bottom: 2rem; */
  }
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

const StForm = styled.form`
  width: 100%;
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