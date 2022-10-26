import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { _deletePost } from '../../../redux/modules/formSlice';
import Loading from '../../Loading/Loading';
import { useEffect } from 'react';
const MyPostCard = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loding,setLoding] = useState(false);
    console.log(post.place)
    const deleteHandler = async () =>{
        setLoding(true)
        const data = []
        for(let i =0; i<post.place.length; i++){
           data.push(post.place[i].id)
           
        }
        const payload = {
            coseId:{
                placeId:data
            },
            id:post.id
        }
        const res = await axios.delete(`${process.env.REACT_APP_SERVER_API}/api/course/${payload.id}`,  {
            headers: {
                // "content-type": "multipart/form-data",
                Authorization: localStorage.getItem("Authorization"),
                RefreshToken: localStorage.getItem("RefreshToken")
            },
            data:payload.coseId
            
        });
        setLoding(false)
        window.location.href()
        return res.data;
    }
    useEffect(()=>{

    },[loding])
    return (
        <div >
            {loding ? <Loading/> : null}
            <div>
                <div onClick={()=>{navigate(`/post/${post.id}`)}}>{post.title}</div>
                <div>{post.content}</div>
            </div>
            <div>
                <span>좋아요</span>
                {post.score}
                <div>
                    <button onClick={()=>{navigate(`post/update/${post.id}`)}}>수정</button>
                    <button onClick={deleteHandler} >삭제</button>
                </div>
            </div>
        </div>
    )
}

export default MyPostCard