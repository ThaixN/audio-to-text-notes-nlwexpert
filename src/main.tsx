import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { Toaster } from 'sonner'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // busca o id root e renderiza (mostra em tela) a aplicação.
  <React.StrictMode>
    {/* // app vem da função app.tsx */}
    <App /> 
    <Toaster richColors/>
  </React.StrictMode>,
)
