

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'  
import './styles/index.css'

if (typeof global === 'undefined') {
  globalThis.global = globalThis;
}



console.log("React Application Initializing...");

window.onerror = (message, source, lineno) => {
  console.error("GLOBAL ERROR DETECTED:", message, "at", source, ":", lineno);
};

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error("Root element not found!");
} else {
    console.log("Root element found, rendering App...");
    createRoot(rootElement).render(
      <App />
    );
}


 