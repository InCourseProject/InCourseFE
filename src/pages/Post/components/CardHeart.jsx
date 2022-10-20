import React, {useState, useRef} from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Btn from "../../../components/Button";
import { useEffect } from "react";

const CardHeart = ({id, heart, countCheck,  style, click, css}) => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  // console.log('props click is:', click);
  // console.log('cardId:',id,' cardHeart:',heart)
  
  const [count, setCount] = useState(false);
  // console.log(id);

  //카운터 식인지? 이미 카운팅 되어있는 게시글은 어떻게 해야하는지

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
        console.log('check Card ZZim', check)
        // console.log('ZZim >>', count);
        setCount(check.data)
      }
    }
    catch(err) {
     console.error(err);
    };
  };

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
        // console.log(heart.data)
        // countCheck(1);
        // setCount(1);
      }
    }
    catch(err) {
     console.error(err);
    };
  };

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
        // console.log(disHeart.data)
        // countCheck(0);
        // setCount(0);
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
  }, [id])

  useEffect(()=>{
    if(click === false){
      return;
    }
    heartClicker();
  },[click])

  const heartClicker = () => {
    count === false
    ? heartHandler()
    : disHeartHandler()
  }

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