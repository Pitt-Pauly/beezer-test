import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserTable from './UserTable';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <UserTable />
  </div>
);

export default App;
