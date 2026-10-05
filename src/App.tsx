import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FlowApp } from '@/components/FlowApp'
import { PhoneFrame } from '@/components/PhoneFrame'
import { DevLibrary } from '@/components/DevLibrary'
import { PrototypeShell } from '@/components/PrototypeShell'

function Home() {
  return (
    <PrototypeShell>
      <PhoneFrame>
        <main className="flex flex-1 flex-col bg-gp-bg" aria-label="Ask Photos">
          <FlowApp />
        </main>
      </PhoneFrame>
    </PrototypeShell>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dev" element={<DevLibrary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
