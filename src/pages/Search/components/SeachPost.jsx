import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import HeaderBar from "../../../components/layout/HeaderBar";
import NaviBar from "../../../components/layout/NaviBar";
import { useLocation } from "react-router-dom";
import HomeCard from "../../Home/components/HomeCard";


const SearchPost = () => {
  const location = useLocation();
  console.log(location.state);
  const search = location.state.search
  const post = location.state.post
  // const [list, setList] = useState();

  // useEffect(() => {

  // },[]);

  // 키워드가 포함된 게시글이 아직 없어요!
  // 코스를 추천할 최초의 인싸 되기

  return(
    <Stdiv>
      <HeaderBar/>
      <div>검색어</div>
      <div>{search}</div>
      <h1>추천코스</h1>
      {post.map((post) =>
        <HomeCard key={post.id} post={post} />
      )}
      <NaviBar/>
    </Stdiv>
  );
};

export default SearchPost;

const Stdiv = styled.div`
  
`