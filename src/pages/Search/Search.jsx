import React from "react";
import styled from "@emotion/styled";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import HeaderBar from "../../components/layout/HeaderBar";
import NaviBar from "../../components/layout/NaviBar";

const Search = () => {

  

  return (
  <>
  <HeaderBar/>
  <input type="text" />
  <MagnifyingGlassIcon style={{width:'2.4rem'}}/>
  <XMarkIcon style={{width:'2.4rem'}}/>
  this page is search
  <div>검색어1</div>
  <div>검색어2</div>
  <div>검색어3</div>
  <NaviBar/>
  </>
  );
};

export default Search;