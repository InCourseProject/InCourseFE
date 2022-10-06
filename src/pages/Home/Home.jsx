import React from "react";

import styled from "@emotion/styled";
import Post from "../Post/Post";
import HomeComponent from "./components/HomeComponent";
import HeaderBar from "../../components/layout/HeaderBar";
import NaviBar from "../../components/layout/NaviBar";



const Home = () => {

    return (

      <>
      <HeaderBar/>
      <HomeComponent/>
      <NaviBar/>
      </>

    );
};

export default Home;