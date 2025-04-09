
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from "@/components/ui/sonner"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from './page/HomePage'
import ViewPostPage from './page/ViewPostPage';
import NotFoundPage from './page/NotFoundPage'
import SignUpPage from './page/SignUpPage'
import SignUpSuccessPage  from './page/SignUpSuccessPage'
import LoginPage from './page/LoginPage'
import ProfilePage from './page/ProfilePage'
import ResetPasswordPage from './page/ResetPasswordPage'
import AdminLoginPage from './page/Admin/AdminLoginPage'
import AdminArticlePage from './page/Admin/AdminArticlePage'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/post/:postId" element={<ViewPostPage/>} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-up/success" element={<SignUpSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        
        <Route path="/AdminLoginPage" element={<AdminLoginPage/>}/>
        <Route path="/AdminArticlePage" element={<AdminArticlePage/>}/>
        <Route path="*" element={<NotFoundPage/>} />
      
      </Routes>
    </BrowserRouter>  
    <Toaster />
    </>
  )
}
export default App
