"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { AppSidebar } from "../components/dashboard/AppSidebar"

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-5 left-5 z-50 bg-white md:hidden"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X className="w-5 h-5 text-gray-800" /> : <Menu className="size-5 text-gray-800" />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AppSidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
