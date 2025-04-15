import SideBar from "@/components/AdminSideBar"
import SlideInPanel from "@/components/ui/SlideInPanel";
import LabelAndInput from "@/components/LabelAndInput"
import { ChevronRight } from 'lucide-react';
import useForm from "@/hooks/useForm"
import { useState } from "react";
import {Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,} from '@/components/ui/select'
function AdminCreateArticlePage (){
    const [isOpen, setIsOpen] = useState(false);
    const form =useForm({category:"",title:"",introduction:"",content:""},
        (values)=>{
            let textErrors = {}
            // if(!values.category==="")textErrors.category = "catergory cannot be empty";
            if(values.title==="")textErrors.title ="Title cannot be empty";
            if(values.introduction==="")textErrors.introduction ="Introduction cannot be empty";
            if(values.content==="")textErrors.content ="Content cannot be empty";
        return textErrors;
        }
    )

    function SelectCategory(){
        return(
                <Select 
                // onValueChange={(value)=>setSelectedCategory(value)}
                >
                <SelectTrigger className=" bg-white py-6 my-2 text-gray-500 text-base w-full sm:max-w-[480px] h-12">
                <SelectValue placeholder="Select category"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="text-gray-700" >
                    <SelectLabel className=" text-gray-400">Select Category</SelectLabel>
                                  {/* {categories.map((categorie)=> <SelectItem key={categorie} value={categorie}>{categorie}</SelectItem>)} */}
                  </SelectGroup>
                </SelectContent>
                </Select>
        )
    }

    function handlesubmit (e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const action = e.nativeEvent.submitter.value;
        if (action === "draft") {
            if(form.validateForm()){console.log("11111")}
            // handleSaveDraft(formData);
          } else if (action === "publish") {
            if(form.validateForm()){console.log("2222")}
            
            //handlePublish(formData);
          }
    }

    return(
        <>
        <section className="flex flex-row ">
            
            <div className=" top-8 left-3 fixed p-1 bg-gray-300 rounded-3xl 
                            xl:hidden">
                <ChevronRight className="cursor-pointer" onClick={() => setIsOpen(true)}/>
                {/* Slide-in Component */}
                <SlideInPanel pageNow="Article management" isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
            
            <div className="hidden xl:flex">
                <SideBar pageNow="Article management" />            
            </div>
            <div className="flex flex-col w-full xl:ml-[335px]">
                <div className="flex justify-center items-center h-[96px] w-full border-b-1 border-[#DAD6D1] ">
                    <div className=" flex flex-row justify-between items-center h-full my-6 w-full ml-12 mr-2
                                    sm:ml-12 sm:mr-2
                                    lg:mx-15">

                        <h1 className="text-lg md:text-2xl font-bold
                                        ">Create article</h1>               
                        <div className="flex flex-row gap-2">
                            <button className="bg-[#ffffff] border border-black text-[#000000] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3
                                                text-sm px-8 py-3 sm:text-lg sm:px-11"
                                    type="submit"
                                    form="CreateArticle" 
                                    name="action" 
                                    value="draft">
                                    <h4><span className="hidden sm:inline">Save and </span>Draft</h4>
                            </button>
                            <button className="bg-[#26231E] text-[#FFFFFF] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3
                                                text-sm px-8 py-3 sm:text-lg sm:px-12"
                                    type="submit"
                                    form="CreateArticle"
                                    name="action"
                                    value="publish">
                                    <h4><span className="hidden sm:inline">Save and </span>Publish</h4>
                            </button>
                        </div>
                    </div>
                </div>
                
                <form   className=" py-10 px-15 flex flex-col gap-6" 
                        id="CreateArticle"
                        onSubmit={(e)=>{handlesubmit(e)}}>
                    <div className="">
                        <h4 className="text-center lg:text-start">Thumbnail image</h4>
                        <div className="flex flex-col lg:flex-row sm:gap-6 items-end">
                        <img    src="eerror" // รูปที่อาจโหลดไม่ได้
                                alt="Image"
                                className="w-full lg:w-[460px] h-[260px]"
                                onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/460x260?text=No+Image";}}/>
                        <button className="bg-[#ffffff] h-12 w-full lg:max-w-[300px]  border-1 border-black text-lg text-[#000000] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer "
                                    // onClick={()=>{navigate('/AdminCreateArticlePage')}}>
                                    >Upload thumbnail image</button>
                        </div>
                    </div> 
                    <div className='w-full mt-4'>
                        <label className="text-lg text-gray-500 font-normal">Category</label>
                        
                        <SelectCategory/>
                    </div>

                    <div  className="flex flex-col text-lg text-gray-500 gap-2 w-full sm:max-w-[480px]">
                        <label className="w-[110px] text-gray-500  cursor-not-allowed" htmlFor="inputThompson">Author name</label>
                        <input  type="text" 
                            id="inputThompson" 
                            placeholder="Thompson P." 
                            nameclass="bg-gray-200 text-gray-500 py-2 px-4 rounded  pointer-events-none " 
                            disabled/>
                    </div>
                    
                    <div>
                        <LabelAndInput  label="Title"
                                        id="title" 
                                        type="text" 
                                        placeholder="Article title"
                                        form={form}/>
                    </div>

                    <div >
                        <LabelAndInput  label="Introduction (max 120 letters)"
                                        id="introduction" 
                                        elementInput="textarea"
                                        rows="5" 
                                        placeholder="Article title"
                                        form={form}/>
                    </div>
                    
                    <div >
                        <LabelAndInput  label="Content"
                                        id="content" 
                                        elementInput="textarea"
                                        rows="24" 
                                        placeholder="Content"
                                        form={form}/>
                    </div>

                </form>
            </div>
        </section>
        </>
    )
}
export default AdminCreateArticlePage