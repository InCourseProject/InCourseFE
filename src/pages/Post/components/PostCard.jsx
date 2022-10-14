import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../lib/constants/GlobalStyle'
import { useDispatch } from 'react-redux'
import { _deleteCose } from '../../../redux/modules/formSlice'
const PostCard = ({card}) => {
  const dispatch = useDispatch();

  return (
    <StContainer key={card.id}>
      <div>
        <p>코스</p>
        <div>
          <div>
          <p>{card.placeName}</p>
          <p>{card.content}</p>
          </div>
          <div>
            <button>수정</button>
            <button onClick={()=>{dispatch(_deleteCose(card.id))}}>삭제</button>
          </div>
          
        </div>
        <div><img src="" alt="" /></div>

      </div>
    </StContainer>
  )
}

export default PostCard

const StContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${colors.lightGray};
`