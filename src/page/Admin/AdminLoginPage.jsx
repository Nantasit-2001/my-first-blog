import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from 'sonner'
import LabelAndInput from "@/components/LabelAndInput";
import useForm from "@/hooks/useForm";
import { loginAdmin } from "@/services/auth/auth.mjs";
import { useAuth } from "@/context/Authcontext";
function AdminLoginPage (){
    const navigate = useNavigate();
    const {loginWithToken}=useAuth()
    const { loggedIn, user, loading } = useAuth();
    const form =useForm({email:"",password:""},
        (values)=>{
            let textErrors = {}
            if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email))textErrors.email="Email is already taken, Please try another email.";
                else if(values.email===null){textErrors.email="Email is already taken, Please try another email."}
            if(values.password.length <6)textErrors.password = "Password must be at least 6 characters";
        return textErrors;
        }
    )
    
   async function login(e) {
  e.preventDefault();

  if (!form.validateForm()) {
    return;
  }

  try {
    const res = await loginAdmin({ ...form.values });
    if (res?.token) {
      await loginWithToken(res.token);
      console.log(loggedIn, user?.data?.role, loading )
      navigate("/AdminArticlePage");
    }
  } catch (err) {
    console.error(err);
  }
}

    return(
        <>
        <div className="flex flex-col justify-center max-w-[798px]
                         mt-10 mx-4 px-4 py-10 mb-19 bg-[#EFEEEB] rounded-xl 
                        sm:mx-10 sm:px-15 sm:mt-40
                         md:px-25 md:py-15  md:mx-20 md:mb-24
                         lg:px-30 lg:mx-auto  lg:mb-28
                         xl:px-30  xl:mb-34" >
            <h4 className="text-[#F2B68C] text-xl text-center font-medium ">Admin panel</h4>
            <h1 className="text-center text-5xl font-bold mb-6">Log in</h1>
            
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
           
        </div>
        </>
    )
}
export default AdminLoginPage