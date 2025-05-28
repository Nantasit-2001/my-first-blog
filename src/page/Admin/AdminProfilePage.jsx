import { useState,useRef,useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "@/hooks/useForm";
import LabelAndInput from "@/components/LabelAndInput";
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
import AlertDialogBox from "@/components/AlertDialog";
import showToast from "@/utils/showToast";
import { Button } from "@/components/ui/button";
import { axiosfetchBio,axiosUpdateBio } from "@/services/userService";
import { useAuth } from "@/context/Authcontext";
import { axiosResetProfile } from "@/services/userService";
function AdminProfilePage (){
//   const [alertCategory,setAlertCategory]=useState(false)     
    const [bioText,setBioText]=useState("")
    const [isLoading,setIsloading] =useState(false)
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const {user}=useAuth()
    const fileInputRef = useRef();
    
  const form = useForm({ image: "",name:"", username:"",bio:"",email:""},
    (values)=>{
        let textError = {}
        if(!values.name.trim())textError.name ="Name cannot be empty."
        if(!values.username.trim())textError.username="Username cannot be empty."
        if(values.length>300)textError.bio = "Bio cannot be more than 300 latters"
        if(values.length===0)textError.bio = "Bio cannot be empty"
    return textError
    }
    )

    useEffect(()=>{
        async function fetchBio (){
            const bioTemp = await axiosfetchBio();
            setBioText(bioTemp.data.bio)
            form.setValues(prev => ({
                name: user?.data?.name || "",
                username: user?.data?.username ?? "",
                email: user?.data?.email || "",
                image: user?.data?.profile_pic ?? "https://placehold.co/100x100?text=Profile",
                bio: bioTemp.data.bio}));
        }
        fetchBio(user)
    },[user])

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log(file)
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);

    form.setValues((prev) => ({
      ...prev,
      image: file,
    }));
  };

async function changeProfile(e) {
  e.preventDefault();
  if (form.validateForm()) {
    try {setIsloading(true)
      await axiosResetProfile({
        image: form.values.image,
        name: form.values.name,
        username: form.values.username,
      });
      await axiosUpdateBio(form.values.bio)
      showToast("bg-[#12B279]", "Saved profile", "Your profile has been successfully updated");
    } catch (e) {
      showToast("bg-[#fb2c36]", "Saved profile error", "Your profile has been error updated");
      if (e.response?.data?.field === "username") {
        form.setErrors((prev) => ({ ...prev, username: "Username already in use" }));
      }
      console.log(e);
    }finally{setIsloading(false)}
  }
}
  
  return(
        <>
          <section className="flex flex-row">
            <AdminResponsiveSidebar pageNow="Profile"/>
            <div className="flex flex-col  w-full xl:ml-[335px] ">
                <AdminPageHeader    title="profile"
                                    disablestyle={isLoading}
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
                        <img className="w-25 h-25 rounded-[99px] bg-amber-900" src={preview || user?.data?.profile_pic}  alt="profile" />
                        <Button variant={"whiteButton"} className="py-6 px-12 text-sm border-[#75716B]" onClick={() => fileInputRef.current.click()}>Upload profile picture</Button >
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange}className="hidden" />
                
                    </div>
                </div>
                <hr className="border-[#DAD6D1] border-1 w-[100%] sm:w-[420px] sm:ml-16 my-4 sm:my-0"/>
                
                <form id="profile" onSubmit={(e)=>changeProfile(e)}>
                    <div className="flex flex-col gap-4 sm:gap-2 max-w-[560px] min-w-auto px-10 sm:px-15 py-5 ">
                        <LabelAndInput  label="Name"
                                        id="name" 
                                        type="text"
                                        form={form}/>

                        <LabelAndInput  label="Username"
                                        id="username" 
                                        type="text"
                                        form={form}/>

                        <LabelAndInput  label="Email"
                                        id="email" 
                                        type="email"    
                                        disabled = {true}
                                        form={form}/>
                    </div>
                    <div className="px-10 pb-8 sm:py-0 sm:px-15">
                        <LabelAndInput  label="Bio (max 300 latters)"
                                        id="bio" 
                                        elementInput="textarea"
                                        rows={4}
                                        placeholder="biography"
                                        form={form}/>
                        <h4 className={`text-end pr-4 ${form.values.bio.length>300? "text-red-500" :"text-gray-400"}`}>{form.values.bio.length}/300</h4>
                    </div>
                </form>
            </div>
            
          </section>
        </>
    )
}
export default AdminProfilePage