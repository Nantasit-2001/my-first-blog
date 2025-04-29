import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import LabelAndInput from "@/components/LabelAndInput";
import useForm from "@/hooks/useForm";
import { registerUser } from "@/services/auth/auth.mjs";



function SignUpPage (){
    const navigate = useNavigate();
   
    const form = useForm({ name: "", username: "", email: "", password: "" },
        (values) => {
            let textErrors = {};
            if (!values.name.trim()) textErrors.name = "Name cannot be empty.";
            if (!values.username.trim()) textErrors.username = "Username cannot be empty.";
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {textErrors.email = "Email must be a valid email"}
                else if(values.email===null){textErrors.email = "Email is already taken, Please try another email."}
            if (values.password.length < 6) textErrors.password = "Password must be at least 6 characters";
            return textErrors;
        }
    );

    async function registration (e) {
        e.preventDefault();
        try{
        if (form.validateForm()) { 
           const res = await registerUser({...form.values,role:"user"})
           if (res){navigate("/sign-up/success");}
        }
    }catch(error){console.log("❌"+error)}
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
            <h1 className="flex justify-center text-4xl font-bold mb-6">Sign up</h1>
            
            <form   onSubmit={(e)=>registration(e)} 
                    className="flex flex-col items-center gap-6 md:gap-7">

                    <LabelAndInput label="Name"
                                   id="name" 
                                   type="text"
                                   form={form} />
                    
                    <LabelAndInput label="Username" 
                                   id="username" 
                                   type="text" 
                                   form={form} />
                    
                    <LabelAndInput label="Email"
                                   id="email"
                                   type="email" 
                                   form={form} />
                    
                    <LabelAndInput label="Password" 
                                   id="password" 
                                   type="password" 
                                   form={form} />
            
                <Button variant={"blackButton"} 
                    className="w-[140px] px-10 py-6 mb-6 lg:mt-3 lg:mb-10"
                    type="submit" 
                    >Sign up</Button>
            </form>
            
            <div className="flex justify-center gap-3 text-lg">
                <h5 className="text-[#75716B]">Already have an account?</h5>
                <span className="underline cursor-pointer"
                    onClick={()=>navigate("/login")}>Log in</span>
            </div>
        </div>
        
    </>
    )
}
export default SignUpPage