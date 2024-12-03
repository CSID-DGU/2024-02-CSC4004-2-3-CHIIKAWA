import React from "react";
import { useNavigate } from 'react-router-dom';

import "./chatgroup.css";

const ChatGroup = ({ group, onClick }) => {
    return (
        <div className="group-item" key={group.id} onClick={onClick}>
            <div className="group-icon">{group.icon}</div>
            <div className="group-name">{group.name}</div>
        </div>
    );
};

export default ChatGroup;