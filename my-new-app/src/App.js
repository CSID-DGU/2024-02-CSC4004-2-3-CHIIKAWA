import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Basic, MyPage } from './Profile/profile'; // 使用命名导出的大括号导入
import './styles/App.css';

function App() {
  return (
    <Router>
      <div>
        {/* 导航栏 */}
        <nav className="navbar" style={{ padding: '10px', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#ff8c42', textDecoration: 'none', marginRight: '10px' }}>
            개인 프로필
          </Link>
          <span> | </span>
          <Link to="/mypage" style={{ color: '#ff8c42', textDecoration: 'none', marginLeft: '10px' }}>
            마이페이지
          </Link>
        </nav>

        {/* 路由配置 */}
        <Routes>
          <Route path="/" element={<Basic />} /> {/* Basic 路由 */}
          <Route path="/mypage" element={<MyPage />} /> {/* MyPage 路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
