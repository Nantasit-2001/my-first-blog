import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertDialogBox from "@/components/AlertDialog";
import AdminPageHeader from "@/components/AdminPageHeader";
import {Pencil,Search,Trash2} from 'lucide-react';
import { Input } from "@/components/ui/input";
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import showToast from "@/utils/showToast";
import { axiosgetArticleInfo,axiosDeleteArticle } from "@/services/articleService";
import { axiosgetCategory } from "@/services/categoryService";
import {Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,} from '@/components/ui/select.jsx'
import { Item } from "@radix-ui/react-dropdown-menu";

function AdminArticlePage (){

  const [alertDeleteArticleState,setAlertDeleteArticleState]=useState(false)
  const [objSearchKeyword, setObjSearchKeyword] = useState({searchInput: "",status:"all",category:"all"});
  const [allArticle, setAllArticle] = useState([]);      // เก็บข้อมูลหมวดหมู่ทั้งหมด
  const [valueArticle, setValueArticle] = useState("");
  const [dataArticle, setDataArticle] = useState([]);        // ข้อมูลหมวดหมู่ที่จะแสดง (filtered)
  const [allCategories, setAllCategories] = useState([]); 
  const [refacer, setReface] = useState(false);
  const [isLoading,setIsloading] = useState(false)
  const statusArr = ["all","draft","publish"];

 useEffect(() => {
    async function fetchArticle() {
      const ArticleTemp = await axiosgetArticleInfo();
      let categoriesTemp = await axiosgetCategory();
     
      setAllArticle(ArticleTemp.data);
      setDataArticle(ArticleTemp.data); 
      categoriesTemp = categoriesTemp.data.map((value) => value.name);
      setAllCategories(['all',...categoriesTemp]);
    }
    fetchArticle();
  }, [refacer]);

  useEffect(() => {
    let searchKeyword = allArticle;
    const keyword = objSearchKeyword.searchInput.toLowerCase().trim();
    if( objSearchKeyword.status!=="all"){
      searchKeyword = searchKeyword.filter((item) => item.status_name === objSearchKeyword.status);
    }
    if(objSearchKeyword.category!=="all"){
      searchKeyword = searchKeyword.filter((item) => item.category_name === objSearchKeyword.category);
    }
    if (keyword !== "") {
      searchKeyword=searchKeyword.filter((articale)=>(articale.title).toLowerCase().includes(keyword));
    }
    setDataArticle(searchKeyword);
  }, [objSearchKeyword, allArticle]);

  const navigate = useNavigate();
  
  async function deleteData(){
    setIsloading(true)
    await axiosDeleteArticle(valueArticle);
    setReface(!refacer);
    setAlertDeleteArticleState(false)
    showToast("bg-[#12B279]", "Delete successfully", "");
    setIsloading(false)
  }

  function creatAerticle (){
    navigate('/AdminCreateArticlePage')
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
          <section className="flex flex-row">
          <AdminResponsiveSidebar pageNow="Article management" />
          <div className="flex flex-col  w-full xl:ml-[335px]">
              <AdminPageHeader    title="Article management"
                                    buttons={[{
                                              black:true,
                                              plus:true,
                                              text:"Create article",
                                              functionOnClick: creatAerticle,
                                            },]}
              />
            <div className="w-full px-10 sm:px-15 py-5 ">
              <div className=" flex justify-between my-5" >
                {/* search */}
                <div className="w-[360px] relative z-0">
                    <Input  type="search"
                            placeholder="search" 
                          value={objSearchKeyword.searchInput||""}
                          onChange={(event)=>setObjSearchKeyword((item)=>({...item,searchInput:event.target.value}))}
                            className=" bg-white py-6 text-xl border-2 pl-10 
                                      sm:text-base lg:text-xl "/>
                      <Search color="gray" 
                              strokeWidth={2} 
                              className="absolute size-5 inset-y-4 left-3 
                                        sm:size-4 lg:size-5"/>
                  </div>

                <div className="flex flex-row justify-between gap-4 w-[416px] ">
                  <div className='w-full'>
                    <Select 
                    onValueChange={(value)=>setObjSearchKeyword(item=>({...item,status:value}))}
                    >
                      <SelectTrigger className="w-full bg-white py-6 text-gray-500 text-base ">
                      <SelectValue placeholder="Status"/></SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="text-gray-700" >
                          <SelectLabel className=" text-gray-400">Select status</SelectLabel>
                              {statusArr.map((status)=> <SelectItem key={status} value={status}>{status}</SelectItem>)}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='w-full'>
                    <Select 
                    onValueChange={(value)=>setObjSearchKeyword(item=>({...item,category:value}))}
                    >
                      <SelectTrigger className="w-full bg-white py-6 text-gray-500 text-base">
                        <SelectValue placeholder="Category"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="text-gray-700" >
                          <SelectLabel className=" text-gray-400">Select Category</SelectLabel>
                                 {allCategories.map((category)=> <SelectItem key={category} value={category}>{category}</SelectItem>)}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>


              <table className="min-w-full  border-collapse bg-[#ddd8d2] border-[1px] rounded-lg shadow-md overflow-x-auto">
                  <thead className=" border-b-3">
                    <tr className="h-12 bg-[#F9F8F6] text-[#75716B] text-lg font-normal ">
                      <th className="py-2 px-4 text-left">Article title</th>
                      <th className="py-2 px-4 text-left">Category</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4"></th>
                    </tr>
                  </thead>
                <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-[#EFEEEB]">
                  {dataArticle.map((item)=>(
                  <tr className="border-b h-16" key={item.id}>
                    <td className="py-2 px-4">{item.title}</td>
                    <td className="py-2 px-4">{item.category_name}</td>
                    <td className={`py-2 px-4 font-semibold ${item.status_name === "publish" ? "text-[#12B279]" : "text-[#75716B]"}`}>● {item.status_name}</td>
                    <td className="flex flex-row gap-4 justify-end items-center py-4 pr-6 ">
                    <div className="relative group">
                      <Pencil color="#75716B" className="cursor-pointer" onClick={() => {navigate(`/AdminEditArticlePage/${item.id}`);}} />
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded p-2 transition-opacity">Edit
                    </div>
                    </div>
                    <div className="relative group">
                      <Trash2 color="#75716B" className="cursor-pointer" onClick={() => {setAlertDeleteArticleState(true);setValueArticle(item.id);}} />
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded p-2 transition-opacity">
                      Delete
                      </div>
                    </div>
                    </td>
                  </tr>
                ))}

                </tbody>
              </table>
        
            </div>
          </div>
          </section>
        </>
    )
}
export default AdminArticlePage