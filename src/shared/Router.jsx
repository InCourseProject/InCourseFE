import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Post from "../pages/Post/Post";
import Form from "../pages/Form/Form";
import Card from "../pages/Card/Card";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import LoginEmail from "../pages/Login/components/LoginEmail";
import MyPage from "../pages/MyPage/MyPage";
import MyPageEdit from "../pages/MyPageEdit/MyPageEdit";
import SignupEmail from "../pages/Signup/components/SignupEmail";
import SignupDetail from "../pages/SignupDetail/SignupDetail";
import Oauth2Handler from "../pages/Login/components/Oauth2Handler";
import EmailConfrim from "../pages/SignupDetail/components/EmailConfirm";


const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="post" exact element={<Post />} />
        <Route path="form" exact element={<Form />} />
        <Route path="card" exact element={<Card />} />
        <Route path="signup" exact element={<Signup />} />
        <Route path="signup/email" exact element={<SignupEmail />} />
        <Route path="signup/detail" exact element={<SignupDetail />} />
        <Route path="login" exact element={<Login />} />
        <Route path="login/email" exact element={<LoginEmail />} />
        <Route path="mypage" exact element={<MyPage />} />
        <Route path="mypage/edit" exact element={<MyPageEdit />} />
        <Route path='*' element={<div>404 Not Found</div>} />
        <Route path="kakao" exact element={<Oauth2Handler />} />
        <Route path="emailconfirm" exact element={<EmailConfrim />} />
        
        Outh
      </Routes>
    </BrowserRouter>
  );
};

export default Router;