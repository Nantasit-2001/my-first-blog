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
import AdminArticlePage from './page/Admin/AdminArticle/AdminArticlePage'
import AdminCreateArticlePage from './page/Admin/AdminArticle/AdminCreateArticlePage'
import AdminEditArticlePage from './page/Admin/AdminArticle/AdminEditArticlePage'
import AdminCategoryPage from './page/Admin/AdminCatergory/AdminCategoryPage'
import AdminCreateCategoryPage from './page/Admin/AdminCatergory/AdminCreateCategoryPage'
import AdminEditCategoryPage from './page/Admin/AdminCatergory/AdminEditCategoryPage'
import AdminProfilePage from './page/Admin/AdminProfilePage'
import AdminNotificationPage from "./page/Admin/AdminNotificationPage"
import AdminResetPasswordPage from './page/Admin/AdminResetPasswordPage'
import { AuthProvider } from './context/Authcontext';
import {ProtectedRoute,ProtectedRouteAdmin } from './components/ProtectedRoute';
function App() {
  return (
    <>
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/post/:postId" element={<ViewPostPage/>} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-up/success" element={<SignUpSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
        <Route path="/reset-password" element={<ProtectedRoute><ResetPasswordPage/></ProtectedRoute>}/>
        
       <Route path="/AdminLoginPage" element={<AdminLoginPage />} />

  {/* หน้าเฉพาะ admin ที่ login แล้ว */}
  <Route element={<ProtectedRouteAdmin />}>
    <Route path="/AdminArticlePage" element={<AdminArticlePage />} />
    <Route path="/AdminCreateArticlePage" element={<AdminCreateArticlePage />} />
    <Route path="/AdminEditArticlePage/:postId" element={<AdminEditArticlePage />} />
    <Route path="/AdminCategoryPage" element={<AdminCategoryPage />} />
    <Route path="/AdminCreateCategoryPage" element={<AdminCreateCategoryPage />} />
    <Route path="/AdminEditCategoryPage/:categoryId" element={<AdminEditCategoryPage />} />
    <Route path="/AdminProfilePage" element={<AdminProfilePage />} />
    <Route path="/AdminNotificationPage" element={<AdminNotificationPage />} />
    <Route path="/AdminResetPasswordPage" element={<AdminResetPasswordPage />} />
  </Route>
        <Route path="*" element={<NotFoundPage/>} />
      
      </Routes>
    </BrowserRouter>  
    <Toaster />
  </AuthProvider>
    </>
  )
}
export default App
