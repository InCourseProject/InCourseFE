import React from 'react'
import styled from '@emotion/styled'

const PostCard = ({card}) => {
  return (
    <StContainer key={card.id}>PostCard</StContainer>
  )
}

export default PostCard

const StContainer = styled.div`
  width: 100%;
`