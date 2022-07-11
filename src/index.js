import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import middleware from './app/features/middleware/middleware';
import youReducer from "./app/features/chat/youSlice";
import loginReducer from './app/features/login/loginSlice';
import conversationsReducer from './app/features/chat/conversationsSlice'
import socketReducer from './app/features/connection/socketSlice';
import storageFireBaseReducer from './app/features/chat/storageFireBaseSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    socket: socketReducer,
    login: loginReducer,
    you: youReducer,
    conversations: conversationsReducer,
    storageFireBase: storageFireBaseReducer
  },
  middleware : middleware
})

root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
