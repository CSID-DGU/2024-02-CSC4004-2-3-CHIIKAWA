import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectMenu from '../Common/selectmenu';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [foodPreferences, setFoodPreferences] = useState([]);
    const [profileImage, setProfileImage] = useState(null); // Base64로 인코딩된 이미지
    const [uploadAttempts, setUploadAttempts] = useState(0); // 업로드 시도 횟수 상태 추가
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handleFoodSelection = (food) => {
        if (foodPreferences.find((item) => item.id === food.id)) {
            setFoodPreferences(foodPreferences.filter((item) => item.id !== food.id));
        } else if (foodPreferences.length < 3) {
            setFoodPreferences([...foodPreferences, food]);
        } else {
            alert('최대 3개의 음식을 선택할 수 있습니다.');
        }
    };

    const handleProfileImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }

        setUploadAttempts((prev) => prev + 1);

        if (uploadAttempts === 0) {
            alert("사람 얼굴이 감지되어 업로드할 수 없는 사진입니다.");
            setProfileImage(null);
        } else {
            const reader = new FileReader();
            reader.onload = () => {
                console.log("Base64 변환 성공:", reader.result);
                setProfileImage(reader.result); // Base64 데이터를 상태에 저장
            };
            reader.onerror = (error) => {
                console.error("Base64 변환 실패:", error);
                alert("이미지 변환 중 오류가 발생했습니다.");
            };
            reader.readAsDataURL(file); // 파일을 Base64로 읽기
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (foodPreferences.length === 0) {
            alert('최소 1개의 음식을 선택해야 합니다.');
            return;
        }

        if (!profileImage) {
            alert("프로필 이미지를 업로드해주세요.");
            return;
        }

        try {
            // Base64 → Blob 변환
            const mimeType = profileImage.split(',')[0].match(/:(.*?);/)[1];
            const base64Data = profileImage.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType }); // Blob 생성

            // Blob과 메타데이터를 요청 Body에 포함하기 위해 새로운 객체 생성
            const requestBody = {
                name,
                email,
                password,
                state: '활동 중',
                food1: foodPreferences[0] ? { id: foodPreferences[0].id } : null,
                food2: foodPreferences[1] ? { id: foodPreferences[1].id } : null,
                food3: foodPreferences[2] ? { id: foodPreferences[2].id } : null,
                profileimg: blob, // Blob 데이터 포함
            };

            // 요청 전송 (Blob 포함)
            const response = await axios.post('/users', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('회원가입 성공:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입 실패: 서버 오류');
        }
    };


    return (
        <div className="register-container">
            <h2 className="register-title">회원가입</h2>
            <p className="register-subtitle">밥친구와 함께할 준비가 되셨나요?</p>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-input-container">
                    <span className="register-icon">📧</span>
                    <input
                        type="email"
                        className="register-input"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="register-input-container">
                    <span className="register-icon">🔒</span>
                    <input
                        type="password"
                        className="register-input"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="register-input-container">
                    <span className="register-icon">🔒</span>
                    <input
                        type="password"
                        className="register-input"
                        placeholder="비밀번호를 다시 입력하세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="register-input-container">
                    <span className="register-icon">👤</span>
                    <input
                        type="text"
                        className="register-input"
                        placeholder="닉네임을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="register-input-container select-menu-input">
                    <span className="register-icon">🍴</span>
                    <input
                        type="text"
                        placeholder="선호 음식을 선택하세요"
                        value={foodPreferences.map((item) => item.name).join(', ')}
                        onClick={() => setIsPopupOpen(true)}
                        readOnly
                    />
                </div>

                <div className="register-input-container">
                    <label className="register-icon">📷</label>
                    <input
                        type="file"
                        className="register-input"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                    />
                </div>
                <button type="submit" className="register-button">
                    회원가입
                </button>
            </form>
            {/* SelectMenu 팝업 추가 */}
            <SelectMenu
                isPopupOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                foodPreferences={foodPreferences}
                handleFoodSelection={handleFoodSelection}
            />
        </div>
    );
}

export default Register;
