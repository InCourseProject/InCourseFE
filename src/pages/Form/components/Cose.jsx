import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../lib/constants/GlobalStyle'
const Cose = ({cose}) => {
    return (
        <StContainer key={`cose-${cose.coordinateX},${cose.coordinateY}`}>
            <img src="" alt="" />
            <StCoseButton>
                <h2>코스1</h2>
                <div>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </StCoseButton>
            <div>
                <h1>{cose.placeName}</h1>
                <p>{cose.content}</p>
            </div>
        </StContainer>
    )
}

export default Cose

const StContainer = styled.div`
    width: 100%;
    background-color: ${colors.lightGray};
    border-radius: 20px;
    padding: 10px;
`
const StCoseButton = styled.div`
    display: flex;
    justify-content: space-between;
`