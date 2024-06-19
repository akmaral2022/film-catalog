import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';
import App from './App';
import ruRU from 'antd/lib/locale/ru_RU';
import { antdTheme } from './types/antd-theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU} theme={antdTheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

