import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AuthProvider } from './auth/AuthContext';
import { RequireAuth } from './auth/guards';
import { AuthPage } from './components/AuthPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RequireAuth fallback={<AuthPage />}>
        <App />
      </RequireAuth>
    </AuthProvider>
  </React.StrictMode>
);
