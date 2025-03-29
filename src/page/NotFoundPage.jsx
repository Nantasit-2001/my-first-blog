import { useNavigate } from "react-router-dom"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import { CircleAlert } from 'lucide-react';

function NotFoundPage (){
    const navigator=useNavigate();
    return(
<div className="h-screen flex flex-col">
  <NavBar />
  <div className="flex flex-col justify-center items-center flex-1">
    <CircleAlert size={100}/>
    <h1 className="my-6 text-3xl font-bold">Page Not Found</h1>
    <button className="bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800 shadow-lg"
        onClick={()=>navigator("/")}>    
        Go to HomePage</button>
  </div>
  <Footer />
</div>
    )
}
export default NotFoundPage