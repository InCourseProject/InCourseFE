import React from "react";
import styled from "@emotion/styled";
import FormComponent from "./components/FormComponent";
import HeaderBar from "../../components/layout/HeaderBar";
import NaviBar from "../../components/layout/NaviBar";
const Form = () => {

    return (
      <div>
        <HeaderBar/>
        <FormComponent/>
        <NaviBar/>
      </div>



    );
};

export default Form;