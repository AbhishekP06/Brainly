import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ViewPage from './pages/ViewPage'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </BrowserRouter>
      {/* Toast container */}
      <Toaster position="top-center" />
    </>
  )
}

export default App
