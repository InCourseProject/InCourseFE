import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../lib/constants/colors';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
const CardCompnent = () => {
    const { kakao } = window;
    const [info, setInfo] = useState();
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState();
    const [search, setSearch] = useState();
    const [keyword, setKeyword] = useState();
    const [keywordId, setKeywordId] = useState({
        content: "초기값",
        address: "주소"
    })
    const onChangeHandler = (e) => {
        const word = e.target.value;
        setKeyword(word)
    }
    console.log(keywordId)
    const geoLocactionButton = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position)
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
                let markers = []
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    // @ts-ignore
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
                        id: data[i].id,
                        address: data[i].address_name
                    })
                    // @ts-ignore
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                setMarkers(markers)

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds)
            }
        })
    }, [search])

    return (
        <div> 
            <Map // 로드뷰를 표시할 Container
            center={{
                lat: 37.566826,
                lng: 126.9786567,
            }}
            style={{
                width: "100%",
                height: "350px",
            }}
            level={3}
            onCreate={setMap}
        >
            {markers.map((marker) => (
                <MapMarker
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    position={marker.position}
                    onClick={() => { setInfo(marker); setKeywordId({ id: marker.id, address:marker.address ,content:marker.content}) }}
                >
                    {info && info.content === marker.content && (
                        <div style={{ color: "#000" }}>{marker.content}</div>
                    )}
                </MapMarker>
            ))}
        </Map>
            <StSearcBox>
                <input className='findAddress'
                    onChange={onChangeHandler}
                />
                <button type='button' onClick={() => { setSearch(keyword) }}
                >검색</button>
                <button type='button' onClick={geoLocactionButton}>내 위치</button>
            </StSearcBox>
            <StAddress>{keywordId.address}</StAddress>
            <div>
                <h1>{keywordId.content}</h1>
                <input type="text" />
                <img src="http://place.map.kakao.com/25728027" alt="" />
            </div>
        </div>
    )
}

export default CardCompnent

const StSearcBox = styled.form`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
`
const StAddress = styled.p`
    width: 100%;
    padding-left:10px ;
    margin:  0;
    line-height: 24px;
    background-color: ${colors.incourse}
`