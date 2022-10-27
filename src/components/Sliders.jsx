import React from 'react'
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";


const Sliders = () => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        useTransform: true,
        slidesToScroll: 1,
        initialSlide: 1,
    };
  return (
    <Slider {...settings}  >

    </Slider>
  )
}

export default Sliders