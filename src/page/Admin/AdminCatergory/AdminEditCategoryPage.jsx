import LabelAndInput from "@/components/LabelAndInput"
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
import showToast from "@/utils/ShowToast";
import useForm from "@/hooks/useForm"
import { useNavigate } from "react-router-dom";
function AdminEditCategoryPage (){
    const navigate = useNavigate()
    const form =useForm({Category:""},
        (values)=>{
            let textErrors = {}
            if(values.Category==="")textErrors.Category = "Category name empty";
        return textErrors;
        }
    )
    function EditCategory (){
        if(form.validateForm()){
            navigate('/AdminCategoryPage')
            showToast("bg-[#12B279]","Edit category","Category has been successfully Edit.")
            }
        }
    return(
        <>
        <section className="flex flex-row ">
            <AdminResponsiveSidebar pageNow="Category management"/>
            <div className="flex flex-col w-full xl:ml-[335px] ">
                <AdminPageHeader    title="Edit Category"
                                    buttons={[{
                                              black:true,
                                              text:"Save",
                                              functionOnClick: EditCategory
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
export default AdminEditCategoryPage