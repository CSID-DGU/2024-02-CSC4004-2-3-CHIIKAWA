import './App.css';
import logo from './resources/logo.png';
import { useNavigate } from 'react-router-dom';
import Footer from './Common/footer';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="button-container">
          <button className="btn-header btn-3" onClick={() => navigate('/login')}>
            로그인
          </button>
          <button className="btn-header btn-3">
            회원가입
          </button>
        </div>
      </div>

      <main>
        <h2>환영합니다!</h2>
        <p>이곳은 버튼 스타일을 테스트하는 페이지입니다.</p>
        <button className="button">기본 버튼</button>
      </main>

      <Footer />
    </div>
  );
}

export default App;