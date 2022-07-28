import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import youReducer from "./app/features/chat/youSlice";
import conversationsReducer from './app/features/chat/conversationsSlice'
import socketReducer from './app/features/connection/socketSlice';
import storageFireBaseReducer from './app/features/chat/storageFireBaseSlice';
import thunkMiddleware from 'redux-thunk';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    you: youReducer,
    socket: socketReducer,
    conversations: conversationsReducer,
    storageFireBase: storageFireBaseReducer
  },
  middleware : [thunkMiddleware]
});

root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
