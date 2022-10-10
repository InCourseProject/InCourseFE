/** @jsxImportSource @emotion/react */
import React, {useState} from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { colors,fonts, fontWeight, lineHeights } from "../../../lib/constants/GlobalStyle";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css'


const Score = ({id}) => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  
  const initialState = {
    score: 60,
  };

  const [score, setScore] = useState(initialState);
  const scoreHandler = (e) => {
    setScore({'score':e})
  };

  console.log(score);

  const postHandler = async () => {
    try {
      
      const heart = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/course/score/${id}`,
      score,
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

  const sliderCSS = {
    marginTop: '4.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
    '.rc-slider-rail': {
      backgroundColor: `${colors.white}`
    },
    '.rc-slider-track': {
      backgroundColor: `${colors.secondary}`,
    },
    '.rc-slider-handle': {
      width: '1rem',
      height: '1rem',
      border: 'none',
      outline: `solid 0.8rem ${colors.secondary}`,
      opacity: '1'
    }
  };

  return(
    <StWrap>
      <StContainer>
        <StLabel>이 코스는요</StLabel>
        <CourseBanner>엑설런트 코스</CourseBanner>
        
        <SliderWrap
          onMouseUp={postHandler}
        >
          <Slider
            css={sliderCSS}
            step={20}
            min={20}
            max={100}
            defaultValue={60}
            onChange={scoreHandler}
          />
        </SliderWrap>
        
        <CourseBottom>
          <span>BAD</span>
          <span>PERFECT</span>
        </CourseBottom>
      </StContainer>
    </StWrap>
  );
};

export default Score;

const StWrap = styled.div`
  width: 100%;
  margin-top: 4rem;
  margin-bottom: -5rem;
`

const StContainer = styled.div`
  height: 21rem;
  margin: 0px 15px;
  padding: 1.6rem;
  border-radius: 1.5rem;
  background-color: ${colors.tone};
`

const StLabel = styled.span`
  color: ${colors.gray};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
`
const CourseBanner = styled.div`
  width: 100%;
  height: 5.1rem;
  margin-top: 1.6rem;
  border-radius: 1.5rem;
  background-color: ${colors.white};
  font-size: ${fonts.subTitle};
  font-weight: ${fontWeight.exrtaBold};
  line-height: ${lineHeights.subTitle};
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const SliderWrap = styled.div`
  margin: 0rem 2rem;
`

const CourseBottom =styled.div`
  width: 100%;
  margin: 1rem auto;
  padding: 0rem 2.5rem; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${colors.gray};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
`