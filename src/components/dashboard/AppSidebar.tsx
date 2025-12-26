import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Home, Compass, Library, Layers, CreditCard, Gift, Settings } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useUserStore } from "../../store/userStore"
import logo from "../../assets/flowva_logo-2.png"

export const AppSidebar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { signOut } = useAuth()
  const { user } = useUserStore()
  console.log("user", user)

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard/home" },
    { icon: Compass, label: "Discover", path: "/dashboard/discover" },
    { icon: Library, label: "Library", path: "/dashboard/library" },
    { icon: Layers, label: "Tech Stack", path: "/dashboard/tech-stack" },
    { icon: CreditCard, label: "Subscriptions", path: "/dashboard/subscriptions" },
    { icon: Gift, label: "Rewards Hub", path: "/dashboard/earn-rewards" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ]

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <aside className="w-[250px] h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 pb-6">
        <img src={logo} alt="Flowva" className="h-16" />
      </div>
      <nav className="flex-1 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-3 text-base font-medium transition-colors ${
                isActive ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="relative px-2 pb-4">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="w-full flex items-center gap-3 px-3 cursor-pointer py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 text-lg font-semibold">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <p className="p-3">{user?.fullName?.charAt(0) || user?.email?.charAt(0) || "U"}</p> 
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">{user?.fullName || "User"}</div>
            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
          </div>
        </button>

        {showUserMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
            <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Feedback
              </button>
              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Support
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
