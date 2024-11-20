import React from 'react';
import './App.css'; // 如果你有 App.css 样式
import Basic from './Basic'; // 引入 Basic.js 组件

function App() {
  return (
    <div className="App">
      <Basic /> {/* 渲染 Basic 组件 */}
    </div>
  );
}

export default App;
