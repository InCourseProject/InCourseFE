import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { _deletePost } from '../../../redux/modules/formSlice';
const MyPostCard = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [coseId,setCoseId] = useState();
    console.log(post.place)
    const deleteHandler = () =>{
        const data = []
        for(let i =0; i<post.place.length; i++){
           data.push(post.place[i].id)
           
        }
        const payload = {
            coseId:{
                placeId:{...data}
            },
            id:post.id
        }
        console.log(post.id,payload)
        dispatch(_deletePost(payload))
    }
    return (
        <div >
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