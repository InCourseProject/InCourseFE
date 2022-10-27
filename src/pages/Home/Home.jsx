import React from "react";
import { _getPost } from '../../redux/modules/formSlice'
import styled from "@emotion/styled";
import HomeComponent from "./components/HomeComponent";
import HeaderBar from "../../components/layout/HeaderBar";
import NaviBar from "../../components/layout/NaviBar";
import Feedback from "../../components/Feedback";
const Home = () => {
 
    return (
      <>
      <HeaderBar/>
      <StWrap>
        <HomeComponent/>
      </StWrap>
      <Feedback style={{zIndex: '1000rem'}}/>
      <NaviBar/>
      </>
    );
};

export default Home;

const StWrap = styled.div`
  width: 100%;
  margin-bottom: 12rem;
  z-index: -1;
`