import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <aside className="w-64 bg-gray-800">
        <p className="text-white p-4">Sidebar</p>
      </aside>
      
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout;