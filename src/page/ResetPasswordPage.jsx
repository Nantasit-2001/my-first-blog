import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { X, UserRound, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LabelAndInput from "@/components/LabelAndInput"
import { useState } from "react"
import useForm from "@/hooks/useForm"
import AlertDialogBox from "@/components/AlertDialog"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
  } from "@/components/ui/alert-dialog";

function ResetPasswordPage () {
    const [alertResetPasswordState, setAlertResetPasswordState] = useState(false);
    const navigate = useNavigate();
    const form = useForm({CurrentPassword:"",NewPassword:"",Confirm:""},
    (values)=>{
        let textError = {}
        if(!values.CurrentPassword.trim())textError.CurrentPassword ="Password must be at least 6 characters"
        if(values.NewPassword.length < 6)textError.NewPassword="Password must be at least 6 characters"
        if(values.Confirm!==values.NewPassword) textError.Confirm="Password do not match"
    return textError
    }
    )
    
    
    function AlertResetPassword() {
        return (
          <AlertDialog open={alertResetPasswordState} onOpenChange={setAlertResetPasswordState}>
            <AlertDialogContent className="bg-white rounded-md pt-16 pb-12 max-w-[26rem] sm:max-w-lg flex flex-col items-center gap-6">
              <AlertDialogTitle className="text-3xl font-bold pb-2 text-center">Reset password</AlertDialogTitle>
              <AlertDialogTitle className="text-xl pb-2 text-center text-[#75716B] font-normal">Do you want to reset your password?</AlertDialogTitle>
             
              <div className="flex gap-2 ">
                <Button variant="whiteButton" className="rounded-full py-6 px-10 text-lg "onClick={()=>setAlertResetPasswordState(false)}>Cancel</Button>
                <Button variant="blackButton" className="rounded-full py-6 px-10 text-lg "onClick={()=>navigate("/")}>Reset</Button>
              </div>
              <AlertDialogCancel onClick={() => setAlertResetPasswordState(false)} className="absolute right-4 top-2 sm:top-4 p-1 border-none">
                <X className="h-6 w-6"/>
              </AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

    function changePassword (e){
        e.preventDefault();
        if(form.validateForm()){setAlertResetPasswordState(true)};
      }

    function ResetPassword(){
      setAlertResetPasswordState(false)
    }

    return(
        <>
        <NavBar/>
        <AlertDialogBox  title="Reset password"
                              content="Do you want to reset your password?"
                              buttonLeft="Cancel"
                              functionButtonLeft={()=>{setAlertResetPasswordState(false)}}
                              buttonRight="Reset "
                              functionButtonRight={()=>ResetPassword()}
                              alertState={alertResetPasswordState} 
                              setAlertState={setAlertResetPasswordState}
        />

        <section className="flex flex-col justify-center  md:mt-[52px]">
            <div className="flex flex-row w-full h-[48px] md:hidden ">
                <button className="w-1/3 flex justify-center items-center gap-3 font-medium px-4 py-3 text-[#43403B] "><UserRound/> Profile</button>
                <button className="w-2/3 flex items-center gap-3 px-4 font-medium text-[#726d64]"><RotateCcw color="#DAD6D1"/>Reset password</button>
            </div>    
            <div className="flex flex-col md:flex-row justify-center md:mt-[142px] sm:mx-4">
                <div className=" md:flex md:relative">
                    <div className="flex items-center py-6 pl-4 gap-3 
                                md:p-0 md:absolute top-[-90px] md:left-0  md:w-[500px] ">
                        <img className="w-10 h-10 rounded-[99px] md:w-15 md:h-15" src="d" alt="profile" />
                        <div className="flex flex-row w-full ">
                            <h4 className="w-2/5 md:w-auto truncate overflow-hidden whitespace-nowrap pr-4 border-r-2 text-xl font-bold text-[#75716B] ">Moodeng ja</h4>
                            <h4 className="w-3/5 md:w-auto pl-4 text-xl font-medium md:text-24px ">Reset password</h4>
                        </div>
                    </div> 

                    <div className="hidden md:flex flex-col md:w-[196px] md:h md:mr-12 ">
                        <button className=" flex justify-start items-center gap-3 font-medium px-4 py-3 text-[#43403B] "><UserRound/> Profile</button>
                        <button className=" flex items-center gap-3 px-4 py-3 font-medium text-[#726d64]"><RotateCcw color="#DAD6D1"/>Reset password</button>
                    </div>
                </div>
            
                <div className=" bg-[#EFEEEB] flex flex-col px-4 pt-6 pb-10 w-full 
                                md:max-h-[652px] md:max-w-[550px] md:mb-[150px] md:p-10 ">
                    <form onSubmit={(e)=>changePassword(e)}>
                    <div className="flex flex-col gap-6">
                        <LabelAndInput  label ="Current password" 
                                        id="CurrentPassword" 
                                        type="password" 
                                        form={form}/>
                        <LabelAndInput  label ="New password" 
                                        id="NewPassword" 
                                        type="password" 
                                        form={form}/>
                        <LabelAndInput  label ="Confirm new password" 
                                        id="Confirm" 
                                        type="password" 
                                        form={form}/>
                        </div>
                        <Button variant="blackButton" className=" px-10 py-6 mt-10 "
                            type="submit">Reset password</Button>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}
export default ResetPasswordPage