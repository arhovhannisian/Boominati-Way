import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const App = React.lazy(() => import('./App.jsx'))



createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Suspense fallback={<div className='factory'></div>}>
                <App />
            </Suspense>
            <ToastContainer limit={4} />
        </BrowserRouter>
    </StrictMode>
)
