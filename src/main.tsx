import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AllRoutes from './routes/AllRoutes.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AllRoutes />
  </BrowserRouter>
)
