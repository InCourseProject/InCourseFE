import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fonts, fontWeight, lineHeights } from "../../lib/constants/GlobalStyle";
import loading from "../../lib/constants/img/incourseLoading.gif"

const Loading= () => {
  // window.addEventListener('load')
  
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


  //store 나 페이지에 적용될 내용들

  // const mainApi = async () => {
  //   setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
  //     try {
  //       const response = await fetch(`api url`, {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(),
  //       });
  
  //       const result = await response.json();
  //       console.log('mainData', result);
  //       setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
  //     } catch (error) {
  //       window.alert(error);
  //     }
  // };
  
  //     useEffect(() => {
  //         mainApi();
  //     }, []);
  
  //     return (
  //     <div>
  //       {loading ? <Loading /> : null} // Loading이 true면 컴포넌트를 띄우고, false면 null(빈 값)처리 하여 컴포넌트 숨김
  //       <div>페이지 내용들</div>
  //     </div>
  //     );
  // };
  // 출처: https://anerim.tistory.com/221 [디발자 뚝딱:티스토리]


  return (
    <Back>
      <Text>{quote}</Text>
      <LoadingImg src={loading} alt="Loading Image" />  
    </Back>
  );
};

export default Loading;

const Back = styled.div`
  position: absolute;
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
  width: 20%;

`

const WhenLoaded = styled.div`
  /* 로딩이 끝나면 */
  overflow: auto;
  opacity: 0;

`

//  'aria-label': 'loading',