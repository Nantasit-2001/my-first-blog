import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { useState} from "react"
import { useNavigate } from "react-router-dom";
import LabelAndInput from "@/components/LabelAndInput";

function SignUpPage (){
    const [textInput,setTextInput] = useState({ 
        name:"",
        username:"",
        email:"",
        password:""
    });
    const [textInputError,setTextInputError] =useState({
        name:"",
        username:"",
        email:"",
        password:""
    })
    const stateInput ={textInput,setTextInput,textInputError,setTextInputError}

    const navigate = useNavigate();

    function checkInput (){
        let hasError = false
        const tempTextInputError = {name:"",username:"",email:"",password:""}
        if(textInput.name===""){tempTextInputError.name = "Name cannot be empty.";hasError=true}
        if(textInput.username===""){tempTextInputError.username ="Username cannot be empty.";hasError=true}
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(textInput.email))
                {tempTextInputError.email="Email must be a valid email"; hasError=true}
            else if(textInput.email===null){tempTextInputError.email="Email is already taken, Please try another email."}
            if (textInput.password.length < 6){tempTextInputError.password="Password must be at least 6 characters", hasError=true}
        setTextInputError({...tempTextInputError})
        return hasError
    }
    
    function registration (e) {
        e.preventDefault();
        const inputError =checkInput();
        if(inputError){
        }else{
            navigate("/sign-up/success")
        }
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
            
            <LabelAndInput  textLabel="Name" 
                            id="name" type="text" 
                            textPlaceholder="Full name" 
                            {...stateInput}/>
            
            <LabelAndInput  textLabel="Username" 
                            id="username" 
                            type="text" 
                            textPlaceholder="Username" 
                            {...stateInput}/> 
            
            <LabelAndInput  textLabel="Email"
                            id="email" 
                            type="email" 
                            textPlaceholder="Email" 
                            {...stateInput}/>
           
           <LabelAndInput   textLabel="Password" 
                            id="password" 
                            type="password" 
                            textPlaceholder="Password" 
                            {...stateInput}/>
            
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