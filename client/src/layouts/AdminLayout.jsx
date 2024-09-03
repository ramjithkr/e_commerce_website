import { Outlet } from "react-router-dom"
import { Header } from "../componets/Header"
import { Footer } from "../componets/Footer"


export const AdminLayout = () => {
  return (
    <div>
      <Header/>
      <div className="min-h-96">
        <Outlet/>
      </div>
okkue
      <Footer/>
    </div>
  )
}
