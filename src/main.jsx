import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
// context
import { UserProvider } from './context/userContext';
import { ThemeProvider } from './context/themeContext';
import { TodoProvider } from './context/todoContext';

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);