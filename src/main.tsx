import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider } from '@auth0/auth0-react';
import Navbar from './component/Navbar'
import { getConfig } from './config/config.tsx'

const config = getConfig();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth0Provider
        domain = {config.domain}
        clientId= {config.clientId}
        authorizationParams={{ redirect_uri: window.location.origin }}>
          <Navbar/>
        <App />
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>,
)
