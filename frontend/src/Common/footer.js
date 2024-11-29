import React from 'react';
import { useNavigate } from 'react-router-dom';
import './footer.css';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="button-container">
        <button
          className="btn-footer"
          onClick={() => navigate('/swipe')}>
          스와이프
        </button>
        <button
          className="btn-footer"
          onClick={() => navigate('/openchat')}>
          오픈채팅
        </button>
        <button
          className="btn-footer"
          onClick={() => navigate('/chatroom')}>
          채팅룸
        </button>
      </div>
    </div>
  );
}

export default Footer;
