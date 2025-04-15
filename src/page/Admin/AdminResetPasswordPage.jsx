import LabelAndInput from "@/components/LabelAndInput"
import useForm from "@/hooks/useForm"
import { useState } from "react";
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
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
                <div className="flex justify-center items-center h-[96px] w-full border-b-1 border-[#DAD6D1] ">
                    <div className=" flex flex-row justify-between items-center h-full my-6 w-full ml-12 mr-2
                                    sm:ml-12 sm:mr-2
                                    lg:mx-15">

                        <h1 className="text-lg md:text-2xl font-bold
                                        ">Reset password</h1>
                        <button className="bg-[#26231E] py-2 px-6 sm:py-3 sm:px-12 border-1 text-lg text-[#FFFFFF] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3 "
                        type="submit" form="ResetPassword">Reset password</button>               
                    </div>
                </div>
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