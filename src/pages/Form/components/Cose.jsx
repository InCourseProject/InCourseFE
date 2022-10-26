import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from '../../../lib/constants/GlobalStyle'
import { useDispatch,useSelector } from 'react-redux'
import { deleteCose, _deleteCose } from '../../../redux/modules/formSlice'
const Cose = ({cose,i}) => {
    const co = useSelector((state)=> state.formSlice.form.placeRequestDtoList
    )
    console.log(cose.id)
    const dispatch = useDispatch();
    return (
        <StContainer key={`cose-${cose.coordinateX},${cose.coordinateY}`}>
            <img src="" alt="" />
            <StCoseButton>
                <h2>코스{i}</h2>
                <div>
                    <button type='button' onClick={() => {cose.id === undefined ? dispatch(deleteCose(cose.coordinateX)): dispatch(_deleteCose(cose.id))
            ;
            // console.log(ment.id);
          }}>삭제</button>
                </div>
            </StCoseButton>
            <StTitBox>
                <h1>{cose.placeName}</h1>
                <p>{cose.content}</p>
            </StTitBox>
        </StContainer>
    )
}

export default Cose

const StContainer = styled.div`
    width: 100%;
    background-color: ${colors.lightGray};
    border-radius: 20px;
    padding: 20px;
    margin-top: 10px;
    position: relative;
`
const StCoseButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    button{
        font-size: ${fonts.caption};
        cursor: pointer;
        width: 50px;
        height: 20px;
        border: 1px solid ${colors.danger};
        color: ${colors.danger};
        border-radius: 10px;
        background-color: transparent;
    }
    h2{
        font-size: ${fonts.caption};
    }
`
const StTitBox = styled.div`
    margin-top: 8rem;
    width: 100%;
    h1{
        font-size: ${fonts.subTitle};
        margin-bottom: 10px;
    }
    p{
        font-size: ${fonts.body};
        margin-bottom: 10px;
    }
`