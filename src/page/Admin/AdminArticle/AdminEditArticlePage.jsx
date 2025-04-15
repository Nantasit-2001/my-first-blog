import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import LabelAndInput from "@/components/LabelAndInput";
import AlertDialogBox from "@/components/AlertDialog";
import AdminPageHeader from "@/components/AdminPageHeader";
import { Trash2 } from 'lucide-react';
import useForm from "@/hooks/useForm"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
function AdminEditArticlePage (){
    const navigate = useNavigate();
    const [alertDeleteArticleState,setAlertDeleteArticleState]=useState(false)
    const form =useForm({title:""},
        (values)=>{
            let textErrors = {}
            if(values.title="")textErrors.title = "title empty";
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

    function deleteData(){
        setAlertDeleteArticleState(false)
        navigate("/AdminArticlePage")
    }

    return(
        <>
        <AlertDialogBox  title="Delete article"
                              content="Do you want to delete this article?"
                              buttonLeft="Cancel"
                              functionButtonLeft={()=>{setAlertDeleteArticleState(false)}}
                              buttonRight="Delete"
                              functionButtonRight={()=>deleteData()}
                              alertState={alertDeleteArticleState} 
                              setAlertState={setAlertDeleteArticleState}
        />
        <section className="flex flex-row ">
            <AdminResponsiveSidebar pageNow="Article management"/>
            <div className="flex flex-col w-full xl:ml-[335px]">
                <AdminPageHeader    title="Edit article"
                                    buttons={[{
                                                black:false,
                                                text:"Draft",
                                                value:"draft",
                                                name:"action",
                                                type:"submit",                                            
                                                form:"CreateArticle",
                                                textHiddenMobile:"Save and ",
                                              },
                                                {black: true,
                                                text:"Publish" ,
                                                value:"publish",
                                                name:"action",
                                                type:"submit",
                                                form:"CreateArticle",
                                                textHiddenMobile:"Save and ",
                                                
                                              },
                                    ]}/>
                                    
                <div className=" py-10 px-15 flex flex-col gap-6">
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
                            class="bg-gray-200 text-gray-500 py-2 px-4 rounded  pointer-events-none " 
                            disabled/>
                    </div>
                    
                    <div>
                        <LabelAndInput  label="Title"
                                        id="title" 
                                        type="text" 
                                        placeholder="Article title"
                                        form={form}/>
                    </div>

                    <div className=" flex flex-col ">
                        <label htmlFor="Introduction" className="text-gray-600 block p-1  font-semibold">Introduction (max 120 letters)</label>
                        <textarea id="Introduction" row="4"cols="50" maxLength={120} placeholder="Introduction" className="text-4 rounded-lg border-2 p-3 pl-4 h-[125px]"></textarea>
                    </div>
                    
                    <div className=" flex flex-col ">
                        <label htmlFor="Content" className="text-gray-600 block p-1  font-semibold">Introduction (max 120 letters)</label>
                        <textarea id="Content" cols="50" placeholder="Content" className="rounded-lg border-2 p-3 pl-4 h-[572px]"></textarea>
                    </div>
                    
                    <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={()=>setAlertDeleteArticleState(true)}>
                        <Trash2 size={18}/> <u>Delete article</u>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default AdminEditArticlePage