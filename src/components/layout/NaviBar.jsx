import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { colors, fonts, fontWeight, lineHeights } from '../../lib/constants/GlobalStyle'
import { HomeIcon, PlusCircleIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/solid'
// import { HomeIcon, PlusCircleIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

const NaviBar = () => {
  const navigate = useNavigate();
  const iconStyle = css({
    color: `${colors.white}`,
    width: '2.4rem',
    cursor: 'pointer',
  })
    // color: ${colors.white};
    // width: 2.4rem;
    // cursor: pointer;
  
  return (
    <BarContainer>
      <MenuContainer onClick={() => navigate('/')}>
        <HomeIcon css={iconStyle} alt="Move to Home"/>
        <MenuTxt>Home</MenuTxt>
      </MenuContainer>
      <MenuContainer onClick={() => navigate('form')}>
        <PlusCircleIcon css={{
          width: "2.4rem"
        }} alt="Add My Incourse"/>
        <MenuTxt>My Incourse</MenuTxt>
      </MenuContainer>
      <MenuContainer onClick={() => navigate('/')}>
        <MagnifyingGlassIcon alt="Search Cousres"/>
        <MenuTxt>Search</MenuTxt>
      </MenuContainer>
      <MenuContainer onClick={() => navigate('mypage')}>
        <UserIcon alt="My page"/>
        <MenuTxt>My page</MenuTxt>
      </MenuContainer>
    </BarContainer>
  )
};

export default NaviBar;

const BarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${colors.white};
  background-color: ${colors.primary};
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