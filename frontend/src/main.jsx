import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { UsuarioProvider } from './context/UsuarioContext'
import { PedidoProvider } from './context/PedidoContext'
import { CarritoProvider } from './context/CarritoContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UsuarioProvider>
        <AuthProvider>
          <PedidoProvider>
            <CarritoProvider>
              <App />
            </CarritoProvider>
          </PedidoProvider>
        </AuthProvider>
      </UsuarioProvider>
    </BrowserRouter>
  </StrictMode>,
)