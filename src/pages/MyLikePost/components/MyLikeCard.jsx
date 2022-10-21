import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { _deletePost } from '../../../redux/modules/formSlice';
import { _getLikePost } from '../../../redux/modules/homeSilce';
const MyLikeCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [coseId,setCoseId] = useState();
    const {detail,isLoding,error} = useSelector((state)=>state.homeSlice.detail)
    // console.log(post)
if(isLoding){
    <div>로딩중...</div>
}
useEffect(()=>{
    dispatch(_getLikePost())
},[])

    return (
        <div >
            <h1>내가 작성한 게시물</h1>
            {/* {detail.map((post)=>)} */}
        </div>
    )
}

export default MyLikeCard