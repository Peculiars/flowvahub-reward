import { Routes, Route, Navigate } from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import DashboardLayout from "./layouts/DashboardLayout"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import AuthCallback from "./pages/AuthCallback"
import Onboarding from "./pages/Onboarding"
import EarnRewards from "./pages/dashboard/EarnRewards"
import ComingSoon from "./pages/dashboard/ComingSoon"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/confirm" element={<AuthCallback />} />
      </Route>

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
      <Route path="earn-rewards" element={<EarnRewards />} />
      <Route path="coming-soon" element={<ComingSoon />} />
  </Route>

  <Route path="*" element={<Navigate to="/login" />} />
</Routes>

  )
}

export default App
