import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from '@emotion/styled'

const HomeCard = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    const back = {
        img:"https://i0.wp.com/uxcrush.com/wp-content/uploads/2022/09/traffic-analytics-figma-dashboard-template-1014x487.jpg" 
    }
    return (
        <StContainer >

            <div>
                <StSlideBox style={{backgroundImage:`url(${back.img})`}}>
                    <h2>제목</h2>
                    <p>내용</p>
                    <Slider {...settings}>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                        <div>
                            <h3>5</h3>
                        </div>
                        <div>
                            <h3>6</h3>
                        </div>
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
    )
}

export default HomeCard
const StContainer = styled.div`
     max-width: 600px;
    border: 1px solid #000;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    
`
const StSlideBox = styled.div`
    left: 20px;
    top: 40px;
    z-index: 10;
    background-size: cover;
`
const StImg = styled.img`
    width: 100%;
    height: 100%;
    z-index: -1;
    left: 0;
    top: 0;
    object-fit: cover;
`
