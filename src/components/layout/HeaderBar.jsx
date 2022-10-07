import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import logo from '../../lib/constants/img/incourseLogo.svg'


const HeaderBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem('Authorization'); //accesstoken 
  // const refreshToken = localStorage.getItem('RefreshToken') //refreshToken

  const [ isUrl, setIsUrl ] = useState('');
  console.log(isUrl)

  useEffect(()=> {
    setIsUrl(location.pathname)
  },[])

  return (
    <StWrap>
      <LeftIcon>
      {location.pathname === '/'
        ? <LogoImg src={logo} alt='logo'
          onClick={() => navigate('/')}
        />
        : <ArrowLeftIcon alt='back'
          onClick={() => navigate(-1)} 
        />
      }
      </LeftIcon>
      {/* {location.pathname} */}
      <RightIcon>
        {accessToken
        ? <MagnifyingGlassIcon alt='search'
          /* onClick={() => navigate('search')} */
          // css={displayToggle}
        />
        : <StSpan
          isKeyDown
          onClick={() => navigate('login')}
          isUrl={isUrl}
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
  width: 2.4rem;
  cursor: pointer;
`


// const displayToggle = (url) =>  {
//   return css`
//     display: ${
//       url === '/signup' || 'login'
//       ? 'none'
//       : null
//     };
//   `;
// };



const StSpan = styled.span` 
  min-width: fit-content;
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
  display: ${(props) => props.isUrl==='/sign'||'login'?'none':'flex'};
  cursor: pointer;
`