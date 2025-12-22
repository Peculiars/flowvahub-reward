import type { ReactNode } from "react"

const ProtectedRoute = ({children}: {children: ReactNode}) => {

  return (
    <div>
        ProtectedRoute
        {children}
    </div>
  )
}

export default ProtectedRoute