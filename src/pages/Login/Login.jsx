import React from "react";
import styled from "@emotion/styled";

const Login = () => {

    return (
      <div>
        <StDiv>
          <div>추천 포스트</div>
          <h3>randomUser님의 추천 코스로 오늘 하루 어때요?</h3>
          <form>
            <input placeholder="email" name="email" type="email" />
            <input placeholder="password" type="password" name="sdf" id="sd" />
            <button>로그인</button>
          </form>
          <button>회원가입</button>
          <hr />
          <SnsLoginWrap>
            <button>네이버로 로그인</button>
            <button>카카오톡으로 로그인</button>
          </SnsLoginWrap>
        </StDiv>
      </div>
    );
};

export default Login;

const StDiv = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
`
const SnsLoginWrap = styled.div`
  display: flex;
  flex-direction: row;
`