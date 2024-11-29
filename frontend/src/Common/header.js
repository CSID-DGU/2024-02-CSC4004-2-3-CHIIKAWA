import React from 'react';
import { Link } from 'react-router-dom'; // 로고 클릭 시 홈으로 이동하려면 필요
import './header.css';

function Header() {
    return (
        <header className="header">
            {/* 로고 */}
            <div className="header-logo">
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + '/babchingu_logo.png'} alt="Logo" />
                </Link>
            </div>

            {/* 사람 모양 이모티콘 */}
            <div className="header-icon">
                <Link to="/login">
                    <img src={process.env.PUBLIC_URL + '/profile.png'} alt="Profile" />
                </Link>
            </div>
        </header>
    );
}

export default Header;
