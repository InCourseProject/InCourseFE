import React from "react";
import { useEffect } from 'react'
import { _getPost } from '../../redux/modules/formSlice'
import styled from "@emotion/styled";
import Post from "../Post/Post";
import HomeComponent from "./components/HomeComponent";
import { useDispatch ,useSelector} from 'react-redux'

const Home = () => {
    return (

      <StWrap>
      <HomeComponent/>
      </StWrap>

    );
};

export default Home;

const StWrap = styled.div`
  width: 100%;
`