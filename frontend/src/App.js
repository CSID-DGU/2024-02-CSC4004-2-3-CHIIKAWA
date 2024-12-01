import './App.css';
import logo from './resources/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const navigate = useNavigate();

  // GET API호출 예시
  async function getUser(params) {
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get('/users', {
        params: {
          id: 1
        }
      });
      console.log(response);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
    }
  }

  // POST API호출 예시
  async function postUser(params) {
    try {
      // POST 요청은 body에 실어 보냄
      let result = await axios.post('/users', {
        name: 'Fred',
        email: 'test@test.com',
        password: '123',
        food1: {
          id: 1
        }
      });
    } catch (e) {
      // 실패 시 처리
      console.error(e);
    }
  }

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
          <button className="btn-header btn-3" onClick={() => navigate('/login')}>
            로그인
          </button>
          <button class="btn-header btn-3">회원가입</button>
        </div>
      </div>

      <main>
        <h2>환영합니다!</h2>
        <p>이곳은 버튼 스타일을 테스트하는 페이지입니다.</p>
        <button class="button" onClick={() => getUser()}>get 버튼</button>
        <button class="button" onClick={() => postUser()}>post 버튼</button>
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