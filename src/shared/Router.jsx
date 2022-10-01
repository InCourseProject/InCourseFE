import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Post from "../pages/Post/Post";
import Form from "../pages/Form/Form";
import Card from "../pages/Card/Card";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import MyPage from "../pages/MyPage/MyPage";
import MyPageEdit from "../pages/MyPageDetail/MyPageEdit";
import Category from "../pages/Category/Category";

const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="post" exact element={<Post />} />
        <Route path="form" exact element={<Form />} />
        <Route path="card" exact element={<Card />} />
        <Route path="/category" exact element={<Category />} />
        <Route path="signup" exact element={<Signup />} />
        <Route path="login" exact element={<Login />} />
        <Route path="mypage" exact element={<MyPage />} />
        <Route path="mypage/edit" exact element={<MyPageEdit />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;