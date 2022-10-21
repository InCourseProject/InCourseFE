/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { colors, fonts, fontWeight, lineHeights } from "../../../lib/constants/GlobalStyle"; 
import HeaderBar from "../../../components/layout/HeaderBar";
import NaviBar from "../../../components/layout/NaviBar";
import HomeCard from "../../Home/components/HomeCard";
import SearchHistory from "./SearchHistory";


const SearchPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  
  const search = location.state.search
  const post = location.state.post
  console.log(post);
  // const [list, setList] = useState();

  useEffect(() => {
  },[]);



  return(
    <Stdiv>
      <HeaderBar/>
      <SearchWord>검색어</SearchWord>
      <SearchHistory history={search}/>
      <StH1>추천코스</StH1>
      {post.length === 0
      ? <NonHistoryTxt>
        <p>키워드가 포함된 게시글이 아직 없어요!</p>
        <div
          onClick={() => navigate('/category')}
          css={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            color: `${colors.secondary}`,
          }}>
          <div 
            css={{
              marginTop: '0.8rem',
              fontSize: `${fonts.body}`,
              fontWeight: `${fontWeight.bold}`,
              lineHeight: `${lineHeights.body}`,
              cursor:'pointer',
            }}
          >코스를 추천해줄 인싸 어디 없나</div>
          <PlusCircleIcon 
            css={{
              width:'3rem', 
              cursor:'pointer',
            }}/>
        </div>
      </NonHistoryTxt>
      : post.map((post) =>
        <HomeCard key={post.id} post={post} />
      )}
      <NaviBar/>
    </Stdiv>
  );
};

export default SearchPost;

const Stdiv = styled.div`
  width: 100%;
  margin: 0rem auto;
  padding: 0rem 1rem;
  max-width: 36rem;
`
const SearchWord = styled.div`
  margin-top: 7.5rem;
  margin-left: 0.8rem;

  font-size: ${fonts.body};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.body};
`
const StH1 = styled.h1`
  /* margin-top: 3.8rem; */
  margin: 3.8rem 0rem 2.8rem 1.2rem;  
  color: ${colors.black};
  font-size: ${fonts.headLine};
  font-weight: ${fontWeight.exrtaBold};
  line-height: ${lineHeights.headLine};
`

const NonHistoryTxt = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p{
    color: ${colors.lightGray};
    font-size: ${fonts.body};
    font-weight: ${fontWeight.bold};
    line-height: ${lineHeights.body};
  }
`