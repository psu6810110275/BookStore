import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const showTime = () => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    </StrictMode>,
);
}

setInterval(showTime, 1000);
