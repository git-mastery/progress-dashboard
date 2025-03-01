import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { HashRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import Dashboard from './Dashboard.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="dashboard/:username" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>,
)
