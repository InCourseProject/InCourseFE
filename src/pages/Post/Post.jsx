import React from "react";
import styled from "@emotion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Map, MapMarker ,Polyline} from 'react-kakao-maps-sdk';
import PlusList from "../../asset/ModalPractice";
import PostCard from "./components/PostCard";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _getDetail } from "../../redux/modules/homeSilce";
import HomeCard from "../Home/components/HomeCard";
import { colors } from "../../lib/constants/GlobalStyle";
const Post = () => {
  const init = 
    {
      place:[{
        coordinateX:"",
        coordinateY:"",
    }]
  }
  
  const { kakao } = window;
  const mapRef = useRef()
  const dispatch = useDispatch();
  const [info, setInfo] = useState();
  const { id } = useParams();
  const [post, setPost] = useState(init);



  const fetchPost = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/${id}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        RefreshToken: localStorage.getItem("RefreshToken")
      }
    });
    console.log(response.data)
    // console.log(response.data.data)
    setPost(response.data); //for realserver
    // setPost( response.data ); //for realserver
  }
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    post?.place?.forEach(point => {
      bounds.extend(new kakao.maps.LatLng(point.coordinateX, point.coordinateY))
    });
    return bounds;
  }, [post.place])

  const refresh = () => {
    const map = mapRef.current
    if (map) map.setBounds(bounds)
  }

  useEffect(() => {
    fetchPost();
  }, []);
  useEffect(() => {
    refresh()
  }, [post]);
  return (
    <div>
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
        ref={mapRef}

      >
        {post.place.map(point => <MapMarker key={`${point.coordinateX}-${point.coordinateY}`} position={{ lat: point.coordinateX, lng: point.coordinateY }} />)}
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
      <HomeCard key={post.id} post={post} />
      {post.place.map((card) =>
        <PostCard key={card.id} card={card} />
      )}

    </div>
  );
};

export default Post;