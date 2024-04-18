import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { CompanyContextProvider } from './context/CompanyContext.jsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (import.meta.env.NODE_ENV  === 'production') disableReactDevTools()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CompanyContextProvider>       
          <App />         
      </CompanyContextProvider>      
    </BrowserRouter>   
  </React.StrictMode>,
)
