import { useState,useEffect } from "react";
import BlogCard from "./BlogCard";
import { axiosFetchPosts } from "@/services/postService";
import { axiosgetCategory } from "@/services/categoryService";
import { useNavigate } from "react-router-dom";

import { Input } from "./ui/input"
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,} from './ui/select';
    
    
function ArticleSection (){
  const [categories,setCategory] = useState([" "])
  const [selectedCategory,setSelectedCategory] = useState(categories[0])
  const [dataBlogPost,setDataBlogPost] = useState([])
  const [page,setPage] = useState(1)
  const [hasMore,setHasMore] = useState(true)
  const [isLoading,setIsLoading] = useState(false)

  const [objSearchKeyword,setObjSearchKeyword] =useState({searchInput:"",searchData:[],openDropDown:false})
  const navigate =useNavigate();
  useEffect(()=>{fetchPosts()},[selectedCategory,page])
  useEffect(()=>{searchKeyword()},[objSearchKeyword.searchInput])
  useEffect(()=>{
    async function  fetchCategory() {
      let tempCategory = await axiosgetCategory()
      tempCategory = tempCategory.data.map(item => item.name);
      tempCategory.unshift("Highlight");
      setCategory(tempCategory)
      setSelectedCategory("Highlight")
    }
    fetchCategory()
  },[])
  
  async function searchKeyword() {
    try{
      const params = {
        keyword: objSearchKeyword.searchInput,
        page: 1, 
        limit: 6, 
        category: "" 
      };
      const tempSearchData = await axiosFetchPosts(params);
      setObjSearchKeyword((item)=>({...item,searchData:tempSearchData.data.posts}))
      
    }catch(error){
      console.log("❌"+error);
    }
  }

  async function fetchPosts() {
    setIsLoading(true);
    try {
      const params = {
        category: selectedCategory, 
        keyword: objSearchKeyword.searchInput, 
        page: page, 
        limit: 6 
      };
      const response = await axiosFetchPosts(params);
      console.log(response,"==========================")
      setDataBlogPost((prevPosts) => page === 1 ? response.data.posts : [...prevPosts, ...response.data.posts]);
      console.log(response.data)
      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.log("❌----" + error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return(
    <>
    <section className='w-full mt-4 mx-auto lg:max-w-300 mb-16
                        sm:w-[80%] '>
        <h2 className="text-3xl font-bold pb-2 px-8
                        sm:text-xl sm:px-0 lg:text-2xl
                        ">Latest articles</h2>
          <div className='flex flex-col bg-[#EFEEEB] w-full mt-4 px-8 py-6
                        sm:flex-row items-center sm:justify-between sm:rounded-2xl sm:py-4 sm:gap-2
                        '>
            <div className="relative w-full
                                    sm:order-last sm:w-[35%]">
                <Input type="search"
                        placeholder="search" 
                        value={objSearchKeyword.searchInput||""}
                        onChange={(event)=>setObjSearchKeyword((item)=>({...item,searchInput:event.target.value}))}
                        onFocus={() => setObjSearchKeyword((item)=>({...item,openDropDown:true}))}
                        onBlur={() => setTimeout(() => setObjSearchKeyword((item) => ({ ...item, openDropDown: false })), 100)}
                        className="bg-white py-6 text-xl border-2
                                    sm:text-base lg:text-xl"/>
                <Search color="gray" 
                        strokeWidth={2} 
                        className={`absolute size-5 inset-y-4 right-2 
                                   sm:size-4 lg:size-5 ${objSearchKeyword.searchInput!==""&& "hidden"}`}/>
            {objSearchKeyword.openDropDown?
            <div className="absolute bg-white z-99"> 
            {objSearchKeyword.searchData.map((item,index)=>
                <button
                  key={index}
                  className="text-start px-4 py-2 block w-full text-sm text-foreground rounded-sm hover:bg-[#EFEEEB] hover:rounded-sm cursor-pointer"
                  onClick={() => 
                    navigate(`/post/${item.id}`)}
                  >
                    {item.title}
                </button>
            )}</div>
            :undefined}
            
            </div>
            <div className='w-full mt-4 
                            sm:hidden'>
                <label className="text-xl text-gray-500 font-bold">Category</label>

                <Select onValueChange={(value)=>setSelectedCategory(value)}>
                <SelectTrigger className="w-full bg-white py-6 my-2 text-gray-500 text-base ">
                <SelectValue placeholder={selectedCategory}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="text-gray-700" >
                    <SelectLabel className=" text-gray-400">Select Category</SelectLabel>
                                  {categories.map((categorie)=> <SelectItem key={categorie} value={categorie}>{categorie}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
                </Select>
            </div>

            <div className="hidden sm:flex sm:justify-around text-gray-500 lg:gap-6 ">
                  {categories.map(categorie=>
                        <Button key={categorie} 
                                variant="LatestArticles"
                                onClick={()=>{setSelectedCategory(categorie);
                                              setPage(1);
                                              setHasMore(true);}}
                                className={selectedCategory === categorie?"bg-[#DAD6D1] text-accent-foreground ":null}  
                                disabled={selectedCategory === categorie}
                                >{categorie}
                        </Button>)}
            </div>
          </div>

          <div className="mt-6 px-4 grid grid-cols-1 gap-12
                          sm:mt-12 sm:px-0 sm:grid-cols-2 ">
            {isLoading&&page===1?undefined:dataBlogPost.map((blogPost)=>
              <BlogCard key={blogPost.id}
                        id = {blogPost.id}
                        image={blogPost.image}
                        category={blogPost.category}
                        title={blogPost.title}
                        description={blogPost.description}
                        author_profile_pic={blogPost.author_profile_pic}
                        author_name={blogPost.author_name}
                        date={new Date(blogPost.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              />)}
          </div>
        
         {hasMore && (
              <div className="text-center mt-8">
                <button onClick={()=>setPage((page)=>page+1)}
                    disabled={isLoading}
                    className="hover:text-muted-foreground font-medium underline">
                      {isLoading ? "Loading..." : "View more"}
                </button>
              </div>
          )} 

    </section>
    </>
    )
}
export default ArticleSection