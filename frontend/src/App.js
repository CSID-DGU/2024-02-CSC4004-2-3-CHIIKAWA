import './App.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Common/footer';
import Header from './Common/header';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app">
        <Header />
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