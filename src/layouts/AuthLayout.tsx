import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-[100dvh] flex justify-center py-[20px] px-3 items-center bg-gradient-to-br from-[#9013fe] to-[#6D28D9]">
      <div className="flex justify-center w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout;