import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Btn from "../../../components/Button";


const PostHeart = ({id, size, variant}) => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  // console.log('id:',id)
  const [isHeart, setIsHeart] = useState(false);
  // console.log('isHeart', isHeart);

  // 회원의 찜하기 체크 api
  const checkHeart = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/heart/check/${id}`,
      {
        headers: {
          Authorization: accessToken,
          RefreshToken: refreshToken,
        }
      });

      if(res.status === 200 || 201){
        setIsHeart(res.data)  
      }
      else{
        console.log('checkHeart', res);
      }
    }catch(err){
      console.error(err);
    }

  }

  const heartHandler = async () => {
    try {
      const heart = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/heart/${id}`,
      {
        headers: {
          Authorization: accessToken,
          RefreshToken: refreshToken,
        }
      });
      console.log('heart:', heart)   

      if (heart.status === 200 || 201) {
        checkHeart();
        // console.log(heart,'works!')
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
          Authorization: accessToken,
          RefreshToken: refreshToken,
        }
      });
      console.log('disHeart:', disHeart)

      if (disHeart.status === 200 || 201) {
        checkHeart();
        // console.log(disHeart,'works!')
      }
    }
    catch(err) {
     console.error(err);
    };
  };

  useEffect(() => {
    if(id == undefined){
      return
    }
    checkHeart();
  }, [id]);

  return ( 
    <StDiv >
      {
        isHeart === false
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