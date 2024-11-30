import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [foodPreferences, setFoodPreferences] = useState(['', '', '']);
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate(); 

    const handleFoodPreferenceChange = (index, value) => {
        const updatedPreferences = [...foodPreferences];
        updatedPreferences[index] = value;
        setFoodPreferences(updatedPreferences);
    };

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        console.log({
            email,
            password,
            name,
            foodPreferences,
            profileImage,
        });

        navigate('/swipe');
    };

    return (
        <div className="register-container">
            <h2 className="register-title">회원가입</h2>
            <p className="register-subtitle">밥친구와 함께할 준비가 되셨나요?</p>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-input-container">
                    <label className="register-icon">📧</label>
                    <input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-input"
                        required
                    />
                </div>
                <div className="register-input-container">
                    <label className="register-icon">🔒</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input"
                        required
                    />
                </div>
                <div className="register-input-container">
                    <label className="register-icon">🔒</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="register-input"
                        required
                    />
                </div>
                <div className="register-input-container">
                    <label className="register-icon">👤</label>
                    <input
                        type="text"
                        placeholder="가명을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="register-input"
                        required
                    />
                </div>
                {foodPreferences.map((preference, index) => (
                    <div className="register-input-container" key={index}>
                        <label className="register-icon">🍴</label>
                        <input
                            type="text"
                            placeholder={`음식 취향 ${index + 1}`}
                            value={preference}
                            onChange={(e) => handleFoodPreferenceChange(index, e.target.value)}
                            className="register-input"
                            required={index === 0} // 첫 번째 입력 필드만 필수
                        />
                    </div>
                ))}
                <div className="register-input-container">
                    <label className="register-icon">📷</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="register-input"
                    />
                </div>
                <button type="submit" className="register-button">회원가입</button>
            </form>
        </div>
    );
}

export default Register;
