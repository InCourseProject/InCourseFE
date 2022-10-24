import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { _deletePost } from '../../../redux/modules/formSlice';
import { _getLikePost } from '../../../redux/modules/homeSilce';
import Loading from '../../Loading/Loading';
import HomeCard from '../../Home/components/HomeCard';
const MyLikeCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [coseId,setCoseId] = useState();
    const {detail,isLoding,error} = useSelector((state)=>state.homeSlice)
    console.log(detail)

useEffect(()=>{
    dispatch(_getLikePost())
},[])

    return (
        <div >
            {isLoding ?<Loading/> : null}
            <h1>내가 작성한 게시물</h1>
            {detail.map((post)=>
            <HomeCard id ={post.courseId} post= {post} />
            )}
        </div>
    )
}

export default MyLikeCard