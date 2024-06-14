import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';
import store from "./store";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);

