import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
// 1. Importás el nuevo contexto de usuarios:
import { UsuarioProvider } from './context/UsuarioContext' 
import { CarritoProvider } from './context/CarritoContext'
import { PedidoProvider } from './context/PedidoContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsuarioProvider>
          <PedidoProvider>
            <CarritoProvider>
              <App />
            </CarritoProvider>
          </PedidoProvider>
        </UsuarioProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)