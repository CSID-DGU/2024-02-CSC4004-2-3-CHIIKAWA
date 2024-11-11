import './App.css';
import logo from './resources/logo.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const navigateToChatRoom = () => {
    navigate("/chatroom");
  };

  return (
    <body>

      <div class="header">
        <div class="logo">
          <img src={logo} alt="logo" />
        </div>
        <div class="button-container">
          <button class="btn-header btn-3">로그인</button>
          <button class="btn-header btn-3">회원가입</button>
        </div>
      </div>

      <main>
        <h2>환영합니다!</h2>
        <p>이곳은 버튼 스타일을 테스트하는 페이지입니다.</p>
        <button class="button">기본 버튼</button>
      </main>

      <div class="footer">
        <div class="button-container">
          <button class="btn-footer">A</button>
          <button class="btn-footer">B</button>
          <button class="btn-footer">C</button>
        </div>
      </div>

    </body>
  );
}

export default App;