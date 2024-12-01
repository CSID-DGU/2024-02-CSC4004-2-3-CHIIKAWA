import './App.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Common/footer';
import Header from './Common/header';
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
    <div className="app">
        <Header />
      <main>
        <h2>환영합니다!</h2>
        <p>이곳은 버튼 스타일을 테스트하는 페이지입니다.</p>
        <button className="button">기본 버튼</button>
        <button class="button" onClick={() => getUser()}>get 버튼</button>
        <button class="button" onClick={() => postUser()}>post 버튼</button>
      </main>

      <Footer />
    </div>
  );
}

export default App;