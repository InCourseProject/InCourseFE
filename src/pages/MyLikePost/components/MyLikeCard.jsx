import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { _deletePost } from '../../../redux/modules/formSlice';
import { _getLikePost } from '../../../redux/modules/homeSilce';
import Loading from '../../Loading/Loading';
import HomeCard from '../../Home/components/HomeCard';
import styled from '@emotion/styled';
import { colors, fonts } from '../../../lib/constants/GlobalStyle';

const MyLikeCard = () => {
    const dispatch = useDispatch();
    const { detail, isLoding} = useSelector((state) => state.homeSlice)

    useEffect(() => {
        dispatch(_getLikePost())
    }, [])

    return (
        <div >
            {isLoding ? <Loading /> : null}
            <StLikePostContainer>
                <h1>내가 찜 한 게시물</h1>
            </StLikePostContainer>
            {detail?.map((post) =>

                <HomeCard
                    id={post.courseId}
                    post={post}
                />
            )}
        </div>
    )
}

export default MyLikeCard
const StLikePostContainer = styled.div`
margin-top: 50px;
padding: 30px;
  width: 100%;
  text-align: center;
  h1{
    font-size: ${fonts.subTitle};
    color: ${colors.deepGray};
  }
`