import React from 'react'
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import HomeCard from './HomeCard'
const HomeComponent = () => {
    return (
        <div>
            <div><TitH1 >오늘의 날씨는 <br/>날씨 데이터 <br/>입니다.</TitH1></div>
            <StDivWrap>
                <ul>
                    <li>옷이 잘 머울리실거에요.</li>
                    <li>챙길것을 챙기시는 건 어떠세요?</li>
                    
                </ul>
                <div><button> 하루의 코스 만들러 가기 </button></div>
            </StDivWrap>
            <div>
                <h1>추천코스</h1>
                <HomeCard/>
            </div>
        </div>
    )
}

export default HomeComponent

const TitH1 = styled.h1`
    width: 100%;
    text-align: center;
`
const StDivWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`