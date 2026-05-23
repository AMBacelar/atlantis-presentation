import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import Display from './routes/Display'
import Present from './routes/Present'
import Login from './routes/Login'
import Join from './routes/Join'
import Play from './routes/Play'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('no #root')

createRoot(root).render(
  <StrictMode>
    <MDXProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/present" element={<Present />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/play" element={<Play />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MDXProvider>
  </StrictMode>,
)
