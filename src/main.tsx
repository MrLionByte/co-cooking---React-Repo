import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TokensProvider } from "@/contexts/TokensContext.tsx";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokensProvider>
    <App />
    </TokensProvider>
  </StrictMode>,
)
