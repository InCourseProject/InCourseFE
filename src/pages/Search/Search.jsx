import React from "react";
import styled from "@emotion/styled";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import HeaderBar from "../../components/layout/HeaderBar";
import NaviBar from "../../components/layout/NaviBar";
import Input from '../../components/Input';

const Search = () => {

  

  return (
  <StDiv>
  <HeaderBar/>
  <Input variant='line' type="text" />
  <MagnifyingGlassIcon style={{width:'2.4rem'}}/>
  <XMarkIcon style={{width:'2.4rem'}}/>
  
  <div>
    <div>검색어1</div>
    <div>검색어2</div>
    <div>검색어3</div>
  </div>
  
  <NaviBar/>
  </StDiv>
  );
};

export default Search;

const StDiv = styled.div`
  width: 100%;
  margin: 0px auto;
  padding: 0px 15px;
  max-width: 36rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`