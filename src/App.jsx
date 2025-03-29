
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from "@/components/ui/sonner"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from './page/HomePage'
import ViewPostPage from './page/ViewPostPage';
import NotFoundPage from './page/NotFoundPage'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/post/:postId" element={<ViewPostPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>  
    <Toaster />
    </>
  )
}
export default App
