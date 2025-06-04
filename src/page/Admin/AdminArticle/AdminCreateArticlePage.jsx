import LabelAndInput from "@/components/LabelAndInput"
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
import useForm from "@/hooks/useForm"
import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosGetUser } from "@/services/userService";
import { axiosgetCategory } from "@/services/categoryService";
import { axiosPostArticle } from "@/services/articleService";
import showToast from "@/utils/showToast";
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
    const navigate = useNavigate();
     const fileInputRef = useRef();
    const [authorName, setAuthorName] = useState("");
    const [article, setArticle] = useState({});  
    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const form =useForm({image:"",category:"",title:"",description:"",content:""},
        (values)=>{
            let textErrors = {}
            if(values.title==="")textErrors.title = "title empty";
            if(values.description==="")textErrors.description = "Introduction empty";
            if(values.description.length > 120) textErrors.description = "max 120 latters";
            if(values.content==="")textErrors.content = "Content empty";
            if(values.category==="")textErrors.category = "Please add a category";
            if(values.image==="")textErrors.image = "Please add a picture.";
        return textErrors;
        }
    )

useEffect(() => {
  async function fetchCategory() {
    let categoriesTemp = await axiosgetCategory();
    setCategories(categoriesTemp.data);
  }
  async function fetchUser() {
    const dataUser = await axiosGetUser();
    setAuthorName(dataUser.data.name || "");
  }
  fetchCategory()
  fetchUser();
}, []);

    function SelectCategory({error}){
        return(
            <>
                <Select
                value={form.values.category}
                onValueChange={(value) => {form.setValues({ ...form.values, category: value });{form.setErrors({...form.errors,category:""})};}}
            >
                <SelectTrigger className=" bg-white py-6 my-2 text-gray-500 text-base w-full sm:max-w-[480px] h-12">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className="text-gray-700" >
                        <SelectLabel className=" text-gray-400">Select Category</SelectLabel>
                        {categories.map((categorie) => (
                            <SelectItem key={categorie.name} value={categorie.name}>{categorie.name}</SelectItem>
                        ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {error && (
                        <p className="text-red-500 text-sm mt-1">{form.errors.category}</p>)}
            </>
        )
    }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    {form.setErrors({...form.errors,image:""})}
    setPreview(previewURL);

    form.setValues((prev) => ({
      ...prev,
      image: file,
    }));
  };


    async function draft(event){
        event.preventDefault();
        try{
        setIsLoading(true)
        if(form.validateForm()){
            const selectedCategory = categories.find(cat => cat.name === form.values.category);
            const postArticle = {
                ...form.values,
                category_id: selectedCategory ? selectedCategory.id : ""
            };
            await axiosPostArticle(postArticle, "draft");
            navigate('/AdminArticlePage');
            showToast("bg-[#12B279]", "Create article and saved as draft", "You can publish article later");
        }
        }catch(error){console.error("Error updating article:", error);
            showToast("bg-[#FF0000]", "Error post article", "There was an error post the article. Please try again.");
        }finally{setIsLoading(false)}
    }
    async function publish(event){
        event.preventDefault();
        try{setIsLoading(true)
        if(form.validateForm()){
            const selectedCategory = categories.find(cat => cat.name === form.values.category);
            const postArticle = {
                ...form.values,
                category_id: selectedCategory ? selectedCategory.id : ""
            };
            await axiosPostArticle(postArticle, "publish");
            navigate('/AdminArticlePage');
            showToast("bg-[#12B279]", "Create article and published", "You can see article in the list");
        }
        }catch(error){console.error("Error updating article:", error);
            showToast("bg-[#FF0000]", "Error post article", "There was an error post the article. Please try again.");
        }finally{setIsLoading(false)}
    }
    
    return(
        <>
        <section className="flex flex-row ">
            <AdminResponsiveSidebar pageNow="Article management"/>
            <div className="flex flex-col w-full xl:ml-[335px]">
                
                <AdminPageHeader    title="Create article"
                                    disablestyle={isLoading}
                                    buttons={[{
                                                black:false,
                                                text:"Draft",
                                                value:"draft",
                                                name:"action",
                                                type:"submit",                                            
                                                form:"CreateArticle",
                                                textHiddenMobile:"Save and ",
                                                functionOnClick: draft
                                              },
                                                {black: true,
                                                text:"Publish" ,
                                                value:"publish",
                                                name:"action",
                                                type:"submit",
                                                form:"CreateArticle",
                                                textHiddenMobile:"Save and ",
                                                functionOnClick: publish
                                              },
                                    ]}/>

                <div className=" py-10 px-15 flex flex-col gap-6" >
                    <div className="">
                        <h4 className="text-center lg:text-start ">Thumbnail image</h4>
                        <div className="flex flex-col lg:flex-row sm:gap-6 items-end">
                        <img    src={preview ||"https://placehold.co/460x260?text=No+Image" }
                                alt="Image"
                                className="w-full lg:w-[460px] h-[260px] rounded-[10px]"
                                onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/460x260?text=No+Image";}}/>
                        <button className="bg-[#ffffff] h-12 w-full lg:max-w-[300px]  border-1 border-black text-lg text-[#000000] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer "
                                    onClick={() => fileInputRef.current.click()}
                                    >Upload thumbnail image</button>
                             <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                            {form.errors.image && (
                                <p className="text-red-500 text-sm mt-1">{form.errors.image}</p>)}
                    </div> 
                    <div className='w-full mt-4'>
                        <label className="text-lg text-gray-500 font-normal">Category</label>
                        <SelectCategory error={form.errors.category}/>
                        
                    </div>

                    <div  className="flex flex-col text-lg text-gray-500 gap-2 w-full sm:max-w-[480px]">
                        <label className="w-[110px] text-gray-500  cursor-not-allowed" htmlFor="inputThompson">Author name</label>
                        <input  type="text" 
                            id="inputThompson" 
                            placeholder={authorName || ""} 
                            className="bg-gray-200 text-gray-500 py-2 px-4 rounded  pointer-events-none " 
                            disabled/>
                    </div>
                    
                    <div>
                        <LabelAndInput  label="Title"
                                        id="title" 
                                        type="text" 
                                        placeholder="Article title"
                                        form={form}/>
                    </div>
                    <div className=" flex flex-col items-end ">
                        <LabelAndInput  label="Introduction (max 120 latters)"
                                        id="description" 
                                        elementInput="textarea"
                                        rows={4}
                                        placeholder="Introduction"
                                        form={form}/>
                        <span className="text-gray-400">{form.values.description.length}/120</span>
                    </div>
                    <div className=" flex flex-col ">
                        <LabelAndInput  label="Content"
                                        id="content" 
                                        elementInput="textarea"
                                        rows={22}
                                        placeholder="Content"
                                        form={form}/>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default AdminCreateArticlePage