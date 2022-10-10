import React from 'react'
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import HomeCard from './HomeCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { colors, fonts, fontWeight } from '../../../lib/constants/GlobalStyle'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Btn from '../../../components/Button'
const HomeComponent = () => {
    const navigate = useNavigate()
    const [post, setPost] = useState([]);
    const [notlog, setNotLog] = useState([]);
    const [weather, setWeather] = useState();

    const geoLocactionButton = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                setWeather({ x: lon, y: lat })
            });
        }
    }
    const notLogin = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/common/recommended`);
        console.log(response.data)
        setPost(response.data); //for realserverr
    }

    const Weather = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/weather/open`, weather, {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }
        });
        console.log(response.data)
        // console.log(response.data.data)
        setPost(response.data); //for realserver
        // setPost( response.data ); //for realserver
    }

    const fetchPost = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course`, {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }
        });
        console.log(response.data)
        // console.log(response.data.data)
        setPost(response.data); //for realserver
        // setPost( response.data ); //for realserver
    }
    useEffect(() => {
        if (localStorage.getItem("Authorization") === null) {
            notLogin()
        } else {
            fetchPost();
        }
        geoLocactionButton();
        Weather();
    }, []);
    return (
        <StContainer>
            <div><TitH1 >오늘의 날씨는 <br /> 매우 맑음 <br />입니다.</TitH1></div>
            <StDivWrap>
                <ul>
                    <li>오늘은 긴팔 티, 면 바지  어때요?</li>
                    <li>시원한 생수 챙겨가시면 좋아요!</li>

                </ul>
                <div><Btn size='sm' onClick={()=>{navigate('/category')}} variant='main'> 하루의 코스 만들러 가기 </Btn></div>
            </StDivWrap>
            <StHomeCardWrap>
                <h1>추천코스</h1>
                {post?.map((post) =>
                    <HomeCard key={post.id} post={post} />
                )}

            </StHomeCardWrap>
        </StContainer>
    )
}

export default HomeComponent
const StContainer = styled.div`
    width: 100%;
    /* display: flex;
    justify-content: center;
    flex-direction: column; */
`

const TitH1 = styled.h1`
    width: 100%;
    text-align: center;
    font-size: ${fonts.headLine};
    color: ${colors.primary};
    padding: 15px;
`
const StDivWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    div{
        width: 100%;
        text-align: center;
    }
    ul{
 width: 100%;
    }
    li{
        width: 100%;
        padding: 15px 30px;
        border-radius: 15px;
        border: 1px solid ${colors.lightGray};
        font-size: ${fonts.subTitle};
        font-weight: ${fontWeight.normal};
        color: ${colors.deepGray};
        margin-bottom: 10px;
    }
`
const StHomeCardWrap = styled.div`
max-width:768px;
margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    h1{
        font-size:  ${fonts.headLine};
        color: ${colors.deepGray};
        margin-top: 40px;
       
    }
`