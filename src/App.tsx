
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import EarnRewards from './pages/dashboard/EarnRewards'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard/earn-rewards" element={<EarnRewards />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
