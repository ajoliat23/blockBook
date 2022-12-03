import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUpPage } from './pages/signupPage';
import { Container } from '@material-ui/core'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element = { <SignUpPage /> } />
        <Route path="/signin" />
        <Route path="/signout" />
        <Route path="/"/>
      </Routes>
    </Router>
  );
}

export default App;
