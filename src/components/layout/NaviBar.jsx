import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle'
import { HomeIcon, PlusCircleIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/solid'
// import { HomeIcon, PlusCircleIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

const NaviBar = () => {
  const navigate = useNavigate();
  const iconStyle = {
    bottom: {
      width: '2.4rem',
      cursor: 'pointer',
    }
  }

  return (
    <BarContainer>
      <MenuContainer onClick={() => navigate('/')}>
        <HomeIcon style={{...iconStyle['bottom']}} alt="Move to Home"/>
        <MenuTxt>Home</MenuTxt>
      </MenuContainer>
      <MenuContainer onClick={() => navigate('/category')}>
        <PlusCircleIcon style={{...iconStyle['bottom']}} alt="Add My Incourse"/>
        <MenuTxt>My Incourse</MenuTxt>
      </MenuContainer>
      <MenuContainer onClick={() => navigate('/search')}>
        <MagnifyingGlassIcon style={{...iconStyle['bottom']}} alt="Search Cousres"/>
        <MenuTxt>Search</MenuTxt>
      </MenuContainer>
      <MenuContainer onClick={() => navigate('/mypage')}>
        <UserIcon style={{...iconStyle['bottom']}} alt="My page"/>
        <MenuTxt>My page</MenuTxt>
      </MenuContainer>
    </BarContainer>
  )
};

export default NaviBar;

const BarContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  border-top: 0.5px solid #F1F1F1;

  color: ${colors.white};
  background-color: ${colors.primary};

  filter: drop-shadow(0px -8px 20px rgba(174, 217, 252, 0.1)) drop-shadow(0px -16px 30px rgba(112, 144, 176, 0.2));
`
const MenuContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  :hover{
    color: ${colors.secondary};

  }
`
const MenuTxt = styled.span`
  cursor: pointer;
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
`