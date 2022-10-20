import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import SearchHistory from "./components/SearchHistory";
import HeaderBar from "../../components/layout/HeaderBar";
import NaviBar from "../../components/layout/NaviBar";
import { colors, fonts, fontWeight, lineHeights } from "../../lib/constants/GlobalStyle";
import Btn from "../../components/Button";
import Input from '../../components/Input';
import axios from "axios";

const Search = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
  const wordStorage = localStorage.keyword !== undefined
  ? localStorage.getItem('keyword')
  : localStorage.setItem('keyword', JSON.stringify([])); 
  
  const keywords = wordStorage === undefined
  ? []
  : [...JSON.parse(wordStorage)]; //검색 키워드 어레이
  
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState(keywords);
  // console.log('search>>>', search, 'searchList>>>', searchList)
  console.log('search List >', searchList);
  
  const searchOnChange = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);
  });

  const enterKey = (e) => {
    if (e.nativeEvent.key === 'Enter'){
      if(e.nativeEvent.isComposing === false) {
        e.preventDefault();
        setSearchList([...searchList, search])
        fetchSearch();
      };
    };
    return;
  };

  const clickKey = () => {
    setSearchList([...searchList, search])
    fetchSearch();
  };

  useEffect(() => {
    localStorage.setItem('keyword', JSON.stringify(searchList));
  }, [searchList]);

  const fetchSearch = async () => {    
    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/search?keyword=${search}`, {
      headers:{
        Authorization: accessToken,
        RefreshToken: refreshToken,
      }
      });
      if (res.status === 200 || 201){
        console.log('work!',res);
        setSearch('')
        navigate('post', 
        {
          state: {
            search: search, 
            post: res.data,
          }
        });
      } 
    }catch(err){
      console.error(err);
    }
  };

  return (
  <StDiv>
    <HeaderBar/>
    <StH1>검색</StH1>
    <SearchBar>
      <SearchInputContainer>
        <MagnifyingGlassIcon style={{width:'2.4rem'}}/>
        
        <Input onChange={searchOnChange} onKeyDown={enterKey} size='default' variant='search' type="text" />
        <Btn css={{margin:'0'}} size='sm' disabled={!search} onClick={clickKey}>검색</Btn>
      </SearchInputContainer>
      <XMarkIcon style={{width:'2.4rem'}}/>
    </SearchBar>
    {/* <div>추천 검색어</div> */}
    <div>최근 검색어</div>
    <SearchLists>
      {searchList.length === 0
      ? <div>최근 검색 내역이 없습니다.</div>
      :searchList.map((history, i) => 
      <SearchHistory key={i} history={history} />
      )
      }
    </SearchLists>
    
    

    {/* <NaviBar/> */}
  </StDiv>
  );
};

export default Search;

const StDiv = styled.div`
  width: 100%;
  margin: 0px auto;
  padding: 0px 15px;
  max-width: 36rem;
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; */
`

const StH1 = styled.h1`
    color: ${colors.black};
    font-size: ${fonts.headLine};
    font-weight: ${fontWeight.exrtaBold};
    line-height: ${lineHeights.headLine};
`

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
`

const SearchInputContainer = styled.div`
  width: 100%;
  margin-top: 5rem;
  border: 1px solid red;
  border-radius: 30rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const SearchLists = styled.div`
  /* display: grid; */
`