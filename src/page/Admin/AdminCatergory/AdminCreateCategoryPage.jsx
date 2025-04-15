import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import LabelAndInput from "@/components/LabelAndInput"
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
                <div className="flex justify-center items-center h-[96px] w-full border-b-1 border-[#DAD6D1]">
                    <div className=" flex flex-row justify-between items-center h-full my-6 w-full ml-12 mr-2
                                    sm:ml-12 sm:mr-2
                                    lg:mx-15">

                        <h1 className="text-lg md:text-2xl font-bold
                                        ">Create Category</h1>               
                        <div className=" sm:flex flex-row gap-2">
                            <button className="bg-[#26231E] py-3 px-12 border-1 text-lg text-[#FFFFFF] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3 "
                                     onClick={()=>{CreateCategory()}} 
                                    >Save</button>
                        </div>
                    </div>    
                </div>
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