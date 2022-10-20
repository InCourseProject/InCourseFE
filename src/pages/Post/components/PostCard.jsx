/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import styled from '@emotion/styled'
import { HeartIcon } from '@heroicons/react/24/solid'
import { Map, MapMarker} from 'react-kakao-maps-sdk';
import { colors, fonts, fontWeight, lineHeights } from '../../../lib/constants/GlobalStyle'
import CardHeart from './CardHeart'
import { useEffect } from 'react';

const PostCard = ({card, i}) => {
  const cardIndex = i + 1
  const [ click, setClick ] = useState(false);
  // const [ heartCount, setHeartCount] = useState(card.heart);
  const clickCheck = (e) => {
    e.preventDefault()
    setClick(!click)
  };

  // const countCheck = (e) => {
  //   setHeartCount(e);
  // };
  // console.log('heartCount', heartCount);
  
  
  const heartStyle = {
    unClick:{
      color: colors.gray,
      '&:active,&:focus,&:hover': {
        color: colors.danger,
      },
    },
    click: {
      color: colors.danger,
      '&:active,&:focus,&:hover': {
        color: colors.gray,
      },
    }
  };
  

  const check = click === false
  ? heartStyle['unClick']
  : heartStyle['click'];

  useEffect(() => {

  },[card.heart]);

  return (
    <StContainer key={card.id}>
      <Wrap>
        <StTop>
          <CourseList>코스 {cardIndex}</CourseList>
          <StHeart
            onClick={clickCheck}
            css={{ ...check }}
          >
            <HeartIcon />
            <CardHeart
              click={click}
              style={{ display: 'none' }}
              id={card.id}
              // heart={card.CardHeart}
              // countCheck={countCheck}
            />
          </StHeart>
        </StTop>

        {/* <Map // 로드뷰를 표시할 Container
        center={{
          lat: card.coordinateX,
          lng: card.coordinateY 
        }}
        style={{
          width: "100%",
          height: "300px",
        }}
        level={2}
        // ref={mapRef}
      >
        <MapMarker 
          position={{ 
            lat: card.coordinateX,
            lng: card.coordinateY
          }} 
        />
      </Map> */}
        
        <StContents>
          <h1>{card.placeName}</h1>
          <p>{card.content}</p>
        </StContents>

      </Wrap>
    </StContainer>
  )
}

export default PostCard

const StContainer = styled.div`
  width: 100%;
  
`

const Wrap = styled.div`
  
  margin: 2rem;
  padding: 1.6rem;
  background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%), ${colors.lightGray};
  border: 1px solid ${colors.tone};
  border-radius: 2rem;
`

const StHeart = styled.div`
  width: 1.6rem;
  cursor: pointer;
  :hover{
    color: ${colors.danger};
  }
`

const CourseList = styled.p`
  color: ${colors.info};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
`
const StTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const StContents = styled.div`
  margin-top: 12rem;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  h1{
    overflow: hidden;
    width: 28rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    font-size: ${fonts.headLine};
    font-weight: ${fontWeight.exrtaBold};
    line-height: ${lineHeights.headLine};
  }
  p{
    overflow: hidden;
    width: 28rem;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: ${fonts.subTitle};
    font-weight: ${fontWeight.normal};
    line-height: ${lineHeights.subTitle};
  }
`