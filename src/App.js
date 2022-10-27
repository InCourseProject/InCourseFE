import styled from '@emotion/styled';
import React from 'react';
import Router from './shared/Router';



function App() {
  return <Wrap>
  <Router/>;
  </Wrap>
}

export default App;
const Wrap = styled.div`
width: 100%;
margin: 0 auto;
max-width: 390px;
`