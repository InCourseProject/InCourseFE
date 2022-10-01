import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../lib/constants/GlobalStyle';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid'


const MyPageEdit = () => {
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken
  const location = useLocation();
  const navigate = useNavigate();

  const initialState = {
    email: location.state.email,
    id: location.state.id,
    location: '',
    nickname: '',
    // legacypassword: '',
    password: '',
    image : location.state.image
  };

  const [ info, setInfo ] = useState(initialState); // info value
  const [ profileImg, setProfileImg ] = useState(initialState.image); // img input value
  const [ formData ] = useState(new FormData());
  const inputRef = useRef(null);

  console.log(initialState)
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

  //----------- axios&edit info -----------//
  const editInfoHandler = async (e) => {
    e.preventDefault();

    formData.append('email', info.email);
    formData.append('location', info.location);
    formData.append('nickname', info.nickname);
    formData.append('password', info.password);

    // formData console check
    for (const keyValue of formData){
      console.log('Ready to change', keyValue[0]+', '+keyValue[1])
    }

    try {
      // axios put // refreshtoken, authorization이 있어야 접속 가능
      const response = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/member/mypage`, 
      formData,
      {
        headers: {
          Authorization: `${accessToken}`,
          refreshToken: `${refreshToken}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Axios Work>> ', response);

      if (response.status === 200 || 201) {
        window.alert('프로필 정보가 변경되었습니다.')
        navigate('/mypage')
      };
    }
    catch(err) {
      window.alert('❌CHECKCONSOLE❌');
      console.error(err.response);
      setInfo(initialState)
      setProfileImg(initialState.profileImage);
    };
  };
  //----------- axios&edit info -----------//
  useEffect(() => {
  }, []);

  const pswrd = new String(location.state.password)
  let dot = '';
  for (let i = 0; i < pswrd.length; i++){
    dot += '●';
  };
  
  return (
    <div>
      <StDiv>
        <div onClick={() => navigate(-1)}>뒤로가기</div>
        <ProfileContainer onClick={fileInputBtnClick} >
          <input
            name='profileImg'
            type='file'
            accept='image/jpg, image/png, image/jpeg, image/gif'
            style={{display: 'none'}}
            ref={inputRef}
            onChange={(e) => {uploadImg(e.target.files[0])}}
            />
            {
              profileImg === null
              ? <DefaultProfileImg>
                <UserCircleIcon alt='default profile Image'/>
              </DefaultProfileImg>
              : <ProfileImg src={`${profileImg}`} alt='profile Image'/>
            }
          <div onClick={fileInputBtnClick} >이미지 올리기</div>
        </ProfileContainer>

        <form onSubmit={editInfoHandler}>
          <input 
            onChange={infoHandler} 
            placeholder={location.state.nickname} 
            name='nickname' 
            value={info.nickname} 
            type='text' 
          />
          <input 
            onChange={infoHandler} 
            placeholder={location.state.location} 
            name='location' 
            value={info.location} 
            type='text' 
          />
          <input 
            onChange={infoHandler} 
            placeholder={dot} 
            name='password' 
            value={info.password} 
            type='password' 
          />
          {/* <input onChange={infoHandler} placeholder='비밀번호 변경 확인' name='passwordConfirm' value={info.password} type='password' /> */}
          <button type='submit' >프로필 수정 확인</button>
        </form>
      </StDiv>
    </div>
  );
};

export default MyPageEdit;

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
  cursor: pointer;
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