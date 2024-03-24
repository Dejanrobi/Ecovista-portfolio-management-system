import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CompanyContextProvider } from './context/CompanyContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CompanyContextProvider>       
          <App />         
      </CompanyContextProvider>      
    </BrowserRouter>   
  </React.StrictMode>,
)
