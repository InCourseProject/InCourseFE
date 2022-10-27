/** @jsxImportSource @emotion/react */
import React, {useState} from "react";
import styled from "@emotion/styled";
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

    <Container alt='이렇게하면?' onClick={clickFeedback}>
    <PencilSquareIcon css={{width:'2.4rem', color:`${colors.primary}`}}/>

    </Container>
  )
};

export default Feedback;

const Container = styled.div`
  height: fit-content;
  padding: 1.5rem;
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
  cursor: pointer;
  :hover{
    background-color: ${colors.info};
  };
`