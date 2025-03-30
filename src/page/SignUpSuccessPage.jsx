import NavBar from "@/components/NavBar"
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function SignUpSuccessPage (){
    const navigate = useNavigate();
    return (
        <>
        <NavBar/>
        <div className="flex flex-col justify-center items-center max-w-[798px] gap-10 py-10
                         mt-10 mx-4 px-4 mb-19 bg-[#EFEEEB] rounded-xl 
                        sm:mx-10 sm:px-15 
                        md:mx-auto
                        lg:px-30 lg:py-12
                        xl:px-30  xl:mb-34 xl:py-15" >
                <Check size={80}  strokeWidth={4} color="white" className="rounded-[99px] bg-[#12B279] p-4"/>
            <h3 className="flex justify-center text-2xl font-bold md:text-3xl xl:text-4xl ">Registration success</h3>
            <Button className="rounded-[99px] px-10 py-6" onClick={()=>navigate("/")}>Continue</Button>
        </div>  
        </>
    )
}
export default SignUpSuccessPage