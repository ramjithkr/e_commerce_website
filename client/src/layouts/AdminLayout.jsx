import { Outlet } from "react-router-dom"
import { Footer } from "../componets/Footer"
import { AdminHeader } from './../componets/admin/AdminHeader';
import { SummerSaleBanner } from "../pages/Home/SummerSaileBanner";


export const AdminLayout = () => {
  return (
    <div>
      <SummerSaleBanner/>
      <AdminHeader/>
      <div className="min-h-96">
        <Outlet/>
      </div>

      <Footer/>
    </div>
  )
}
