import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts, fontWeight } from '../../../lib/constants/GlobalStyle';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { createMarker } from '../../../redux/modules/formSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const UpDateCose = ({ modal, setModal, post }) => {
    const { kakao } = window;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [info, setInfo] = useState();
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState();
    const [search, setSearch] = useState();
    const [keyword, setKeyword] = useState();
    const [keywordId, setKeywordId] = useState({
        placeName: "초기값",
        address: "주소",
    });
    const [cose, setCose] = useState();
    // console.log(cose)
    console.log(modal)
    const onChangeHandler = (e) => {
        const word = e.target.value;
        setKeyword(word)
    };

    const onChangeContentHandler = (e) => {
        const con = e.target.value;
        setCose({ ...cose, ...keywordId, content: con });
    };
    const enterKey = (e) => {
        if (e.nativeEvent.key === 'Enter'){
          if(e.nativeEvent.isComposing === false) {
            e.preventDefault();
            setSearch(keyword)
          };
        };
        return;
      };

    const geoLocactionButton = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
                displayMarker(locPosition, message);
            });
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = 'geolocation을 사용할수 없어요..'
            displayMarker(locPosition, message);
        }
        function displayMarker(locPosition, message) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition
            });
            // 인포윈도우에 표시할 내용
            var iwContent = message,
                iwRemoveable = true;
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable
            });
            // 인포윈도우를 마커위에 표시합니다 
            infowindow.open(map, marker);
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);
        }
    }
    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(keyword, (data, status, _pagination) => {
            console.log(data)
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds();
                console.log(bounds)
                let markers = []
                // console.log(data)
                data.map((mark) => {
                    // @ts-ignore
                    markers.push({
                        position: {
                            lat: mark.y,
                            lng: mark.x,
                        },
                        placeName: mark.place_name,
                        id: mark.id,
                        address: mark.address_name
                    })
                    // @ts-ignore
                    bounds.extend(new kakao.maps.LatLng(mark.y, mark.x))
                })
                setMarkers(markers)
                // console.log(markers)
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds)
            }
        })
    }, [search])

    return (
        <StContainer >
            <StWrap>
                <Map // 로드뷰를 표시할 Container
                    center={{
                        lat: 37.566826,
                        lng: 126.9786567,
                    }}
                    style={{
                        width: "100%",
                        height: "300px",
                    }}
                    level={3}
                    onCreate={setMap}
                >
                    {markers.map((marker) => (
                        <MapMarker
                            key={`marker-${marker.placeName}-${marker.position.lat},${marker.position.lng}`}
                            position={marker.position}
                            onClick={() => {
                                setInfo(marker);
                                setKeywordId
                                    ({
                                        address: marker.address,
                                        placeName: marker.placeName,
                                        coordinateX: marker.position.lat,
                                        coordinateY: marker.position.lng,
                                    })
                            }}
                        >
                            {info && info.placeName === marker.placeName && (
                                <div style={{ color: "#000" }}>{marker.placeName}</div>
                            )}
                        </MapMarker>
                    ))}
                </Map>
                <StSearcBox>
                    <StInput className='findAddress' type="search" onKeyDown={enterKey}
                        onChange={onChangeHandler}
                    ></StInput>
                    <StButtonBox>

                        <button
                            type='button'
                            onClick={geoLocactionButton}
                        >
                            내 위치
                        </button>
                    </StButtonBox>
                </StSearcBox>
                <StAddress>{keywordId.address}</StAddress>
                <StTit>
                    <h1>{keywordId.placeName}</h1>
                </StTit>
                <StForm>
                    <StFormInput
                        type="text"
                        onChange={onChangeContentHandler}
                    />
                </StForm>
                <StSubmitBox>
                    <StSubmitButton
                        type='button'
                        onClick={() => (dispatch(createMarker(cose)), setModal(false))}
                    >코스등록</StSubmitButton>
                    <StSubmitButton
                        type='button'
                        onClick={() => (setModal(false)
                        )}>닫기</StSubmitButton>
                </StSubmitBox>
            </StWrap>
        </StContainer>
    )
}

export default UpDateCose
const StContainer = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: fixed;
    left: 0 ;
    top: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
`
const StWrap = styled.div`
    position: relative;
    min-width: 280px;
    margin-top: 100px;
    background-color: ${colors.white};

`
const StSearcBox = styled.form`
    width: 100%;
    position: absolute;
    left: 0;
    top: 20px;
    z-index: 100;
`
const StAddress = styled.p`
    width: 100%;
    padding:5px ;
    margin-bottom: 15px;
    line-height: 24px;
    color: ${colors.white};
    background-color: ${colors.secondary};
`
const StForm = styled.div`
    width: 100%;
    border: 1px solid #eee;
    
`
const StInput = styled.input`
    width: 100%;
    padding: 10px 10px;
    font-size: 16px;
    border-radius: 30px;
    border: 1px solid #eee;
`
const StButtonBox = styled.div`
    position: absolute;
    right: 15px;
    top: 10px;
`
const StTit = styled.ul`
    border: 1px solid ${colors.lightGray};
    padding: 20px 0px;
    margin: 0;
    
    font-size: ${fonts.headLine};
    font-weight: ${fontWeight.exrtaBold};
   
`
const StFormInput = styled.textarea`
    width: 100%;
    border: 1px solid #bbb;
    min-height: 150px;
    font-size: ${fonts.body};
    letter-spacing: normal;
    resize: none;
`
const StSubmitBox = styled.div`
    width: 100%;
    display: flex;
   
    
`
const StSubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: ${colors.primary};
    border: none;
    font-size:${fonts.body};
    border-radius: 15px;
`
