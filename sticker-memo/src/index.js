import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import MemoStore from './store/memoStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={new MemoStore()} />
  </React.StrictMode>
);
