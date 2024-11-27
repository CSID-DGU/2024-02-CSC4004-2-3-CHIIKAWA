import React from 'react';
import '../styles/MyPage.css';
import avatar from '../assets/537.png';

function MyPage() {
  return (
    <div className="mypage" style={{ backgroundColor: '#ff8c42', minHeight: '100vh' }}>
      <h1 className="mypage-title">마이페이지</h1>
      <div className="profile-section">
        <img
          src={avatar}
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-name">이지우</h2>
        <p className="profile-username">@jiwoo02</p>
      </div>
      <ul className="mypage-options">
        <li><span>선호음식</span></li>
        
        
        <li><span>닉네임 수정</span></li>
        <li><span>선호 음식 수정</span></li>
      </ul>
    </div>
  );
}

export default MyPage;
