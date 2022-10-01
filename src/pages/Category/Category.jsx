import React from 'react'
import BasicCheckbox from './components/BasicCheckbox';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { categorySelect } from '../../redux/modules/formSlice';
import { colors } from '../../lib/constants/GlobalStyle';
import styled from '@emotion/styled';
const Category = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [weather, setWeather] = useState();
    const [season, setSeason] = useState();
    const [region, setRegion] = useState();
    const [who, setWho] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        const data = { weather, season, region, who, };
        dispatch(categorySelect(data))
        navigate("/form")
        // localStorage.setItem("requst")
        // console.log(json);
    };
  return (
    <form onSubmit={handleSubmit}>
                        <StCartegoryWrap>
                            <BasicCheckbox namr="cartegory" label="맑음" value="SUNNY" checked={weather} setter={setWeather} />
                            <BasicCheckbox namr="cartegory" label="흐림" value="CLOUDY" checked={weather} setter={setWeather} />
                            <BasicCheckbox namr="cartegory" label="눈" value="SNOW" checked={weather} setter={setWeather} />
                            <BasicCheckbox namr="cartegory" label="비" value="RAINY" checked={weather} setter={setWeather} />
                        </StCartegoryWrap>
                        <StCartegoryWrap>
                            <BasicCheckbox namr="cartegory" label="봄" value="SPRING" checked={season} setter={setSeason} />
                            <BasicCheckbox namr="cartegory" label="여름" value="SUMMER" checked={season} setter={setSeason} />
                            <BasicCheckbox namr="cartegory" label="가을" value="AUTUMN" checked={season} setter={setSeason} />
                            <BasicCheckbox namr="cartegory" label="겨울" value="WINTER" checked={season} setter={setSeason} />
                        </StCartegoryWrap>

                        <div>
                            <h2>모임 목적을 선택 해주세요.</h2>
                            <StCartegoryWrap>
                                <BasicCheckbox namr="cartegory" label="수도권" value="CAPITAL" checked={region} setter={setRegion} />
                                <BasicCheckbox namr="cartegory" label="강원" value="GANGWON" checked={region} setter={setRegion} />
                                <BasicCheckbox namr="cartegory" label="충북" value="CHUNGBUK" checked={region} setter={setRegion} />
                                <BasicCheckbox namr="cartegory" label="충남" value="CHUNGNAM" checked={region} setter={setRegion} />
                                <BasicCheckbox namr="cartegory" label="전북" value="JEONBUK" checked={region} setter={setRegion} />
                                <BasicCheckbox namr="cartegory" label="전남" value="JEONNAM" checked={region} setter={setRegion} />
                                <BasicCheckbox namr="cartegory" label="경북" value="GYEONGBUK" checked={region} setter={setRegion} />
                                <BasicCheckbox namr="cartegory" label="경남" value="GYEONGNAM" checked={region} setter={setRegion} />
                                <BasicCheckbox namr="cartegory" label="제주" value="JEJU" checked={region} setter={setRegion} />
                            </StCartegoryWrap>
                        </div>
                        <div>
                            <h2>계절을 선택 해주세요.</h2>
                            <StCartegoryWrap>
                                <BasicCheckbox label="혼자" value="SOLO" checked={who} setter={setWho} />
                                <BasicCheckbox label="가족" value="FAMILY" checked={who} setter={setWho} />
                                <BasicCheckbox label="친구" value="FRIEND" checked={who} setter={setWho} />
                                <BasicCheckbox label="연인" value="COUPLE" checked={who} setter={setWho} />
                            </StCartegoryWrap>
                           
                        </div>
                        
                        <button type="submit" >Submit</button>
                    </form>
  )
}

export default Category

const StCartegoryWrap = styled.div`
    display: flex;
    justify-content: center;
`