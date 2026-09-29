import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Tokens first — index.css consumes its custom properties.
import './styles/tokens.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
