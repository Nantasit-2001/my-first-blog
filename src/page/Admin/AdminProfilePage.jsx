import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "@/hooks/useForm";
import LabelAndInput from "@/components/LabelAndInput";
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
import AlertDialogBox from "@/components/AlertDialog";
import showToast from "@/utils/showToast";
import { Button } from "@/components/ui/button";

function AdminProfilePage (){
  const [alertCategory,setAlertCategory]=useState(false)
  const navigate = useNavigate();
  
  const form = useForm({name:"",username:"",email:"",bio:""},
    (values)=>{
        let textError = {}
        if(!values.name.trim())textError.name ="Name cannot be empty."
        if(!values.username.trim())textError.username="Username cannot be empty."
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)){textError.email = "Email must be a valid email"}
            else if(values.email===null){textError.email = "Email is already taken, Please try another email."}
        // if(values.length>120)textError.bio = "Bio cannot be empty"
    return textError
    }
    )

    function saveProfile (e) {
    e.preventDefault();
    if(form.validateForm()){showToast("bg-[#12B279]","Saved profile","Your profile has been successfully updated")}
    else showToast("bg-[#fb2c36]","Saved profile error","Your profile has been error updated");
  }
  return(
        <>
          <AlertDialogBox  title="Delete category"
                                      content="Do you want to delete this category?"
                                      buttonLeft="Cancel"
                                      functionButtonLeft={()=>{setAlertCategory(false)}}
                                      buttonRight="Delete"
                                      functionButtonRight={()=>deleteData() }
                                      alertState={alertCategory} 
                                      setAlertState={setAlertCategory}
          />
          <section className="flex flex-row">
            <AdminResponsiveSidebar pageNow="Profile"/>
            <div className="flex flex-col  w-full xl:ml-[335px] ">
                <AdminPageHeader    title="profile"
                                    buttons={[{
                                              black:true,
                                              text:"Save",
                                              name:"action",
                                              type:"submit",                                            
                                              form:"profile"
                                              }]}/>

                <div className="w-full px-10 sm:px-10 py-8 sm:py-1 ">
                    <div className="flex flex-col gap-6 justify-between items-center sm:mx-6 sm:my-4
                                sm:flex-row sm:justify-normal ">
                        <img className="w-25 h-25 rounded-[99px] bg-amber-900"  alt="profile" />
                        <Button variant={"whiteButton"} className="py-6 px-12 text-sm border-[#75716B]" >Upload profile picture</Button >
                    </div>
                </div>
                <hr className="border-[#DAD6D1] border-1 w-[100%] sm:w-[420px] sm:ml-16 my-4 sm:my-0"/>
                
                <form id="profile" onSubmit={(e)=>saveProfile(e)}>
                    <div className="flex flex-col gap-4 sm:gap-2 max-w-[560px] min-w-auto px-10 sm:px-15 py-5 ">
                        <LabelAndInput  label="Name"
                                        id="name" 
                                        type="text"
                                        // placeholder={{}} 
                                        form={form}/>

                        <LabelAndInput  label="Username"
                                        id="username" 
                                        type="text"
                                        // placeholder={{}}  
                                        form={form}/>

                        <LabelAndInput  label="Email"
                                        id="email" 
                                        type="email"
                                        // placeholder={{}}  
                                        form={form}/>
                    </div>
                    <div className="px-10 pb-8 sm:py-0 sm:px-15">
                        <LabelAndInput  label="Bio (max 120 latters)"
                                        id="bio" 
                                        elementInput="textarea"
                                        rows={4}
                                        placeholder="biography"
                                        form={form}/>
                    </div>
                </form>
            </div>
            
          </section>
        </>
    )
}
export default AdminProfilePage