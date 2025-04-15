import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import LabelAndInput from "@/components/LabelAndInput"
import AdminPageHeader from "@/components/AdminPageHeader";
import showToast from "@/utils/ShowToast";
import useForm from "@/hooks/useForm"
import { useNavigate } from "react-router-dom";
function AdminCreateCategoryPage (){
    const navigate = useNavigate()
    const form =useForm({Category:""},
        (values)=>{
            let textErrors = {}
            if(values.Category==="")textErrors.Category = "Category name empty";
        return textErrors;
        }
    )
    function CreateCategory (){
        if(form.validateForm()){navigate('/AdminCategoryPage')
        showToast("bg-[#12B279]","Create category","Category has been successfully created.")
        }
        else console.log("error")
    }
    return(
        <>
        <section className="flex flex-row ">
            <AdminResponsiveSidebar pageNow="Category management"/>
            <div className="flex flex-col w-full xl:ml-[335px] ">
                <AdminPageHeader    title="Create Category"
                                    buttons={[{
                                              black:true,
                                              text:"Save",
                                              functionOnClick: CreateCategory
                                            }]}
                />
                <div className=" py-10 px-15 flex w-full sm:max-w-[680px] " >
                    <LabelAndInput  label="Category name"
                                    id="Category" 
                                    type="text"
                                    form={form}/>
                </div>
            </div>
        </section>
        </>
    )
}
export default AdminCreateCategoryPage