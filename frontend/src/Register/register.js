import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios 추가

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // Form 데이터 준비
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('foodPreferences', JSON.stringify(foodPreferences)); // 배열을 JSON 문자열로 변환
        if (profileImage) {
            formData.append('profileImage', profileImage); // 파일 추가
        }

        try {
            // 회원가입 API 호출
            const response = await axios.post('/users', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }, // 파일 업로드를 위한 헤더
            });

            console.log('회원가입 성공:', response.data);

            // 회원가입 성공 시 swipe 페이지로 이동
            navigate('/swipe');
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
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
                        placeholder="닉네임을 입력하세요"
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
                            required={index === 0}
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
