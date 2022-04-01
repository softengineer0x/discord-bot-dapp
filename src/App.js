import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const Home = lazy(() => import('./pages/home'))

function App() {
  return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default App
