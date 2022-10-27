import React, {useState} from "react";
import styled from "@emotion/styled";
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import FeedbackModal from "./FeedbackModal";

const Feedback = () => {
  const [click, setClick] = useState(false);
  
  return(
    // 버튼을 누르면 modal 생성
    <Container>
    <PencilSquareIcon style={{width:'2.4rem'}}/>
    </Container>
  )
};

export default Feedback;

const Container = styled.div`
  height: fit-content;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  background-color: red;
  z-index: 400px;
`