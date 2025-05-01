import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { X, UserRound, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LabelAndInput from "@/components/LabelAndInput"
import { useState } from "react"
import useForm from "@/hooks/useForm"
import AlertDialogBox from "@/components/AlertDialog"
import { axiosResetPassword } from "@/services/userService"

function ResetPasswordPage () {
    const [alertResetPasswordState, setAlertResetPasswordState] = useState(false);
    const navigate = useNavigate();
    const form = useForm({currentPassword:"",newPassword:"",confirm:""},
    (values)=>{
        let textError = {}
        if(!values.currentPassword.trim())textError.currentPassword ="Password must be at least 6 characters"
        if(values.newPassword.length < 6)textError.newPassword="Password must be at least 6 characters"
        if(values.confirm!==values.newPassword) textError.confirm="Password do not match"
    return textError
    }
    )

      async function changePassword(e) {
        e.preventDefault();
        if (form.validateForm()) {
          setAlertResetPasswordState(true);
        }
      }

      async function ResetPassword() {
        try {
          setAlertResetPasswordState(false);
          await axiosResetPassword({ currentPassword: form.values.currentPassword,newPassword: form.values.newPassword,});
          navigate("/");
        } catch (err) {
          if (err.response.data?.field === "currentPassword"){
            form.setErrors((prev) => ({ ...prev, currentPassword: "Password is incorrect." }));
          } else {
            console.error("❌ Unknown error:", err);
          }
        }
      }
    return(
        <>
        <NavBar/>
        <AlertDialogBox       title="Reset password"
                              content="Do you want to reset your password?"
                              buttonLeft="Cancel"
                              functionButtonLeft={()=>{setAlertResetPasswordState(false)}}
                              buttonRight="Reset "
                              functionButtonRight={()=>ResetPassword()}
                              alertState={alertResetPasswordState} 
                              setAlertState={setAlertResetPasswordState}
        />

        <section className="flex flex-col justify-center ">
            <div className="flex flex-row w-full md:hidden">
                <button onClick={()=>navigate("/Profile")} className="w-1/4 flex justify-center items-center gap-3 font-medium px-4 py-3  text-[#726d64] hover:text-[#43403B] "><UserRound/> Profile</button>
                <button className="w-2/4 flex items-center gap-3 px-6 font-medium text-[#43403B]"><RotateCcw color="#43403B"/>Reset password</button>
            </div>    
            <div className="flex flex-col md:flex-row justify-center md:mt-[120px] sm:mx-4">
                <div className=" md:flex md:relative ">
                    <div className="flex items-center py-6 pl-4 gap-3 
                                md:p-0 md:absolute top-[-90px] md:left-0  md:w-[500px] ">
                      <img className="w-10 h-10 rounded-[99px] md:w-15 md:h-15" src="d" alt="profile" />
                      <div className="flex flex-row w-full ">
                          <h4 className="pr-4 border-r-2 text-xl font-bold text-[#75716B] md:text-24px">Moodeng ja</h4>
                          <h4 className="w-3/5 md:w-auto pl-4 text-xl font-medium md:text-24px ">Reset password</h4>
                      </div>
                    </div> 

                    <div className="hidden md:flex flex-col w-auto pr-3 h-auto">
                        <button onClick={()=>navigate("/Profile")} className=" flex justify-start items-center gap-3 font-medium px-4 py-3 text-[#726d64] hover:text-[#43403B] "><UserRound/> Profile</button>
                        <button className=" flex items-center gap-3 px-4 py-3 font-medium  text-[#43403B]"><RotateCcw color="#43404B"/>Reset password</button>
                    </div>
                </div>
            
                <div className=" bg-[#EFEEEB] flex flex-col px-4 pt-6 pb-10 w-full 
                                sm:rounded-lg md:max-h-[652px] md:max-w-[550px] md:p-10 ">
                    <form onSubmit={(e)=>changePassword(e)}>
                    <div className="flex flex-col gap-6">
                        <LabelAndInput  label ="Current password" 
                                        id="currentPassword" 
                                        type="password" 
                                        form={form}/>
                        <LabelAndInput  label ="New password" 
                                        id="newPassword" 
                                        type="password" 
                                        form={form}/>
                        <LabelAndInput  label ="confirm new password" 
                                        id="confirm" 
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