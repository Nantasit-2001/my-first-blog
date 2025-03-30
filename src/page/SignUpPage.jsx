import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { useState} from "react"
import { useNavigate } from "react-router-dom";

const LabelAndInput = (({ textLabel, id, type, textPlaceholder,textInput,setTextInput,textInputError,setTextInputError}) => {
    return (
        <div className="w-full font-semibold">
            <label htmlFor={id} className="text-[#75716B] block p-1">{textLabel}</label>
            <input
                className={`p-3 pl-4 rounded-lg border-2 w-full bg-white  ${textInputError[id]===""?"text-black border-[#DAD6D1]":"text-[#EB5164] border-[#EB5164]"}`}
                id={id}
                type={type}
                placeholder={textPlaceholder}
                value={textInput[id]}
                onChange={(event) => {setTextInput((prev) => ({ ...prev, [id]:event.target.value}));
                                      setTextInputError((prev)=>({...prev,[id]:""}))}}
            />
            {textInputError[id]===""?undefined:<span className="text-sm text-[#EB5164] font-normal"> {textInputError[id]}</span>}
        </div>
    );
});

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
            <form onSubmit={(e)=>registration(e)} 
                className="flex flex-col items-center gap-6 md:gap-7">
            <LabelAndInput  textLabel="Name" id="name" type="text" textPlaceholder="Full name" 
                            textInput={textInput} setTextInput={setTextInput} 
                            textInputError={textInputError} setTextInputError={setTextInputError} />
            <LabelAndInput  textLabel="Username" id="username" type="text" textPlaceholder="Username" 
                            textInput={textInput} setTextInput={setTextInput} 
                            textInputError={textInputError} setTextInputError={setTextInputError}/> 
            <LabelAndInput  textLabel="Email" id="email" type="email" textPlaceholder="Email" 
                            textInput={textInput} setTextInput={setTextInput} 
                            textInputError={textInputError} setTextInputError={setTextInputError}/>
            <LabelAndInput  textLabel="Password" id="password" type="password" textPlaceholder="Password" 
                            textInput={textInput} setTextInput={setTextInput} 
                            textInputError={textInputError} setTextInputError={setTextInputError}/>
            <Button variant={"blackButton"} className="w-[140px] px-10 py-6 mb-6 lg:mt-3 lg:mb-10"
                    type="submit" >Sign up</Button>
            </form>
            <div className="flex justify-center gap-3 text-lg">
                <h5 className="text-[#75716B]">Already have an account?</h5>
                <span className="underline cursor-pointer">Log in</span>
            </div>
        </div>
        
    </>
    )
}
export default SignUpPage