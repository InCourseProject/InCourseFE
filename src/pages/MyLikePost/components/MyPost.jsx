import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import MyPostCard from './MyPostCard';
const MyPost = () => {
    const accessToken = localStorage.getItem('Authorization'); //accessToken
    const refreshToken = localStorage.getItem('RefreshToken'); //refreshToken
    const [ myPost, setMyPost ] = useState([]);
    const [coseId,setCoseId] = useState([])
    const getInfo = async () => {
        try{
          const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/mypage/post`, {
          headers:{
            Authorization: `${accessToken}`,
            RefreshToken: `${refreshToken}`,
          }
          });
          console.log(res.data)
          if (res.status = 200 || 201){
            setMyPost(res.data);  
      
          }
        }catch(err){
          console.error(err.response);
        }
    
        
      };
      console.log("work!",myPost);
    useEffect(()=>{
        getInfo()
    },[])
  return (
    <div>
        <h1>내가 작성한 게시물</h1>
        {myPost === undefined ? <div> 작성한 게시물이 없습니다. </div> : myPost.map((post)=>(
            <MyPostCard key={post.id} post={post}/>
        ))}
    </div>
  )
}

export default MyPost