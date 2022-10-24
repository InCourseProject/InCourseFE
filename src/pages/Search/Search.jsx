/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import logo from '../../lib/constants/img/incourseLogo.svg';
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import SearchHistory from "./components/SearchHistory";
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
    <SearchHeader>
        <img 
          src={logo} alt='logo'
          onClick={() => navigate('/')}
          css={{width:'2.9rem', cursor: 'pointer'}} 
        />
        <XMarkIcon alt='close'
          onClick={() => navigate(-1)}
          css={{width:'2.4rem', cursor: 'pointer'}} 
        />
    </SearchHeader>
    <StH1>검색</StH1>
    <SearchBar>
      <SearchInputContainer>
        <MagnifyingGlassIcon 
          css={{
            width: '2.4rem',
            color:`${colors.secondary}`,
            marginRight: '2.5rem',
          }}
        />
        <Input 
          onChange={searchOnChange} 
          onKeyDown={enterKey} 
          size='search'      
          variant='search' 
          type="text" 
          // css={{
          //   margin:'0px', 
          //   height:'0px',
          // }} 
        />
        <Btn 
          css={{
            margin:'0',


          }} 
          size='btn'
          variant='btn' 
          disabled={!search} 
          onClick={clickKey}
        >
          검색
        </Btn>
      </SearchInputContainer>
    </SearchBar>
    <div 
      css={{
        marginTop: '3.8rem',
        marginLeft: '1.2rem',
        marginBottom: '2.8rem',
        fontSize: `${fonts.body}`,
        fontWeight: `${fontWeight.bold}`,
        lineHeight: `${lineHeights.body}`,
      }}
    >
      최근 검색어
    </div>
    <SearchLists>
      {searchList.length === 0
      ? <NotSearchList>최근 검색 내역이 없습니다.</NotSearchList>
      :searchList.map((history, i) => 
      <SearchHistory key={i} history={history} />
      )
      }
    </SearchLists>
  </StDiv>
  );
};

export default Search;

const StDiv = styled.div`
  width: 100%;
  margin: 0px auto;
  /* padding: 0px 10px; */
  max-width: 36rem;
`

const SearchHeader = styled.div`
  width: 100%;
  height: 44px;
  padding: 0px 15px;
  color: ${colors.primary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
`


const StH1 = styled.h1`
    margin-top: 7.5rem;
    margin-left: 0.8rem;
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
  margin-top: 1.8rem;
  padding: 0rem 0.5rem 0rem 2.5rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 30rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:active,:focus,:hover {
    outline: 1px solid ${colors.lightGray};
  };
`

const SearchLists = styled.div`
  margin-left: 0.5rem;

`
const NotSearchList = styled.div`
  margin-top: 6rem;
  color: ${colors.lightGray};
  font-size: ${fonts.body};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.body};
  display: flex;
  justify-content: center;
  align-items: center;
`
