/** 
 * @jsxImportSource @emotion/react
 * @read https://www.daleseo.com/emotion/
 */
 import styled from '@emotion/styled'
 import { css } from '@emotion/react'
 import { colors, fonts, fontWeight, lineHeights } from '../lib/constants/GlobalStyle'

 /*------------- 인풋 CSS 값 -------------*/
const sizeStyles = {
  default: {
    fontSize: fonts.body,
    fontWeight: fontWeight.light,
    lineHeight: lineHeights.body,
    padding: `20px 26px`,
    borderRadius: `15px`,
  },
  sm: {
    fontSize: fonts.caption,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeights.caption,
    padding: `8px 12px`,
    borderRadius: `15px`,
  },
};

const variants = {
  input: {
    color: colors.deepGray,
    backgroundColor: colors.tone,
    border: `1px solid ${colors.lightGray}`,

    '&::placeholder': {
      color: colors.gray,
    },
    '&:active,&:focus': {
      outline: `1px solid ${colors.secondary}`,
      // outline: `1px solid ${colors.danger}`,
    },
  },
  line: {
    color: colors.deepGray,
    backgroundColor: `transparent`,
    boxSizing: `borderBox`,
    border: `1px solid ${colors.lightGray}`,
    '&:active,&:focus,&:hover': {
      backgroundColor: colors.tone,
    }
  },
};
/*------------- 인풋 CSS 값 -------------*/

/**
 * 인코스 인풋 컴포넌트
 * @param {string} size 'default' | 'sm' 
 * @param {string} variant 'input' | 'line'
 * @param {*} disabled <option> disalbed
 */
const Input = ({onChange, placeholder, type, name, size, variant, minLenth, maxLength, value}) => {
  return (
    <StInput
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      type={type}
      minLength={minLenth}
      maxLength={maxLength}
      value={value}
      css={{
        ...sizeStyles[size],
        ...variants[variant]
      }}
    />
  )
};

export default Input;

const StInput = styled.input`
  margin: 0;
  margin-top: 1rem;
  border: none;
 
  width: 100%;
  max-width: 330px;
  height: 59px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  
  &:active,
  &:focus {
    /* background-color: ${colors.secondary}; */
    border: 1px solid ${colors.primary};
  }

  &:disabled {
      cursor: default;
      color: ${colors.white};
      opacity: 0.6;
      background: ${colors.primary}
  }
  `; 