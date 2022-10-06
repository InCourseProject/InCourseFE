import React from 'react'
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import HomeCard from './HomeCard'
import axios from 'axios'
import { useEffect ,useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'
const HomeComponent = () => {
    const [post, setPost] = useState([]);
    const fetchPost = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course`,{
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
        fetchPost();
    }, []);
    return (
        <StContainer>
            <div><TitH1 >오늘의 날씨는 <br />날씨 데이터 <br />입니다.</TitH1></div>
            <StDivWrap>
                <ul>
                    <li>옷이 잘 머울리실거에요.</li>
                    <li>챙길것을 챙기시는 건 어떠세요?</li>

                </ul>
                <div><button> 하루의 코스 만들러 가기 </button></div>
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
`
const StDivWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StHomeCardWrap = styled.div`
max-width:768px;
margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`