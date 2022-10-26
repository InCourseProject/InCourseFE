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
import Input from '../../../components/Input';
import { useSelector, useDispatch } from "react-redux";
import { colors, fonts } from '../../../lib/constants/GlobalStyle';
import Btn from '../../../components/Button';

const FormComponent = () => {
    const { kakao } = window;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.formSlice.form.postRequestDto)
    const position = useSelector((state) => state.formSlice.form.placeRequestDtoList);
    // console.log(position)
    const [imageUrl, setImageUrl] = useState("");
    const [fileImage, setFileImage] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleImgError = (e) => {
        e.target.src = default_Img;
    }
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
    const imageUpload = (e) => {
        const file = e.target.files[0];
        setFileImage(URL.createObjectURL(e.target.files[0]));
        getBase64(file).then(base64 => {
            localStorage["fileBase64"] = base64;
            console.debug("file stored", base64);
        });
    };

    // console.log(imageUrl);
    const onChangeTitleHandler = (event) => {
        const tit = event.target.value;
        setTitle(tit);
    };
    const onChangeContentHandler = (event) => {
        const con = event.target.value;
        setContent(con);
    };

    console.log(imageUrl)
    const onSubmitHandler = () => {
        localStorage.setItem("img", fileImage);
        localStorage.setItem("title", title);
        localStorage.setItem("content", content);
        navigate("/card")
    }
    // console.log(JSON.stringify(imageUrl))

    useEffect(() => {
        setTitle(localStorage.getItem("title"))
        setContent(localStorage.getItem("content"))
        setFileImage(localStorage.getItem("img"))
        setImageUrl(localStorage.getItem("fileBase64"))
    }, [])
    // console.log('image:',JSON.parse(imageUrl) )
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
    const data = {
        postRequestDto: {
            title: title,
            content: content,
            weather: category.weather,
            region: category.region,
            who: category.who,
            season: category.season,
        },
        placeRequestDtoList: position
    };
    console.log(data)
    const onAddPosttButtonHandler = async () => {
        const byteString = atob(imageUrl.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], {
            type: "image/jpeg"
        });
        const file = new File([blob], "image.jpg");
        let json = JSON.stringify(data);
        const formData = new FormData();
        //콘솔 추가
        const titleblob = new Blob([json], { type: "application/json" });
        formData.append("data", titleblob);
        console.log(imageUrl);
        formData.append("image", file);
        // console.log(file)
        const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/course`, formData, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }
            
        });
       
        return res.data,
        localStorage.removeItem("title"),
        localStorage.removeItem("content"),
        localStorage.removeItem("img"),
        localStorage.removeItem["fileBase64"],
        navigate("/")
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
                            style={{
                                width: "100%",
                                height: "360px",
                                objectFit: "cover"
                            }}
                            level={11}
                        >
                            {position.map((mak) =>
                            (<MapMarker
                                key={`markers-${mak.coordinateX},${mak.coordinateY}`}
                                position={{
                                    lat: mak.coordinateX,
                                    lng: mak.coordinateY
                                }}>
                                <div style={{
                                    color: "#000"
                                }}
                                >{mak.placeName}</div>
                            </MapMarker>)
                            )}
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
                            <StImg src={fileImage == null ? default_Img : fileImage}
                                onError={handleImgError} />
                        </StImgBox>
                        <StSlideBox >
                            <Slider {...settings}  >
                                {position.map((cose) => (
                                    <StCoseBox key={`name-${cose.coordinateX},${cose.coordinateY}`}>
                                        <h3>{cose.placeName}</h3>
                                    </StCoseBox>
                                ))}
                            </Slider>
                        </StSlideBox>

                    </StImgWrap>
                    <StFormBox >
                        <div><label
                            className='upload'
                            htmlFor="file">이미지 업로드하기
                        </label>
                            <input
                                type="file"
                                name="imageUrl"
                                className="imginput"
                                id='file'
                                accept="image/*" // accept속성은 서버로 업로드할 수 있는 파일의 타입을 명시, input type="file" 에서만 사용가능
                                // onChange={showFileImage}
                                onChange={imageUpload}
                            />

                            <input
                                className='content'
                                placeholder='게시글 타이틀'
                                value={title || ""}
                                onChange={onChangeTitleHandler}
                                type="text"
                                variant='line'
                            />
                            <textarea
                                className='content desc'
                                placeholder='게시글 내용'
                                value={content || ""}
                                onChange={onChangeContentHandler}
                                type=""
                            />
                        </div>
                        <div>
                            {position.map((cose,i) =>
                                <Cose key={`cose-${cose.coordinateX},${cose.coordinateY}`} cose={cose} i ={i+1}/>
                            )}

                        </div>
                        <StButtonBox>
                            <Btn
                                type='button'
                                onClick={onSubmitHandler}
                                size='sm'
                            >
                                카드작성
                            </Btn>
                            <Btn
                            size='md'
                            type='button'
                            onClick={onAddPosttButtonHandler}>게시물작성</Btn>
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

const StMapWrap = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
`
const StFormBox = styled.div`
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

