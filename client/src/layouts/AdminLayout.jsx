import { Outlet } from "react-router-dom"
import { Footer } from "../componets/Footer"
import { AdminHeader } from './../componets/admin/AdminHeader';


export const AdminLayout = () => {
  return (
    <div>
      <AdminHeader/>
      <div className="min-h-96">
        <Outlet/>
      </div>

      <Footer/>
    </div>
  )
}
