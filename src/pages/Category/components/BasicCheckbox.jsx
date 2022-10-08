import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../lib/constants/GlobalStyle'
import { type } from '@testing-library/user-event/dist/type'
const BasicCheckbox = ({label, value, checked, setter}) => {

  return (
    <Stinput >
      <Stinputs className='select' type="radio" checked={checked == value}
        onChange={() => setter(value)} />
      <span className='select'>{label}</span>
    </Stinput>
  )
}

export default BasicCheckbox

const Stinput = styled.label`
width: 100%;
    .select[type =radio]{
      display: none;
    }
    .select{
      display: inline-block;
    cursor: pointer;
    height: 24px;
    width: 100%;
    padding: 5px;
    border-radius: 15px;
    text-align: center;
    transition: all 0.4s;
    font-weight:bold;
    background-color: ${colors.primary};
    color: ${colors.white};
    font-size:13px;
    }
    
    
    
`
const Stinputs = styled.input`
/* display: inline-block;
    cursor: pointer;
    height: 24px;
    width: 100%;
    border: 1px solid #333;
    line-height: 24px;
    text-align: center;
    font-weight:bold;
    font-size:13px;
    background-color: #fff;
    color: #333; */
    :checked+span{background-color: ${colors.secondary};
    color: #fff;}
    
  
`