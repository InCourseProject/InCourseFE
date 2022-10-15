import React from 'react'
import CartegoryBox from './components/CartegoryBox'
import HeaderBar from '../../components/layout/HeaderBar'
import logo from '../../lib/constants/img/incourseLogo.svg'
import styled from '@emotion/styled'
const Cartegory = () => {
  return (
    <>
    
    <HeaderBar/>
    <StLogoWrap>
                <img src={logo} alt="" />
            </StLogoWrap>
    <CartegoryBox/>
    </>
  )
}

export default Cartegory

const StLogoWrap = styled.div`
    width: 100%;
    text-align: center;
    padding: 60px;
    
`