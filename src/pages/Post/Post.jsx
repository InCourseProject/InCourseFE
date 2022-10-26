import React, { useEffect, useState, useRef, useMemo } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Map, MapMarker ,Polyline} from 'react-kakao-maps-sdk';
import PlusList from "../../asset/ModalPractice";
import PostCard from "./components/PostCard";
import { _getDetail } from "../../redux/modules/homeSilce";
import HomeCard from "../Home/components/HomeCard";
import { colors, fonts, fontWeight, lineHeights } from "../../lib/constants/GlobalStyle";
import PostHeart from "./components/PostHeart";
import HeaderBar from "../../components/layout/HeaderBar";
import NaviBar from "../../components/layout/NaviBar";
import Score from "./components/Score";
const Post = () => {
  const accessToken = localStorage.getItem('Authorization'); //accessToken
  const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken

  const init = 
    {
      place:[{
        coordinateX:"",
        coordinateY:"",
    }]
  };
  
  const { kakao } = window;
  const mapRef = useRef()
  const dispatch = useDispatch();
  const [info, setInfo] = useState();
  const { id } = useParams();
  const [post, setPost] = useState(init);

  const fetchPost = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/course/${id}`, {
      headers: {
        Authorization: accessToken,
        RefreshToken: refreshToken
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
      <HeaderBar/>
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
      <PostDesc>{post.content}</PostDesc>
      {post.place.map((card, i) =>
        <PostCard i={i} key={card.id} card={card} />
      )}

      {
      accessToken === null
        ? <div style={{marginBottom: '20rem'}}></div>
        : <PostBottom>
          <Score
            id={post.id}
          // score={post.avgScore}
          />
          <PostHeart
            size='default'
            variant='line'
            id={post.id}
          // heartnum={post.heartnum}
          />
        </PostBottom>
      }
      <NaviBar/>
    </div>
  );
};

export default Post;

const PostBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const PostDesc = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 1.1rem auto 2.5rem auto;
  padding: 2rem 2.35rem 6rem 2.35rem;
  color: ${colors.deepGray};
  font-size: ${fonts.body};
  font-weight: ${fontWeight.normal};
  line-height: ${lineHeights.body};

  background-color: ${colors.tone};
  border: 1px solid ${colors.lightGray};
  border-radius: 1.5rem;
  
`