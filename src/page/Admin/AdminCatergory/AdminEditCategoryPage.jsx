import LabelAndInput from "@/components/LabelAndInput"
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
import showToast from "@/utils/showToast";
import useForm from "@/hooks/useForm"
import { useNavigate,useParams } from "react-router-dom";
import { axiosUpdateCategory } from "@/services/categoryService";

function AdminEditCategoryPage (){        
    const { categoryId } = useParams();
    const navigate = useNavigate()
    const form =useForm({Category:categoryId},
        (values)=>{
            let textErrors = {}
            if(values.Category==="")textErrors.Category = "Category name empty";
        return textErrors;
        }
    )
    async function EditCategory (){
        if(form.validateForm()){
            await axiosUpdateCategory(categoryId,form.values.Category)
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