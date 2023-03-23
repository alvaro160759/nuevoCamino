import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter} from 'react-router-dom'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'

const renderReactDom = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HashRouter>
          <AuthContextProvider>
              <App />
          </AuthContextProvider>
      </HashRouter>    
    </React.StrictMode>
  )
}



if (window.cordova) {
  document.addEventListener('deviceready', () => {
    renderReactDom();
    
  }, false);
} else {
  renderReactDom();
}
