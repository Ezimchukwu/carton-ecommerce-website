
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Wrap everything in StrictMode but ensure App handles the AuthProvider correctly
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
