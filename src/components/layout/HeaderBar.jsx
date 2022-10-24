/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import logo from '../../lib/constants/img/incourseLogo.svg'


const HeaderBar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  const refreshToken = localStorage.getItem('RefreshToken') //refreshToken

  const [path, setPath] = useState(window.location.pathname)

  useEffect(()=> {
    setPath(window.location.pathname)
  },[path])


  return (
    <StWrap>
      <LeftIcon>
      {path === '/'
        ? <LogoImg src={logo} alt='logo'
          onClick={() => navigate('/')}
        />
        : <ArrowLeftIcon alt='back'
          onClick={() => navigate(-1)} 
        />
      }
      </LeftIcon>
      
      <RightIcon isUrl={path}>
        {accessToken&&refreshToken
        // ? null
        ? <MagnifyingGlassIcon alt='search'
          onClick={() => navigate('/search')}
          style={{width:'2.4rem'}} 
        />
        : <StSpan
          onClick={() => navigate('/login')}
          
        >
          로그인
        </StSpan>
        }
      </RightIcon>
    </StWrap>
  )
};

export default HeaderBar;

const StWrap = styled.div`
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

  backdrop-filter: blur(0.5px);
`

const LogoImg = styled.img`
  width: 2.9rem;
  cursor: pointer;
`

const LeftIcon = styled.span`
  width: 2.4rem;
  cursor: pointer;
`

const RightIcon = styled.span`
  cursor: pointer;
  ${(props) => 
    props.isUrl === '/login' ? css`display: none;` 
    : props.isUrl === '/signup' ? css`display: none;` 
    : props.isUrl === '/signup/email' ? css`display: none;` 
    : props.isUrl === '/emailconfirm' ? css`display: none;` 
    : props.isUrl === '/signup/detail' ? css`display: none;` 
    : props.isUrl === '/category' ? css`display: none;`
    : props.isUrl === '/form' ? css`display: none;` 
    : props.isUrl === '/mypage' ? css`display: none;` 
    : props.isUrl === '/mypage/edit' ? css`display: none;` 
    : props.isUrl === '/search/post' ? css`display: none;` 
    : null}
`

const StSpan = styled.span` 
  min-width: 4rem;
  color: ${colors.info};
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
  
`

