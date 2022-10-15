import React from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Btn from "../../../components/Button";

const PostHeart = ({id, heart, size, variant}) => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  // console.log('id:',id,' heart:',heart)

  //게시글 하트 서버에러 확인 필요
  //찜하기 눌를 시 재렌더링 필요
  const heartHandler = async () => {
    try {
      const heart = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/heart/${id}`,
      {
        headers: {
          Authorization: `${accessToken}`,
          RefreshToken: `${refreshToken}`,
        }
      });
      console.log('heart:', heart)

      if (heart.status === 200 || 201) {
        console.log(heart,'works!')
      }
    }
    catch(err) {
     console.error(err);
    };
  };

  const disHeartHandler = async () => {
    try {
      const disHeart = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/disheart/${id}`,
      {
        headers: {
          Authorization: `${accessToken}`,
          RefreshToken: `${refreshToken}`,
        }
      });
      console.log('disHeart:', disHeart)

      if (disHeart.status === 200 || 201) {
        console.log(disHeart,'works!')
      }
    }
    catch(err) {
     console.error(err);
    };
  };

  return ( 
    <StDiv >
      {
        heart === 0
        ? <Btn 
          onClick={heartHandler}
          size={size} variant={variant}
        >
          찜하기
        </Btn>
        : <Btn 
          onClick={disHeartHandler}
          size={size} variant={variant}
        >
          찜하기 취소
        </Btn>
      }
      
    </StDiv>
  )
}

export default PostHeart;

const StDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rem;
  
`