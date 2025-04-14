import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import showToast from "@/utils/ShowToast";
import LabelAndInput from "@/components/LabelAndInput";
import useForm from "@/hooks/useForm";

function LoginPage (){
   
    const navigate = useNavigate();

    const form =useForm({email:"",password:""},
        (values)=>{
            let textErrors = {}
            if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email))textErrors.email="Email is already taken, Please try another email.";
                else if(values.email===null){textErrors.email="Email is already taken, Please try another email."}
            if(values.password.length <6)textErrors.password = "Password must be at least 6 characters";
        return textErrors;
        }
    )
    
    function login (e) {
        e.preventDefault();
        if(form.validateForm()){navigate("/sign-up/success")}
        else{showToast("bg-[#EB5164]","Your password is incorrect or this email doesn’t exist","Please try another password or email")}
    }    

    return(
        <>
        <NavBar/>
        <div className="flex flex-col justify-center max-w-[798px]
                         mt-10 mx-4 px-4 py-10 mb-19 bg-[#EFEEEB] rounded-xl 
                        sm:mx-10 sm:px-15 
                         md:px-25 md:py-15  md:mx-20 md:mt-15 md:mb-24
                         lg:px-30 lg:mx-auto  lg:mb-28
                         xl:px-30  xl:mb-34" >
            <h1 className="flex justify-center text-4xl font-bold mb-6">Log in</h1>
            
            <form   onSubmit={(e)=>login(e)} 
                    className="flex flex-col items-center gap-6 md:gap-7">
            
            <LabelAndInput  label="Email"
                            id="email" 
                            type="email" 
                            form={form}/>
           
           <LabelAndInput   label="Password" 
                            id="password" 
                            type="password" 
                            form={form}/>

            <Button variant={"blackButton"} 
                    className="w-[140px] px-10 py-6 mb-6 lg:mt-3 lg:mb-10"
                    type="submit" 
                    >Log in</Button>
            </form>
            
            <div className="flex justify-center gap-3 text-lg">
                <h5 className="text-[#75716B]">Don’t have any account?</h5>
                <span className="underline cursor-pointer"
                    onClick={()=>navigate("/sign-up")}>Sign up</span>
            </div>
        </div>
        </>
    )
}
export default LoginPage