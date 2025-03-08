import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Certifique-se de que este arquivo contém as diretivas Tailwind
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)