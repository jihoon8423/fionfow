import React from 'react';
import { createRoot } from 'react-dom/cjs/react-dom.production.min';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store/Store';
import { AuthContextProvider } from './components/store/AuthContext';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Provider store={store}>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>
);
