import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // 引入全局样式
import App from './App'; // 引入主组件
import reportWebVitals from './reportWebVitals'; // 性能监控

// 创建 React 应用的根节点
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 性能监测 (可选)
// 传递函数来记录性能数据，例如 console.log 或发送到分析端点
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
