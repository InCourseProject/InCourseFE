import React from 'react'
import styled from '@emotion/styled'
import Slider from "react-slick";
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import "slick-carousel/slick/slick.css";
import Cose from '../../Form/components/Cose';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import default_Img from '../../../lib/constants/img/difault_Img.png';
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { colors, fonts } from '../../../lib/constants/GlobalStyle';
import Btn from '../../../components/Button';
import UpDateCose from './UpdateCose';
import { categorySelect } from '../../../redux/modules/formSlice';
import BasicCheckbox from '../../Category/components/BasicCheckbox';
const UpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const cose = useSelector((state) => state.formSlice.form.placeRequestDtoList);
    const [imageUrl, setImageUrl] = useState("");
    const [fileImage, setFileImage] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [post, setPost] = useState({
        place: []
    });
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const [weather, setWeather] = useState();
    const [season, setSeason] = useState();
    const [region, setRegion] = useState();
    const [who, setWho] = useState();

    //날씨 카테고리 핸들러
    const handleSubmit = e => {
        e.preventDefault();
        const data = { weather, season, region, who, };
        dispatch(categorySelect(data))
        navigate("/form")
    };

    //디폴트 이미지 핸들러
    const handleImgError = (e) => {
        e.target.src = default_Img;
    }

    //이미지 변경 핸들러
    const onChangeImg = (e) => {
        setImageUrl(e.target.files[0]);
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    //수정 핸들러
    const fetchPost = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/${id}`, {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }
        });
        setPost(response.data); //for realserver
        setTitle(response.data.title)
        setContent(response.data.content)
        setFileImage(response.data.image)
    }

    //타이틀 핸들러
    const onChangeTitleHandler = (event) => {
        const tit = event.target.value;
        setTitle(tit);
    };

    //내용 핸들러
    const onChangeContentHandler = (event) => {
        const con = event.target.value;
        setContent(con);
    };

    //모달 함수
    const onSubmitHandler = () => {
        setModal(true)
    }

    useEffect(() => {
        fetchPost()
    }, [])
    useEffect(() => {
        if (post === undefined) {

        } else {
            setWeather(post.weather)
            setSeason(post.season)
            setRegion(post.region)
            setWho(post.who)
        }

    }, [post])

    //슬라이드 세팅
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

    //서버 보낼 데이터
    const data = {
        postRequestDto: {
            title: title,
            content: content,
            weather: weather,
            region: region,
            who: who,
            season: season,
        },
        placeRequestDtoList: cose
    };

    //수정 핸들러
    const onAddPosttButtonHandler = async () => {
        let json = JSON.stringify(data);
        const formData = new FormData();
        const titleblob = new Blob([json], { type: "application/json" });
        formData.append("data", titleblob);
        formData.append("image", imageUrl);
        const res = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/course/${post.id}`, formData, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }

        });

        return res.data,
            navigate("/")
    };
    return (
        <div>
            {modal ? <UpDateCose
                modal={modal}
                setModal={setModal}
                post={post}
            /> : null}
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
                            {post.place.map((mak) =>
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
                                path={[post.place.map((line) => (
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
                                {post.place.map((cose) => (
                                    <StCoseBox key={`name-${cose.coordinateX},${cose.coordinateY}`} >
                                        <h3>{cose.placeName}</h3>
                                    </StCoseBox>
                                ))}
                            </Slider>
                        </StSlideBox>

                    </StImgWrap>
                    <div   >
                        <div>

                            <form onSubmit={handleSubmit}>
                                <StForm>
                                    <h2>날씨를 선택 해주세요</h2>
                                    <StCartegoryWrap>
                                        <BasicCheckbox namr="cartegory" label="맑음" value="맑음" checked={weather} setter={setWeather} />
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
                            </form>
                        </div>
                    </div>
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
                                onChange={onChangeImg}
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
                            {post.place?.map((cose, i) =>
                                <Cose
                                    key={`cose-${cose.coordinateX},${cose.coordinateY}`}
                                    cose={cose}
                                    i={i + 1}
                                />
                            )}
                            {cose?.map((cose) =>
                                <Cose
                                    key={`cose-${cose.coordinateX},${cose.coordinateY}`}
                                    cose={cose}
                                />
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
                                onClick={onAddPosttButtonHandler}>게시물수정</Btn>
                        </StButtonBox>

                    </StFormBox>

                </Test2>
            </StContainer>

        </div>
    )
}

export default UpdateForm
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
    .open{
        display: block;
    }
    .close{
        display: none;
    }
`

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
    background-color: ${colors.white};
    h2{
        color: ${colors.deepGray};
        font-size: ${fonts.caption};
    }
`