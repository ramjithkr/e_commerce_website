import { Outlet } from "react-router-dom"
import { AdminDashboardHeader } from "../componets/admin/AdminDashboardHeader";


export const AdminDashboardLayout = () => {
  return (
    <div>
     <AdminDashboardHeader/>
      <div className="min-h-96">
        <Outlet/>
      </div>

    </div>
  )
}
