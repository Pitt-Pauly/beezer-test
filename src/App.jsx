import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from './logo.svg';
import UserTable from './UserTable';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img`
  animation: ${rotate360} infinite 20s linear;
  height: 80px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: #222;
  height: 100px;
  padding: 20px;
  color: white;
  width: 100%;
`;

const App = () => (
  <div className="App">
    <Header className="App-header">
      <Logo src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Beezer Coding Test</h1>
    </Header>
    <UserTable />
  </div>
);

export default App;
