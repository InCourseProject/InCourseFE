import React from "react";
import styled from "@emotion/styled";

const Signup = () => {

    return (
      <div>
        <StForm>
          <div>서비스 배너</div>
          <input placeholder="email" name="email" type="email" />
          <input placeholder="nickname" name="nickname" type="text" />
          <input placeholder="password" type="password" name="sdf" id="sdf" />
          <input placeholder="passwordcheck" type="password" name="sdf" id="s" />
          <button type="submit">회원가입</button>  
        </StForm>
        
      </div>
    );
};

export default Signup;

const StForm = styled.form`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
`