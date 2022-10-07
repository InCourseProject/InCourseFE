/** 
 * @jsxImportSource @emotion/react
 * @read https://www.daleseo.com/emotion/
 */
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { colors, fonts, fontWeight, lineHeights } from '../lib/constants/GlobalStyle'

/*------------- 버튼 CSS 값 -------------*/
const sizeStyles = {
  default: {
    fontSize: fonts.body,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeights.body,
    padding: `20px 26px`,
    borderRadius: `15px`,
  },
  sm: {
    fontSize: fonts.caption,
    fontWeight: fontWeight.light,
    lineHeight: lineHeights.caption,
    // Width: 'fit-content',
    padding: `5px 24px`,
    borderRadius: `18px`,
  },
};

const variants = {
  main: {
    color: colors.white,
    background: colors.primary,
    
    '&:active,&:focus,&:hover': {
      backgroundColor: colors.secondary,
    },
  },
  sub: {
    color: colors.gray,
    backgroundColor: colors.tone,
    boxSizing: 'borderBox',
    '&:active,&:focus,&:hover': {
      backgroundColor: colors.lightGray,
      color: colors.white
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
  badge: {
    color: colors.secondary,
    backgroundColor: `transparent`,
    boxSizing: `borderBox`,
    border: `1px solid ${colors.secondary}`,
  },
  kakao: {
    color: colors.deepGray,
    backgroundColor: colors.kakao,
    '&:active,&:focus,&:hover': {
      backgroundColor: `#f0d800`,
    }
  },
  naver: {
    color: colors.deepGray,
    backgroundColor: colors.naver,
    '&:active,&:focus,&:hover': {
      backgroundColor: `#03bc55`,
    }
  },
};
/*------------- 버튼 CSS 값 -------------*/

/**
 * 인코스 버튼 컴포넌트
 * @param {string} size 'default' | 'sm' 
 * @param {string} variant 'main' | 'input' | 'line'
 * @param {*} disabled <option> disalbed
 */
const Btn = ({disabled, size, variant, children, onClick, value, className}) => {

  return (
    <StyledButton 
      onClick={onClick}
      disabled={disabled} 
      value={value}
      className={className}
      css={{
        ...sizeStyles[size],
        ...variants[variant],
        // css
      }}
    >
      {children}
    </StyledButton>
  );
};

export default Btn;

const StyledButton = styled.button` 
  margin: 0;
  margin-top: 10vh;
  border: none;
  cursor: pointer;
  
  width: 100%;
  max-width: 330px;
  height: 59px;
/* 
  display: flex;
  align-items: center;
  justify-content: center;

   */

  /* defalut size */
  /* font-size: 1rem;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 8px; */
  /* defalut color */
  background-color: ${colors.primary};
  color: ${colors.white};

  /* &:active:hover:focus:not([disabled]) {
    background-color: ${colors.secondary};
  } */

  &:disabled {
      cursor: default;
      color: ${colors.white};
      opacity: 0.5;
      background: ${colors.primary}
      
  }
  `;

  // 기존 작성한 styled component의 tag를 변경하고 싶다면 withComponent 사용.
  // const Stimg = StyledButton.withComponent('image');

  