import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import LabelAndInput from "@/components/LabelAndInput"
import { toast } from "sonner"
import { X, UserRound, RotateCcw } from "lucide-react"
function ProfilePage () {
    const [textInput,setTextInput] = useState({ 
        name:"",
        username:"",
    });
    const [textInputError,setTextInputError] =useState({
        name:"",
        username:"",
    })
    const stateInput = {textInput,setTextInput,textInputError,setTextInputError}
    // const [Ontoast,setToast] = useState(false)
    
    const picturrr = "data:image/png;base64,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"
    
    function showToast() {
        toast.custom((t) => (
            <div className="lg:w-[700px] md:w-[350px] bg-[#12B279] text-white p-6 rounded-lg relative pr-10 ">
                <div>
                    <h2 className="text-xl font-bold mb-2">Saved profile</h2>
                    <p className="text-sm">Your profile has been successfully updated</p>
                </div>
                <span onClick={() => toast.dismiss(t)}><X className="cursor-pointer absolute top-4 right-4" /></span>
            </div>
        ));
        
    }
    function MenuBar (){    
        return(
        <>
        <div className="flex flex-row w-full h-[48px]">
                <button className="w-1/3 flex justify-center items-center gap-3 font-medium px-4 py-3 text-[#43403B] "><UserRound/> Profile</button>
                <button className="w-2/3 flex items-center gap-3 px-4 font-medium text-[#726d64]"><RotateCcw color="#DAD6D1" RotateCcw={33} />Reset password</button>
        </div>
        </>)
    }
    
    return(
        <>
        <NavBar/>
        <section className="flex flex-col justify-center  md:mt-[52px]">
            
            <div className="flex flex-row w-full h-[48px] md:hidden ">
                <button className="w-1/3 flex justify-center items-center gap-3 font-medium px-4 py-3 text-[#43403B] "><UserRound/> Profile</button>
                <button className="w-2/3 flex items-center gap-3 px-4 font-medium text-[#726d64]"><RotateCcw color="#DAD6D1" RotateCcw={33} />Reset password</button>
            </div>    

        <div className="flex flex-col md:flex-row justify-center md:mt-[142px] sm:mx-4  ">
            <div className=" md:flex md:relative ">
                <div className="flex items-center py-6 pl-4 gap-3 
                            md:p-0 md:absolute top-[-90px] md:left-0  md:w-[300px]">
                    <img className="w-10 h-10 rounded-[99px] md:w-15 md:h-15" src={picturrr} alt="profile" />
                    <div className="flex flex-row ">
                        <h4 className="pr-4 border-r-2 text-xl font-bold text-[#75716B] md:text-24px">Moodeng ja</h4>
                        <h4 className="pl-4 text-xl font-medium md:text-24px">Profile</h4>
                    </div>
                </div> 

                <div className="hidden md:flex flex-col md:w-[196px] md:h md:mr-12 ">
                    <button className=" flex justify-start items-center gap-3 font-medium px-4 py-3 text-[#43403B] "><UserRound/> Profile</button>
                    <button className=" flex items-center gap-3 px-4 py-3 font-medium text-[#726d64]"><RotateCcw color="#DAD6D1" RotateCcw={33} />Reset password</button>
                </div>
            
            </div>
            
            <div className=" bg-[#EFEEEB] flex flex-col px-4 pt-6 pb-10 w-full 
                                md:max-h-[652px] md:max-w-[550px] md:mb-[150px] md:p-10 ">
                <div className="flex flex-col gap-6 justify-between items-center
                                md:flex-row md:justify-normal ">
                    <img className="w-30 h-30 rounded-[99px]" src={picturrr} alt="profile" />
                    <Button variant={"whiteButton"} className="py-6 px-10 text-sm border-[#75716B]
                                                               md:ml-7" >Upload profile picture</Button >
                </div>
                <hr className="my-6 border-[#DAD6D1] border-1 w-[full]"/>
                <div className="flex flex-col gap-6">
                <LabelAndInput  textLabel="Name" 
                            id="name" type="text" 
                            textPlaceholder="Full name" 
                            {...stateInput}/>
            
                <LabelAndInput  textLabel="Username" 
                            id="username" 
                            type="text" 
                            textPlaceholder="Username" 
                            {...stateInput}/> 
                
                    <div className="text-[#b1b0ac]">
                        <h4 className="p-1">Email</h4>
                        <h4 className="p-3 pl-4">moodeng.cute@gmail.com</h4>    
                    </div>
                </div>
                <Button variant="blackButton" className="w-30 px-10 py-6 mt-6 "
                        onClick={()=>showToast()}>Save</Button>
            </div>
        </div>
        </section>
        </>
    )
}
export default ProfilePage