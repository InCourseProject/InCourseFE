/** 
 * @jsxImportSource @emotion/react
 * @read https://www.daleseo.com/emotion/
 */
 import styled from '@emotion/styled'
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
    fontWeight: fontWeight.light,
    lineHeight: lineHeights.caption,
    padding: `5px 24px`,
    borderRadius: `18px`,
  },
  search: {
    fontSize: fonts.body,
    fontWeight: fontWeight.light,
    lineHeight: lineHeights.body,
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
    },
  },
  line: {
    color: colors.deepGray,
    backgroundColor: `transparent`,
    boxSizing: `borderBox`,
    border: `1px solid ${colors.lightGray}`,
    '&:active,&:focus,&:hover': {
      backgroundColor: colors.tone,
    },
  },
  search: {
    color: colors.black,
    backgroundColor: `transparent`,
    height: '4.75rem',
    boxSizing: `borderBox`,
    border: `none`,
    margin: '0rem',
    '&:active,&:focus,&:hover': {
      backgroundColor: 'none',
      border: 'none'
    },
  },
};

// const outlines = {
//   any: {
//     '&:active,&:focus': {
//       outline: `1px solid ${colors.secondary}`,
//   }
// }
/*------------- 인풋 CSS 값 -------------*/

/**
 * 인코스 인풋 컴포넌트
 * @param {string} size 'default' | 'sm' 
 * @param {string} variant 'input' | 'line'
 * @param {*} disabled <option> disalbed
 */
const Input = ({ref, accept, onChange, placeholder, type, name, size, variant, minLenth, maxLength, value, clasName, style, onKeyUp, onKeyDown, css}) => {
  return (
    <StInput
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      name={name}
      type={type}
      accept={accept}
      minLength={minLenth}
      maxLength={maxLength}
      value={value}
      className={clasName}
      style={style}
      ref={ref}
      css={{
        ...sizeStyles[size],
        ...variants[variant],
        css
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
    border: 1px solid ${colors.primary};
  }

  &:disabled {
      cursor: default;
      color: ${colors.white};
      opacity: 0.6;
      background: ${colors.primary}
  }
  `; 