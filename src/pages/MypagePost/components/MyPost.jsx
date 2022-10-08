import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
const MyPost = () => {

    const MyPost = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/member/mypage/post`, {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }
        });
        console.log(response.data)
        // console.log(response.data.data)
        // setPost(response.data); //for realserver
        // // setPost( response.data ); //for realserver
    }
    useEffect(()=>{
        MyPost()
    },[])
  return (
    <div>MyPost</div>
  )
}

export default MyPost