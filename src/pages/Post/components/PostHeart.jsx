import React from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Btn from "../../../components/Button";
// import { useParams } from "react-router-dom";

const PostHeart = ({id, heart}) => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  // const course = useParams()
  
  console.log('id:',id,' heart:',heart)

  const heartHandler = async () => {
    try {
      // const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/course/heart/${course.id}`,
      const heart = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/course/heart/${id}`,
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
      const disHeart = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/course/disheart/${id}`,
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
    <StDiv>
      {
        heart === 0
        ? <Btn onClick={heartHandler}>찜하기</Btn>
        : <Btn onClick={disHeartHandler}>찜하기 취소</Btn>
      }
      
    </StDiv>
  )
}

export default PostHeart;

const StDiv = styled.div`
  margin-bottom: 20rem;
`