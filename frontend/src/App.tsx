import DashBoard from "./Components/DashboardComponents/DashBoard"
import LandingPage from "./Components/DashboardComponents/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignupForm } from "./Components/DashboardComponents/SignupForm"
import { LoginForm } from "./Components/DashboardComponents/LoginForm"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/dashboard' element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
