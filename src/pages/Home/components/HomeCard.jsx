import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from '@emotion/styled'
import difault_Img from '../../../lib/constants/img/difault_Img.png'
import { colors, fonts } from '../../../lib/constants/GlobalStyle';
import { useNavigate } from 'react-router-dom';
const HomeCard = ({ post }) => {
    const navigate = useNavigate()
    const settings = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        // variableWidth: true,
        useTransform: true,
        slidesToScroll: 1,
        initialSlide: 1,
    };
    const handleImgError = (e) => {
        e.target.src = difault_Img;
    }
    return (
        <StContainer key={post.id}>

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
                            <StCoseBox key={`name-${cose.coordinateX},${cose.coordinateY}`}>
                                <h3>{cose?.placeName}</h3>
                            </StCoseBox>
                        ))}

                    </Slider>
                </StSlideBox>

            </StImgWrap>
            <StCategorys>
                <div><p>{post.region}</p></div>
                <div><p>{post.season}</p></div>
                <div><p>{post.weather}</p></div>
                <div><p>{post.who}</p></div>
            </StCategorys>
            <StProfile>
                <StProfileWrap>
                    <StProfileImg>
                        <div>
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="" />
                        </div>
                    </StProfileImg>
                    <p>{post.member?.nickname}</p>
                </StProfileWrap>
                <div>받은 좋아요 개수{post.heart}</div>
            </StProfile>
        </StContainer>
    )
}

export default HomeCard
const StProfileWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    
`
const StProfile = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
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
    padding: 10px;
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
            background-color: ${colors.secondary};
        }
    }
`

const StImg = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
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
display: table;
span{
    display: table-cell;
    height: 100%;
    color: ${colors.deepGray};
    font-size: ${fonts.body};
    vertical-align: middle;
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
    /* div{margin:0 5px} */
`