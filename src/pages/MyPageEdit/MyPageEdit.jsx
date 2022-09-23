import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../lib/constants/GlobalStyle';
import axios from 'axios';


const MyPageEdit = ({email, nickname, password, image}) => {
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken

  const initialState = {
    email: email,
    nickname: nickname,
    password: password,
    image : image
  };

  const [ info, setInfo ] = useState(initialState); // info value
  const [ profileImg, setProfileImg ] = useState(null); // img input value
  const [ formData ] = useState(new FormData());
  const inputRef = useRef(null);

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
    formData.append('file', fileBlob);
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
    formData.append('nickname', info.nickname);
    formData.append('password', info.password);

    // formData console check
    for (const keyValue of formData){
      console.log('Ready to change', keyValue[0]+', '+keyValue[1])
    }

    try {
      // axios put // refreshtoken, authorization이 있어야 접속 가능
      const response = await axios.put('http://localhost:4001', 
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
      };
    }
    catch(error) {
      window.alert('❌CHECKCONSOLE❌');
      console.error(error);
      setInfo(initialState)
      setProfileImg('');
    };
  };
  //----------- axios&edit info -----------//
  useEffect(() => {
  }, []);

  return (
    <div>
      <StDiv>
        <ProfileContainer onClick={fileInputBtnClick} >
          <input
            name='profileImg'
            type='file'
            accept='image/jpg, image/png, image/jpeg, image/gif'
            style={{display: 'none'}}
            ref={inputRef}
            onChange={(e) => {uploadImg(e.target.files[0])}}
            />
          <img src={profileImg} alt='profile Image' />
          <div onClick={fileInputBtnClick} >이미지 올리기</div>
        </ProfileContainer>
        <form onSubmit={editInfoHandler}>
          <input onChange={infoHandler} placeholder='닉네임 변경' name='nicknamee' value={info.nickname} type='text' />
          <input onChange={infoHandler} placeholder='비밀번호 변경' name='password' value={info.password} type='password' />
          <input onChange={infoHandler} placeholder='비밀번호 변경 확인' name='passwordConfirm' value={info.password} type='password' />
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
  background-color: ${colors.incourse};
  cursor: pointer;
  ::after{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`
