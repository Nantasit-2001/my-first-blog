import LabelAndInput from "@/components/LabelAndInput"
import useForm from "@/hooks/useForm"
import { useState } from "react";
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
import { axiosResetPassword } from "@/services/userService";
import AlertDialogBox from "@/components/AlertDialog";
import showToast from "@/utils/showToast"
function AdminResetPasswordPage (){
    const [alertResetPasswordState, setAlertResetPasswordState] = useState(false);
    const [loadingSend,setLoadingSend]=useState(false);
    const form = useForm({currentPassword:"",newPassword:"",confirm:""},
        (values)=>{
            let textError = {}
            if(!values.currentPassword.trim())textError.currentPassword ="Password must be at least 6 characters"
            if(values.newPassword.length < 6)textError.newPassword="Password must be at least 6 characters"
            if(values.confirm!==values.newPassword) textError.confirm="Password do not match"
        return textError
        }
    )
    
    function changePassword (e){
        e.preventDefault();
        if(form.validateForm()){
            setAlertResetPasswordState(true)
        };
      }
      async function ResetPassword() {
        try {
          setLoadingSend(true)
          setAlertResetPasswordState(false);
          console.log(form.values.currentPassword,form.values.newPassword,"33--------------------")
          await axiosResetPassword({ currentPassword: form.values.currentPassword,newPassword: form.values.newPassword,});
          // navigate("/");
          showToast("bg-[#12B279]", "Reset Password", "Your password has been successfully updated");
        } catch (err) {
          if (err.response.data?.field === "currentPassword"){
            showToast("bg-[#fb2c36]", "Reset Password", "Current password is incorrect.");
            form.setErrors((prev) => ({ ...prev, currentPassword: "Password is incorrect." }));
          } else {
            console.error("❌ Unknown error:", err);
            showToast("bg-[#fb2c36]", "Reset Password error", "Please verify the accuracy or try again at another time. ");
          }
        }finally{setLoadingSend(false)}
      }

    return(
        <>
        <AlertDialogBox       title="Reset password Admin"
                              content="Do you want to reset your password?"
                              buttonLeft="Cancel"
                              functionButtonLeft={()=>{setAlertResetPasswordState(false)}}
                              buttonRight="Reset "
                              functionButtonRight={()=>ResetPassword()}
                              alertState={alertResetPasswordState} 
                              setAlertState={setAlertResetPasswordState}
        />
        
        <section className="flex flex-row ">
        <AdminResponsiveSidebar pageNow="Reset password"/>
            <div className="flex flex-col w-full xl:ml-[335px]">
                <AdminPageHeader    title="Reset password"
                                    buttons={[{
                                              black:true,
                                              text:"Reset password",
                                              name:"action",
                                              type:"submit",                                            
                                              form:"ResetPassword"
                                            }]}
                />
                <div className="flex flex-col gap-4 sm:gap-2 max-w-[560px] min-w-auto px-10 sm:px-15 py-10 ">
                    <form onSubmit={(e)=>changePassword(e)} id="ResetPassword">
                            <div className="flex flex-col gap-6">
                                <LabelAndInput  label ="Current password" 
                                                id="currentPassword" 
                                                type="password" 
                                                form={form}/>
                                <LabelAndInput  label ="New password" 
                                                id="newPassword" 
                                                type="password" 
                                                form={form}/>
                                <LabelAndInput  label ="Confirm new password" 
                                                id="confirm" 
                                                type="password" 
                                                form={form}/>
                            </div>
                        </form>
                    </div>
            </div>
        </section>
        </>
    )
}
export default AdminResetPasswordPage