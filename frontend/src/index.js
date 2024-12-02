import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from './ChatRoom/chatroom';
import Login from './Login/login'
import Swipe from './Swipe/swipe'
import OpenChat from './OpenChat/openchat'
import Register from './Register/register'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="chatroom" element={<ChatRoom />} />
        <Route path="login" element={<Login />} />
        <Route path="swipe" element={<Swipe />} />
        <Route path="openchat" element={<OpenChat />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
