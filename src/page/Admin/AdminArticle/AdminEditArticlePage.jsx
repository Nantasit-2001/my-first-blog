import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import LabelAndInput from "@/components/LabelAndInput";
import AlertDialogBox from "@/components/AlertDialog";
import AdminPageHeader from "@/components/AdminPageHeader";
import { Trash2 } from 'lucide-react';
import useForm from "@/hooks/useForm"
import { useState,useEffect,useRef } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { axiosgetArticle,axiosUpdateArticle,axiosDeleteArticle } from "@/services/articleService";
import { axiosgetCategory } from "@/services/categoryService";
import showToast from "@/utils/showToast";
import { axiosGetUser } from "@/services/userService";
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
    const fileInputRef = useRef();
    const {postId} = useParams();
    const navigate = useNavigate();
    const [authorName, setAuthorName] = useState("");
    const [preview, setPreview] = useState(null);
    const [article, setArticle] = useState({});     
    const [categories, setCategories] = useState([]); 
    const [alertDeleteArticleState,setAlertDeleteArticleState]=useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const form =useForm({image:"",category:"",title:"",description:"",content:""},
        (values)=>{
            let textErrors = {}
            if(values.title==="")textErrors.title = "title empty";
            if(values.description==="")textErrors.description = "Introduction empty";
            if(values.content==="")textErrors.content = "Content empty";
            if(values.category===0)textErrors.category = "Category empty";
        return textErrors;
        }
    )

useEffect(() => {
  async function fetchArticle() {
    const dataArticale = await axiosgetArticle(postId);
    let categoriesTemp = await axiosgetCategory();
    const articleData = dataArticale.data;
    setCategories(categoriesTemp.data);
    setArticle(articleData);
    
    form.setValues({
      title: articleData.title || "",
      description: articleData.description || "",
      content: articleData.content || "",
      category: articleData.category_name || "",
      image: articleData.image || "",
    });
  }
  async function fetchUser() {
    const dataUser = await axiosGetUser();
    setAuthorName(dataUser.data.name || "");
  }
  fetchArticle();
  fetchUser();
}, [postId]);


    function SelectCategory() {
        return (
            <Select
                value={form.values.category}
                onValueChange={(value) => form.setValues({ ...form.values, category: value })}
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
        )
    }


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);

    form.setValues((prev) => ({
      ...prev,
      image: file,
    }));
  };

   async function deleteData(){
        setIsLoading(true)
       await axiosDeleteArticle(postId);
       setAlertDeleteArticleState(false)
        navigate("/AdminArticlePage")
        showToast("bg-[#12B279]", "Delete successfully", "");
        setIsLoading(false)
    }

    async function draft (event){
        event.preventDefault();
        try{setIsLoading(true);
        if(form.validateForm()){
            const selectedCategory = categories.find(cat => cat.name === form.values.category);
            const updatedArticle = {
                ...form.values,
                category_id: selectedCategory ? selectedCategory.id : ""
            };
            await axiosUpdateArticle(postId, updatedArticle,"draft",article.image);
            navigate('/AdminArticlePage');
            showToast("bg-[#12B279]", "update article and saved as draft", "You can publish article later");
        }
        }catch(error){console.error("Error updating article:", error);
            showToast("bg-[#FF0000]", "Error updating article", "There was an error updating the article. Please try again.");
        }finally{
            setIsLoading(false);
        }
    }

        async function publish (event){
        event.preventDefault();
        try{setIsLoading(true);
        if(form.validateForm()){
            const selectedCategory = categories.find(cat => cat.name === form.values.category);
            const updatedArticle = {
                ...form.values,
                category_id: selectedCategory ? selectedCategory.id : ""
            };
            await axiosUpdateArticle(postId, updatedArticle,"publish",article.image);
            navigate('/AdminArticlePage');
            showToast("bg-[#12B279]","update article and saved as publish","Your article has been successfully published")
        }
        }catch(error){console.error("Error updating article:", error);
            showToast("bg-[#FF0000]", "Error updating article", "There was an error updating the article. Please try again.");
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <>
        <AlertDialogBox  title="Delete article"
                              content="Do you want to delete this article?"
                              buttonLeft="Cancel"
                              functionButtonLeft={()=>{setAlertDeleteArticleState(false)}}
                              buttonRight="Delete"
                              disable = {isLoading}
                              functionButtonRight={()=>deleteData()}
                              alertState={alertDeleteArticleState} 
                              setAlertState={setAlertDeleteArticleState}
        />
        <section className="flex flex-row ">
            <AdminResponsiveSidebar pageNow="Article management"/>
            <div className="flex flex-col w-full xl:ml-[335px]">
                <AdminPageHeader    title="Edit article"
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
                                    
                <div className=" py-10 px-15 flex flex-col gap-6">
                    <div className="">
                        <h4 className="text-center lg:text-start ">Thumbnail image</h4>
                        <div className="flex flex-col lg:flex-row sm:gap-6 items-end">
                            <img    
                                src={preview || article.image}
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
                    </div> 
                    <div className='w-full mt-4'>
                        <label className="text-lg text-gray-500 font-normal">Category</label>
                        <SelectCategory/>
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
                    <div className=" flex flex-col ">
                        <LabelAndInput  label="Introduction (max 120 latters)"
                                        id="description" 
                                        elementInput="textarea"
                                        rows={4}
                                        placeholder="Introduction"
                                        form={form}/>
                    </div>
                    <div className=" flex flex-col ">
                        <LabelAndInput  label="Content"
                                        id="content" 
                                        elementInput="textarea"
                                        rows={22}
                                        placeholder="Content"
                                        form={form}/>
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