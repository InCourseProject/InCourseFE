import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Post from "../pages/Post/Post";
import Form from "../pages/Form/Form";
import Card from "../pages/Card/Card";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Cartegory from "../pages/Category/Cartegory";
import LoginEmail from "../pages/Login/components/LoginEmail";
import MyPage from "../pages/MyPage/MyPage";
import MyPageEdit from "../pages/MyPageEdit/MyPageEdit";
import SignupEmail from "../pages/Signup/components/SignupEmail";
import SignupDetail from "../pages/SignupDetail/SignupDetail";
import KakaoLogin from "../pages/Login/components/KakaoLogin";
import Search from "../pages/Search/Search";
import EmailConfrim from "../pages/SignupDetail/components/EmailConfirm";
import Loading from "../pages/Loading/Loading";
import MyPagePost from "../pages/MypagePost/MyPagePost";
import PostUpDate from "../pages/PostUpdate/PostUpDate";
import SearchPost from "../pages/Search/components/SeachPost";

const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="post/:id" exact element={<Post />} />
        <Route path="mypostpage/post/update/:id" exact element={<PostUpDate />} />
        <Route path="form" exact element={<Form />} />
        <Route path="card" exact element={<Card />} />
        <Route path="/category" exact element={<Cartegory />} />
        <Route path="signup" exact element={<Signup />} />
        <Route path="signup/email" exact element={<SignupEmail />} />
        <Route path="signup/detail" exact element={<SignupDetail />} />
        <Route path="login" exact element={<Login />} />
        <Route path="login/email" exact element={<LoginEmail />} />
        <Route path="mypage" exact element={<MyPage />} />
        <Route path="mypostpage" exact element={<MyPagePost />} />
        <Route path="mypage/edit" exact element={<MyPageEdit />} />
        <Route path='*' element={<div>404 Not Found</div>} />
        <Route path='loading' exact element={<Loading />} />
        <Route path="kakao" exact element={<KakaoLogin />} />
        {/* <Route path="naver" exact element={<NaverLogin />} /> */}
        <Route path="emailconfirm" exact element={<EmailConfrim />} />
        <Route path="search" exact element={<Search />} />
        <Route path="search/post" exact element={<SearchPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;