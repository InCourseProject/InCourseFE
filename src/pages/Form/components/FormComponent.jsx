import React from 'react'
import styled from '@emotion/styled'
import Slider from "react-slick";
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';

const FormComponent = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    const back = {
        img: "https://i0.wp.com/uxcrush.com/wp-content/uploads/2022/09/traffic-analytics-figma-dashboard-template-1014x487.jpg"
    }
    return (
        <div>
           
            <StContainer >

                <div>
                    <StSlideBox style={{ backgroundImage: `url(${back.img})` }}>
                        <h2>제목</h2>
                        <p>내용</p>
                        <Slider {...settings}>
                            <StCoseBox>
                                <h3>1</h3>
                            </StCoseBox>
                            <StCoseBox>
                                <h3>2</h3>
                            </StCoseBox>
                            <StCoseBox>
                                <h3>3</h3>
                            </StCoseBox>
                        </Slider>
                    </StSlideBox>
                </div>
                <div>
                    <div>
                        <ul>
                            <li>카테고리</li>
                            <li>카테고리</li>
                            <li>카테고리</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>#테그</li>
                            <li>#테그</li>
                            <li>#테그</li>
                        </ul>
                    </div>
                </div>
            </StContainer>

        </div>
    )
}

export default FormComponent

const StContainer = styled.div`
    border: 1px solid #000;
    position: relative;
    overflow: hidden;
    
`
const StSlideBox = styled.div`
height: 100%;
padding-top: 100px;
    left: 20px;
    top: 40px;
    z-index: 10;
    overflow: hidden;
    background-size: cover;
`
const StCoseBox = styled.div`
    width: 150px;
    border-radius:30px;
    background-color: #eee;
    margin-right: 20px;
`
