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
    const post = useSelector((state)=>state.homeSlice)
    console.log(post)

useEffect(()=>{
    dispatch(_getLikePost())
},[])

    return (
        <div >
            dk
        </div>
    )
}

export default MyLikeCard