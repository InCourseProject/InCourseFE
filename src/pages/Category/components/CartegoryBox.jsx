import React from 'react'
import BasicCheckbox from './BasicCheckbox';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { categorySelect } from '../../../redux/modules/formSlice';
import { colors, fonts } from '../../../lib/constants/GlobalStyle';
import styled from '@emotion/styled';
import Btn from '../../../components/Button';
const Cartegory = ({post}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [weather, setWeather] = useState();
    const [season, setSeason] = useState();
    const [region, setRegion] = useState();
    const [who, setWho] = useState();
console.log(post)
    const handleSubmit = e => {
        e.preventDefault();
        const data = { weather, season, region, who, };
        dispatch(categorySelect(data))
        navigate("/form")
        // localStorage.setItem("requst")
        // console.log(json);
    };
    useEffect(()=>{
        if(post === undefined){

        }else{
        setWeather(post.weather)
        setSeason(post.season)
        setRegion(post.region)
        setWho(post.who)
    }
   
    },[post])
    return (
        <div>
           
            <form onSubmit={handleSubmit}>
                <StForm>
                    <h2>날씨를 선택 해주세요</h2>
                    <StCartegoryWrap>
                        <BasicCheckbox namr="cartegory" label="맑음" value="맑음"  checked={weather} setter={setWeather} />
                        <BasicCheckbox namr="cartegory" label="흐림" value="흐림" checked={weather} setter={setWeather} />
                        <BasicCheckbox namr="cartegory" label="눈" value="눈" checked={weather} setter={setWeather} />
                        <BasicCheckbox namr="cartegory" label="비" value="비" checked={weather} setter={setWeather} />
                    </StCartegoryWrap>
                </StForm>
                <StForm>
                    <h2>계절을 선택 해 주세요</h2>
                    <StCartegoryWrap>
                        <BasicCheckbox namr="cartegory" label="봄" value="봄" checked={season} setter={setSeason} />
                        <BasicCheckbox namr="cartegory" label="여름" value="여름" checked={season} setter={setSeason} />
                        <BasicCheckbox namr="cartegory" label="가을" value="가을" checked={season} setter={setSeason} />
                        <BasicCheckbox namr="cartegory" label="겨울" value="겨울" checked={season} setter={setSeason} />
                    </StCartegoryWrap>
                </StForm>
                <StForm>
                    <h2>코스의 지역을 선택 해주세요</h2>
                    <StCartegoryWrap>
                        <BasicCheckbox namr="cartegory" label="수도권" value="수도권" checked={region} setter={setRegion} />
                        <BasicCheckbox namr="cartegory" label="강원" value="강원" checked={region} setter={setRegion} />
                        <BasicCheckbox namr="cartegory" label="충북" value="충북" checked={region} setter={setRegion} />
                        <BasicCheckbox namr="cartegory" label="충남" value="충남" checked={region} setter={setRegion} />

                    </StCartegoryWrap>
                    <StCartegoryWrap>
                        <BasicCheckbox namr="cartegory" label="전북" value="전북" checked={region} setter={setRegion} />
                        <BasicCheckbox namr="cartegory" label="전남" value="전남" checked={region} setter={setRegion} />
                        <BasicCheckbox namr="cartegory" label="경북" value="경북" checked={region} setter={setRegion} />
                        <BasicCheckbox namr="cartegory" label="경남" value="경남" checked={region} setter={setRegion} />
                        <BasicCheckbox namr="cartegory" label="제주" value="제주" checked={region} setter={setRegion} />
                    </StCartegoryWrap>
                </StForm>
                <StForm>
                    <h2>데이트 코스의 상대를 정해주세요</h2>
                    <StCartegoryWrap>
                        <BasicCheckbox label="혼자" value="혼자" checked={who} setter={setWho} />
                        <BasicCheckbox label="가족" value="가족" checked={who} setter={setWho} />
                        <BasicCheckbox label="친구" value="친구" checked={who} setter={setWho} />
                        <BasicCheckbox label="연인" value="연인" checked={who} setter={setWho} />
                    </StCartegoryWrap>

                </StForm>
                <StBtnWrap>
                    <Btn type="submit" variants='sub' size='sm' >다음</Btn>
                </StBtnWrap>
            </form>
        </div>
    )
}

export default Cartegory

const StCartegoryWrap = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px 0px;
    
`
const StForm = styled.div`
    border: 1px solid ${colors.lightGray};
    margin-bottom: 10px;
    padding:10px 10px ;
    h2{
        color: ${colors.deepGray};
        font-size: ${fonts.caption};
    }
`

const StBtnWrap = styled.div`
    margin-bottom: 7.5rem;
    text-align: center;
    width: 100%;
`
