import React, {useState, useRef} from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Btn from "../../../components/Button";
import { useEffect } from "react";

const CardHeart = ({id, heart, style, click, css}) => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  // console.log('props click is:', click);
  // console.log('cardId:',id,' cardHeart:',heart)
  
  //찜하기 찜하기 취소 전부 통신 성공, 
  //찜하기 성공 시 재렌더링 되지 않아 중복 체크가 가능
  //카운터 식인지? 이미 카운팅 되어있는 게시글은 어떻게 해야하는지
  const heartHandler = async () => {
    try {
      const heart = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/course/place/heart/${id}`,
      {
        headers: {
          Authorization: `${accessToken}`,
          RefreshToken: `${refreshToken}`,
        }
      });
      console.log('Card heart:', heart)

      if (heart.status === 200 || 201) {
        // console.log(heart, heart.data)
      }
    }
    catch(err) {
     console.error(err);
    };
  };

  const disHeartHandler = async () => {
    try {
      const disHeart = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/course/place/disheart/${id}`,
      {
        headers: {
          Authorization: `${accessToken}`,
          RefreshToken: `${refreshToken}`,
        }
      });
      console.log('Card disHeart:', disHeart)

      if (disHeart.status === 200 || 201) {
        console.log(disHeart,'works!')
      }
    }
    catch(err) {
     console.error(err);
    };
  };

  useEffect(()=>{
    if(click === false){
      return;
    }
    heartClicker();
  },[click])

  const heartClicker = () => {
    heart === 0
    ? heartHandler()
    : disHeartHandler()
  }

  return ( 
    <StDiv style={style} css={css}>
      {
        heart === 0
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