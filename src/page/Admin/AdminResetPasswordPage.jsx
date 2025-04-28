import LabelAndInput from "@/components/LabelAndInput"
import useForm from "@/hooks/useForm"
import { useState } from "react";
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
function AdminResetPasswordPage (){
    const [alertResetPasswordState, setAlertResetPasswordState] = useState(false);
    const form = useForm({CurrentPassword:"",NewPassword:"",Confirm:""},
        (values)=>{
            let textError = {}
            if(!values.CurrentPassword.trim())textError.CurrentPassword ="Password must be at least 6 characters"
            if(values.NewPassword.length < 6)textError.NewPassword="Password must be at least 6 characters"
            if(values.Confirm!==values.NewPassword) textError.Confirm="Password do not match"
        return textError
        }
    )
    
    function changePassword (e){
        e.preventDefault();
        if(form.validateForm()){console.log("dwdwd")};
      }

    return(
        <>
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
                        </form>
                    </div>
            </div>
        </section>
        </>
    )
}
export default AdminResetPasswordPage