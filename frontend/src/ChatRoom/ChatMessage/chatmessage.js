import React from "react";
import "./chatmessage.css";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const ChatMessage = ({ msg, isSender }) => {
    return (
        <div className={`chat-message-container ${isSender ? "sender" : "receiver"}`} key={msg.user.id}>
            {!isSender && 
            <div className="avatar-message">
                <AccountCircleOutlinedIcon sx={{ fontSize: 40, color: "#4caf50" }} />
            </div>}
            <div className="message-content">
                {!isSender && <div className="username">{msg.user.name}</div>}
                <div className="chat-message">
                    {msg.detail}
                    <div className="message-time">{new Date(msg.senttime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;