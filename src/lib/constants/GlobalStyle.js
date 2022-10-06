/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';

const GlobalStyle = () => (
  <Global styles={{
    '*': {
      // 전체 레이아웃 CSS는 이곳에 넣는 게 좋아보입니다.
      fontFamily: `Gothic A1, sans-serif`,
      fontSize: `62.5%`, //1rem
      ":focus":{
       outline: `none`,
      }
    }
  }}/>
  );
export default GlobalStyle;

export const colors = {
  black: "#000000",
  deepGray:"#575858",
  gray:"#989898",
  lightGray:"#DDDDDD",
  tone:"#F1F1F1",
  white: "#FFFFFF",
  primary : "#AED9FC",
  secondary: "#4CA6F7",
  success : "#9ADE48",
  danger : "#FD152F",
  caution: "#EBD425",
  info: "#007DE5",
  naver: "#03c75a",
  kakao: "#FEE500"


}
export const fonts = {
  headLine: "2.5rem",
  subTitle: "2rem",
  body: "1.5rem",
  caption: "1.2rem"

}
export const fontWeight = {
  exrtaBold: "800",
  bold: "700",
  normal: "500",
  light: "400"
}

export const lineHeights = {
  headLine: "3.125rem",
  subTitle: "2.5rem",
  body: "1.875rem",
  caption: "1.8rem"
}