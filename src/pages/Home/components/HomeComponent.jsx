import React from 'react'
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import HomeCard from './HomeCard'
import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from 'react'
import { colors, fonts, fontWeight } from '../../../lib/constants/GlobalStyle'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hook/useFetch'
import Btn from '../../../components/Button'
import Loading from '../../Loading/Loading'
import Sunny from '../../../lib/constants/img/sunny.gif'
const HomeComponent = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [notlog, setNotLog] = useState([]);
    const [weather, setWeather] = useState();
    const [page, setPage] = useState(1);
    const row = useRef(null);
    const { loading, error, formattedList = [] } = useFetch(page, `${process.env.REACT_APP_SERVER_API}/api/course`);
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
        console.log('notLogin:',response.data)
        setPost(response.data);
    }

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);
    const common = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/member/recommended`,{
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }
        });
        console.log(response)
        // console.log(response.data.data)
        setPost([...response.data.content]); //for realserver
        // setPost( response.data ); //for realserver
    }
    const Weather = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/weather/open`, weather, {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }
        });
        console.log('Login:', response.data)
        setPost(response.data); //for realserver
    }

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (row.current) observer.observe(row.current);
    }, [handleObserver]);

    useEffect(() => {
        if (localStorage.getItem("Authorization") === null) {
            notLogin();
        } else {
            common();
        }
    }, []);
    // if (loading) {
    //     return <div>로딩</div>;
    //   }

    //   if(error) {
    //     return <div>{error.message}</div>;
    //   }
    return (
        <StContainer>
            <StWeatherContainer>

                <StWeatherWrap>
                    <StWetherImg>
                    <img src={Sunny} alt="" />

                    <TitH1 >오늘의 <span>춘천</span> 날씨는 <br/> <span>매우 맑음</span>  입니다.</TitH1>
                    </StWetherImg>

                    <StWeatherBox>
                        <StDetailBox >
                            <p>Temp</p>
                            <StWetherTemp>
                                <p>-7℃</p>
                            </StWetherTemp>
                        </StDetailBox>
                        <StDetailBox >
                            <p>Detail</p>
                            <StWetherDetail>
                                <div>
                                    <p>계절<span>가을</span> </p>
                                    <p>습도<span>가을</span></p>
                                    <p>풍속<span>가을</span></p>
                                </div>
                                <div>
                                    <p>구름양<span>52%</span></p>
                                    <p>강수량/1h<span>0</span></p>
                                    <p>강우량/1h<span>0</span></p>
                                </div>
                            </StWetherDetail>
                        </StDetailBox>
                    </StWeatherBox>
                </StWeatherWrap>
            </StWeatherContainer>
            <div>

            </div>
            <StDivWrap>
                <ul>
                    <li>오늘은 긴팔 티, 면 바지  어때요?</li>
                    <li>시원한 생수 챙겨가시면 좋아요!</li>
                </ul>
                <div><Btn size='default' variant='main' onClick={()=>{navigate('/category')}}> 하루의 코스 만들러 가기 </Btn></div>
            </StDivWrap>
            <StHomeCardWrap >
                <h1>추천코스</h1>
                <HomeCard key={post.id} post={post} />
                <h1>전체코스</h1>
                {formattedList.map((post) =>
                    <HomeCard key={post.id} post={post} />
                )}
                <div ref={row}></div>
            </StHomeCardWrap >
        </StContainer>
    )
}

export default HomeComponent

const StWeatherContainer = styled.div`
    position: relative;
    text-align: center;
    
    
`
const StWeatherWrap = styled.div`
    font-size: ${fonts.subTitle};
    object-fit:cover;
    img{
        width: 200px;
        height: 200px;
    }
    p{
        font-size: ${fonts.headLine};
        color: ${colors.deepGray};
    }
`
const StWeatherBox = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-around;
   text-align: left;
   padding: 10px;
   gap: 10px;
   
   div{font-size:${fonts.body}}
   p{font-size: ${fonts.body};}
`
const StWetherTemp = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid ${colors.lightGray};
    border-radius: 10px;
    text-align: center;
    padding: 20px 10px;
    p{font-size: 3em;}
    
`
const StWetherImg = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px;
    margin-top: 100px;
`
const StWetherDetail = styled.div`
    width: 100%;
    border: 1px solid ${colors.lightGray};
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 10px;
    p{
        font-size: ${fonts.body};
    }
    span{
        font-size: ${fonts.body};
    }
    
`
const StDetailBox = styled.div`
    width: 100%;
`
const StContainer = styled.div`
    width: 100%;
    /* display: flex;
    justify-content: center;
    flex-direction: column; */
`

const TitH1 = styled.h1`
    width: 100%;
    text-align: center;
    font-size: ${fonts.subTitle};
    color: ${colors.primary};
    padding: 15px;
    span{
        font-size: ${fonts.subTitle};
        color: ${colors.secondary};
    }
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