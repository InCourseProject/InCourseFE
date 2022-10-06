import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../lib/constants/GlobalStyle'
import { useDispatch,useSelector } from 'react-redux'
import { deleteCose } from '../../../redux/modules/formSlice'
const Cose = ({cose}) => {
    const co = useSelector((state)=> state.formSlice.form.placeRequestDtoList
    )
    console.log(cose.coordinateX)
    const dispatch = useDispatch();
    return (
        <StContainer key={`cose-${cose.coordinateX},${cose.coordinateY}`}>
            <img src="" alt="" />
            <StCoseButton>
                <h2>코스1</h2>
                <div>
                    <button type='button'onClick={() => {
            dispatch(deleteCose(cose.coordinateX));
            // console.log(ment.id);
          }}>삭제</button>
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