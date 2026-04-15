import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ModeProvider from './providers/ModeProvider.tsx'
import CurrencyProvider from './providers/CurrencyProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModeProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </ModeProvider>
  </StrictMode>,
)
