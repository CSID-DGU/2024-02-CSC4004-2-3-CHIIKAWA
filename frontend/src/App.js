import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./Chatroom/chatroom";
import OpenChat from "./OpenChat/openchat";
import NavBar from "./common/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/openchat" element={<OpenChat />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
