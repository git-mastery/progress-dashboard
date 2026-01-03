import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { HashRouter, Route, Routes } from 'react-router'
import '@/styles/index.css'
import App from '@/pages'
import Dashboard from '@/pages/dashboard/(username)'
import FaqPage from '@/pages/faq'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="dashboard/:username" element={<Dashboard />} />
          <Route path="faq" element={<FaqPage />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>
);
