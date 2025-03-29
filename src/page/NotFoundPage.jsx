import { useNavigate } from "react-router-dom"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
function NotFoundPage (){
    const navigator=useNavigate();
    return(
<div className="h-screen flex flex-col">
  <NavBar />
  <div className="flex flex-col justify-center items-center flex-1">
    <h1>Page Not Found</h1>
    <button className="bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800 shadow-lg"
        onClick={()=>navigator("/")}>    
        Go to HomePage</button>
  </div>
  <Footer />
</div>
    )
}
export default NotFoundPage