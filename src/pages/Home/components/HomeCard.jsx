/** @jsxImportSource @emotion/react */
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from '@emotion/styled'
import difault_Img from '../../../lib/constants/img/difault_Img.png'
import { colors, fonts, fontWeight, lineHeights } from '../../../lib/constants/GlobalStyle';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux';
import Badge from '../../../components/badge';
import { _deletePost } from '../../../redux/modules/formSlice';
const HomeCard = ({ post, find }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //슬라이드 설정 값
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        useTransform: true,
        slidesToScroll: 1,
        initialSlide: 1,
    };

    //디폴트 이미지 설정 함수
    const handleImgError = (e) => {
        e.target.src = difault_Img;
    }

    //삭제 핸들러
    const deleteHandler = async () => {
        const data = []
        for (let i = 0; i < post.place.length; i++) {
            data.push(post.place[i].id)

        }
        const payload = {
            coseId: {
                placeId: data
            },
            id: post.id
        }
        dispatch(_deletePost(payload))
    }

    return (
        <StContainer key={post?.id}>
            {find?.id === post?.id ?
                <StFindPost>
                    <button
                        onClick={deleteHandler}
                    >
                        삭제
                    </button>
                    <button
                        onClick={() => { navigate(`post/update/${post.id}`) }}
                    >
                        수정
                    </button>
                </StFindPost> : null}
            <StImgWrap onClick={() => { navigate(`/post/${post.id}`) }}>
                <StImgBox>
                    <div>
                        <h1>{post?.title}</h1>
                        <p>{post?.content}</p>
                    </div>
                    <StImg src={post?.image} onError={handleImgError} />
                </StImgBox>

                <StSlideBox >
                    <Slider {...settings}  >
                        {post?.place?.map((cose) => (
                            <StCoseBox
                                key={`name-${cose.coordinateX},${cose.coordinateY}`}
                            >
                                <h3>{cose?.placeName}</h3>
                            </StCoseBox>
                        ))}

                    </Slider>
                </StSlideBox>
            </StImgWrap>

            <StCategorys>
                <div><p>{post?.region}</p></div>
                <div><p>{post?.season}</p></div>
                <div><p>{post?.weather}</p></div>
                <div><p>{post?.who}</p></div>
            </StCategorys>
            <StProfile>
                <StProfileWrap>
                    <StProfileImg>
                        <div>
                            {post?.profileImage === null
                                ? <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="" />
                                : <img css={{ width: '5.6rem' }} src={post?.profileImage} alt="Profile Image" />
                            }
                        </div>
                    </StProfileImg>
                    <ProfileContents>

                        <p>{post?.nickname}</p>
                        <Badge title={post?.badge}>{post?.badge}</Badge>
                    </ProfileContents>
                </StProfileWrap>

                <HeartContainer>
                    <HeartIcon css={{ width: '1.6rem', marginRight: '0.2rem', color: `${colors.danger}` }} />
                    {post?.heartnum}
                </HeartContainer>
            </StProfile>
        </StContainer>
    )
}

export default HomeCard
const StFindPost = styled.div`
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    padding: 10px;
    text-align: end;
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
`
const StProfileWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    
`
const HeartContainer = styled.div`
    color: ${colors.black};
    font-size: ${fonts.caption};
    font-weight: ${fontWeight.normal};
    line-height: ${lineHeights.caption};
    display: flex;
    align-items: center;
`

const StProfile = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1.6rem;
`
const StProfileImg = styled.div`
    min-width: 80px;
    height: 80px;
    border-radius: 100%;
    overflow: hidden;
    border: 1px solid ${colors.lightGray};
    img{
        object-fit: cover;
    }
`
const ProfileContents = styled.div`
    p{  
        overflow: hidden;
        width: 15rem;
        text-overflow: ellipsis;
        white-space: nowrap;

        margin-left: 0.5rem;
        margin-bottom: 0.2rem;
        color: ${colors.black};
        font-size: ${fonts.caption};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeights.caption};
    }
`

const StContainer = styled.div`
    width: 100%;
    border-radius: 20px;
    border: 1px solid ${colors.lightGray};
    position: relative;
    
    overflow: hidden;
    .line{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        z-index: -1;
        span{
        width: 2px;
        height: 100%;
        background-color: ${colors.primary};
        display: inline-block;
    }
    }
   

`
const StCategorys = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid ${colors.lightGray};
    div{
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        color:${colors.white};
        p{
            max-width: 150px;
            border-radius: 20px;
            padding: 5px;
            text-align: center;
            font-size: ${fonts.caption};
            background-color: ${colors.secondary};
        }
    }
`

const StImg = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const StImgWrap = styled.div`
    position: relative;
    top: 0;
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    overflow: hidden;
    
    
`
const StImgBox = styled.div`
width: 100%;
height: 320px;
text-align: center;
background-color: ${colors.primary};
background: linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.5) 100%);
display: table;

span{
    display: table-cell;
    height: 100%;
    color: ${colors.deepGray};
    font-size: ${fonts.body};
    vertical-align: middle;
}
div{
    position: absolute;
    left: 20px;
    bottom: 130px;
    z-index: 100;
    color: ${colors.white};
    font-weight: ${fontWeight};
    text-align: left;
    color: ${colors.white};

    

    h1{
        color: ${colors.white};
        font-size: ${fonts.headLine};
        margin-bottom: 10px;
        color: ${colors.white};
        

        overflow: hidden;
        width: 35rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    p{
        overflow: hidden;
        width: 30rem;
        text-overflow: ellipsis;
        white-space: nowrap;

        color: ${colors.white};
        font-size: ${fonts.subTitle};
    }
}
`
const StCoseBox = styled.div`
    max-width: 80%;
    border-radius:30px;
    background-color: ${colors.secondary};
    text-align: center;
    color: ${colors.white};
    padding: 15px 0px;
    box-sizing: border-box;
    border: 3px solid ${colors.primary};
    h1{
        font-size: ${fonts.caption};
    }
    
`
const StSlideBox = styled.div`
    width: 100%;
    position: absolute;
    left: 15px;
    bottom: 40px;
    z-index: 10;
    overflow: hidden;
    background-size: cover;
    ::after{
        content: "";
        display: block;
        width: 100%;
        height: 3px;
        position: absolute;
        background-color: ${colors.primary};
        right: 0;
        top: 25px;
        z-index: -1;
    }
`