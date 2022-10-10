import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../lib/constants/GlobalStyle'
import PostHeart from './PostHeart'

const PostCard = ({card}) => {
  return (
    <StContainer key={card.id}>
      <div>
        <p>코스</p>
        <div>
          <p>{card.placeName}</p>
          <p>{card.content}</p>
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