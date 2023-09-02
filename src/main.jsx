import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter} from 'react-router-dom'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

const renderReactDom = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    
      <HashRouter>
        <AuthContextProvider>          
            <App />        
        </AuthContextProvider>          
      </HashRouter>    
  )
}

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    renderReactDom();
    
  }, false);
} else {
  renderReactDom();
}
