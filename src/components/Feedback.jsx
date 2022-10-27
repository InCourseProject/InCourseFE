/** @jsxImportSource @emotion/react */
import React, {useState} from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "../lib/constants/GlobalStyle";
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import FeedbackModal from "./FeedbackModal";

const Feedback = () => {
  const [click, setClick] = useState(false);

  const clickFeedback = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSevp5qJHxEA2g1uEWuEni7aH1QlWghZumVdL-AcmS8HdT0-xg/viewform?usp=sf_link')
  };

  return(
    // 버튼을 누르면 modal 생성
    <Container onClick={clickFeedback}>
    <PencilSquareIcon css={{width:'2rem', color:`${colors.primary}`}}/>
    {/* <div className="Main">
      // 회원가입 버튼을 누르면 회원가입 modal이 생성된다
      <input type="button" value="회원가입" className="blueBtn" onClick={() => setSignup(!signup)}/>
      {signup && (
        <FeedbackModal closeModal={() => setClick(!click)}>
          <Signup />
        </Modal>
      )}
    </div> */}
    
      {/* <hr/>
      <h1>ICOURSE 설문조사 이벤트</h1>
      <hr/>
      <p>저희가 제작한 플랫폼 서비스의 만족도에 대해 조사하고자 이벤트를 준비했습니다.</p>
      <h3>Event 1. 써보셨나요? 인코스</h3>
      <p>게시글 작성 후 맘에 드는 코스를 찜 하시면 추첨을 통해 스타벅스 아이스 아메리카노 기프티콘을 보내드립니다.</p> 
      <a href="우리 설문조사 링크">참여하기</a>
      <br/>
      <br/>
      <h3>Event 2. 제 1회 핵인싸 경연대회</h3>
      <p>가장 좋아요를 많이 받은 핵인싸 회원 한 분에게 배민 외식상품권 3만원 쿠폰을 드립니다.</p> 
      <p>많은 참여와 관심부탁드립니다.</p>
      <p>기간: 10월 31일 까지</p> */}
    </Container>
  )
};

export default Feedback;

const Container = styled.div`
  /* width: fit-content; */
  /* width: 100vw; */
  height: fit-content;
  padding: 1rem;
  border: 1px solid rgba(240, 240, 235, 0.3);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 9.5rem;
  left: 1.5rem;
  background-color: ${colors.secondary};
  box-shadow: 0px 0px 20px rgba(174, 217, 252, 0.1), 0px 0px 30px rgba(112, 144, 176, 0.2);
  z-index: 1000px;
  :hover{
    background-color: ${colors.info};
  };
  cursor: pointer;
`