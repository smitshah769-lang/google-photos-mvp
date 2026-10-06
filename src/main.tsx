import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { flowStore } from '@/state/flowStore'

if (import.meta.env.DEV) {
  ;(globalThis as typeof globalThis & { __flowStore?: typeof flowStore }).__flowStore =
    flowStore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
