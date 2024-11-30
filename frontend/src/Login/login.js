import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', { email, password });
    };

    return (
        <div className="login-container">
            <h2 className="login-title">로그인</h2>
            <p className="login-subtitle">밥친구를 만들 준비가 되셨나요?</p>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input-container">
                    <label className="login-icon">👤</label>
                    <input
                        type="text"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                </div>
                <div className="login-input-container">
                    <label className="login-icon">🔒</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                </div>
                <button type="submit" className="login-button">로그인</button>
            </form>
            <button
                onClick={() => console.log('Forgot Password 클릭')}
                className="forgot-password"
            >
                비밀번호를 잊으셨나요?
            </button>
            <p className="login-footer">
                밥친구가 처음이세요? <span className="sign-up" onClick={() => navigate('/register')}>회원 가입</span>
            </p>
        </div>
    );
}

export default Login;
