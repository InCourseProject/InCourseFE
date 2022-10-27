import styled from "@emotion/styled";
import { fonts, fontWeight, lineHeights } from "../../lib/constants/GlobalStyle";
import loading from "../../lib/constants/img/incourseLoading.gif"

const Loading= () => {
  
  // Random Quotes
  const quotes = [
    '인싸들에게 연락 중',
    '코스 이어 붙이는 중',
    '날씨에 맞는 옷 고르는 중',
  ];

  const randomQuote = (array) => {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  };
  
  const quote = randomQuote(quotes);

  return (
    <Back>
      <Text>{quote}</Text>
      <LoadingImg src={loading} alt="Loading Image" />  
    </Back>
  );
};

export default Loading;

const Back = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text = styled.div`
  text-align: center;
  font-size: ${fonts.caption};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeights.caption};
`

const LoadingImg = styled.img`
  /* 로딩 중 스크롤 방지 */
  overflow: hidden;
  overflow-y: hidden;
  width: 20%;
`

const WhenLoaded = styled.div`
  /* 로딩이 끝나면 */
  overflow: auto;
  opacity: 0;

`