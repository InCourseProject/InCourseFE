/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Btn from "../../../components/Button";

const CardHeart = ({id, clickCheck, zzimCheck, style, click, css}) => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  const [count, setCount] = useState(false);
  const [isClick, setIsClick] = useState(false);
  
  //찜하기 체크 true || false
  const checkHeart = async () => {
    try {
      const check = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/place/heart/check/${id}`,
      {
        headers: {
          Authorization: accessToken,
          RefreshToken: refreshToken,
        }
      });
      if (check.status === 200 || 201) {
        // console.log('⭐️check Card ZZim⭐️', check.data)
        setCount(check.data)
      }
    }
    catch(err) {
     console.error(err);
    };
  };
  // 카드 찜하기
  const heartHandler = async () => {
    try {
      const heart = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/place/heart/${id}`,
      {
        headers: {
          Authorization: accessToken,
          RefreshToken: refreshToken,
        }
      });
      if (heart.status === 200 || 201) {
        checkHeart();
      }
    }
    catch(err) {
     console.error(err);
    };
  };
  // 카드 찜하기 취소
  const disHeartHandler = async () => {
    try {
      const disHeart = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/place/disheart/${id}`,
      {
        headers: {
          Authorization: accessToken,
          RefreshToken: refreshToken,
        }
      });
      if (disHeart.status === 200 || 201) {
        checkHeart();
      }
    }
    catch(err) {
     console.error(err);
    };
  };

  useEffect(() => {
    if(id !== undefined) {
      checkHeart();
    }
  }, [id]);

  useEffect(()=>{
    if(click === true){
      if(count === false){
        heartHandler()
      }else{
        disHeartHandler()
      };
      clickCheck(!isClick)
      setIsClick(!isClick)
    };
  },[click]);

  useEffect(() => {
    zzimCheck(count);
  },[count]);

  return ( 
    <StDiv style={style} css={css}>
      {
        count === false
        ? <Btn 
          size='default' 
          variant='line' 
          onClick={heartHandler}
        >
          카드 찜하기
        </Btn>
        : <Btn 
          size='default' 
          variant='lineClicked' 
          onClick={disHeartHandler}
        >
          카드 찜하기 취소
        </Btn>
      }
    </StDiv>
  )
}

export default CardHeart;

const StDiv = styled.div`
  /* margin-bottom: 20rem; */
`