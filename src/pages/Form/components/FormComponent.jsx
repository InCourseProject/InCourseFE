import React from 'react'
import styled from '@emotion/styled'
import Slider from "react-slick";
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import "slick-carousel/slick/slick.css";
import Cose from './Cose';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import default_Img from '../../../lib/constants/img/difault_Img.png'
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { colors, fonts } from '../../../lib/constants/GlobalStyle';
const FormComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.formSlice.form.postRequestDto)
    const position = useSelector((state) => state.formSlice.form.placeRequestDtoList);
    console.log(position)
    const [imageUrl, setImageUrl] = useState();
    const [fileImage, setFileImage] = useState("");

    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const onChangeImg = (e) => {

        setImageUrl(e.target.files[0]);
        setFileImage(URL.createObjectURL(e.target.files[0]));

    };
    const handleImgError = (e) => {
        e.target.src = default_Img;
    }


    console.log(fileImage);
    const onChangeTitleHandler = (event) => {
        const tit = event.target.value;
        setTitle(tit);
    };
    const onChangeContentHandler = (event) => {
        const con = event.target.value;
        setContent(con);
    };

    const onSubmitHandler = () => {
        localStorage.setItem("img", fileImage);
        localStorage.setItem("title", title);
        localStorage.setItem("content", content);
        navigate('/card')
    }


    useEffect(() => {
        setTitle(localStorage.getItem("title"))
        setContent(localStorage.getItem("content"))
        setFileImage(localStorage.getItem("img"))
    }, [])

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
    const onAddPosttButtonHandler = async () => {
        let req = {
            data: {
                postRequestDto: {
                    title: title,
                    content: content,
                    weather: category.weather,
                    region: category.region,
                    who: category.who,
                    season: category.season,
                },
                placeRequestDtoList: position
            }
        };
        let json = JSON.stringify(req);
        const form = new FormData();
        //콘솔 추가
        const titleblob = new Blob([json], { type: "application/json" });
        form.append("title", titleblob);
        console.log(titleblob);
        form.append("image", imageUrl);
        const res = await axios.post('http://43.201.60.153/api/auth/post', form, {
            headers: {
                "Content-Type": "multipart/form",
                // Authorization: getCookie("ACESS_TOKEN"),
                // RefreshToken: getCookie("REFRESH_TOKEN")
            }
        });
        localStorage.clear()
        return res.data;
    };
    return (
        <div>

            <StContainer >
                <Test>
                    <StMapWrap>
                        <Map
                            center={{
                                lat: 37.566826,
                                lng: 126.9786567,
                            }}
                            style={{ width: "100%", height: "360px", objectFit: "cover" }}
                            level={11}
                        >
                            {position.map((mak) => (
                                <MapMarker
                                    key={`markers-${mak.coordinateX},${mak.coordinateY}`}
                                    position={{ lat: mak.coordinateX, lng: mak.coordinateY }}>
                                    <div style={{ color: "#000" }}>{mak.placeName}</div>
                                </MapMarker>
                            ))}
                            <Polyline
                                path={[position.map((line) => (
                                    { lat: line.coordinateX, lng: line.coordinateY }
                                )
                                )
                                ]}
                                strokeWeight={5} // 선의 두께 입니다
                                strokeColor={colors.secondary} // 선의 색깔입니다
                                strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                                strokeStyle={"solid"} // 선의 스타일입니다
                            />
                        </Map>
                    </StMapWrap>
                </Test>
                <Test2>
                    <div className='line'><span></span></div>
                    <StImgWrap>
                        <StImgBox>
                            <span>이미지를 추가 해 주세요.</span>
                            <StImg src={fileImage == null ? default_Img : fileImage} onError={handleImgError} />
                        </StImgBox>
                        <StSlideBox >
                            <Slider {...settings}  >
                                {position.map((cose) => (
                                    <StCoseBox key={`name-${cose.coordinateX},${cose.coordinateY}`}>
                                        <h3>{cose.placeName}</h3>
                                    </StCoseBox>
                                ))}
                                <StCoseBox >
                                    <h3>sdfdsf</h3>
                                </StCoseBox>
                                <StCoseBox >
                                    <h3>sdfdsf</h3>
                                </StCoseBox>
                                <StCoseBox >
                                    <h3>sdfdsf</h3>
                                </StCoseBox>
                            </Slider>
                        </StSlideBox>

                    </StImgWrap>
                    <StFormBox onSubmit={onSubmitHandler}>
                        <div><label className='upload' htmlFor="file">이미지 업로드하기</label><input
                            type="file"
                            name="imageUrl"
                            className="imginput"
                            id='file'
                            accept="image/*" // accept속성은 서버로 업로드할 수 있는 파일의 타입을 명시, input type="file" 에서만 사용가능
                            // onChange={showFileImage}
                            onChange={onChangeImg}
                        />

                            <input className='content' placeholder='게시글 타이틀' value={title} onChange={onChangeTitleHandler} type="text" />
                            <textarea className='content desc' placeholder='게시글 내용' value={content} onChange={onChangeContentHandler} type="" />
                        </div>
                        <div>
                            {position.map((cose) =>
                                <Cose key={`cose-${cose.coordinateX},${cose.coordinateY}`} cose={cose} />
                            )}

                        </div>
                        <StButtonBox>
                            <button type='submit'>카드작성</button>
                        </StButtonBox>

                    </StFormBox>

                </Test2>
            </StContainer>

        </div>
    )
}

export default FormComponent
const Test2 = styled.div`
    max-width: 768px;
    position: absolute;
    top:250px;
    z-index: 10;
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
const Test = styled.div`
    width: 100%;
    height: 450px;
`

const StContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 4000px;
    
`
const StSlideBox = styled.div`
    width: 100%;
    position: absolute;
    left: 15px;
    bottom: 20px;
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
const StImgWrap = styled.div`
    position: relative;
    top: 0;
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    overflow: hidden;
    
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
const StMapWrap = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
`
const StFormBox = styled.form`
    width: 100%;
    padding: 15px;
    textarea{
        width: 100%;
        height: 12rem;
        border: none;
        resize: none;
        
    }
    input{display:inline-block;
    width: 100%;
    margin: 10px 0;
    }
    .imginput{
        display: none;
    }
    .upload{
        display: inline-block;
        padding: 15px 0;
        width: 100%;
        border: 1px solid ${colors.lightGray};
        background-color: ${colors.white};
        color: ${colors.deepGray};
        font-size: ${fonts.caption};
        cursor: pointer;
        text-align: center;
        border-radius: 10px;
    }
    .content{
        border: 1px solid ${colors.lightGray};
        background-color: ${colors.tone};
        border-radius: 10px;
        padding: 20px;
    }
    .desc{
        width: 100%;
        
    }
`
const StButtonBox = styled.div`
    width: 100%;
    text-align: center;
    display: block;
`

