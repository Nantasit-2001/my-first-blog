import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "@/components/AdminSideBar"
import SlideInPanel from "@/components/ui/SlideInPanel";
import { Plus,Pencil,Search,Trash2,X,ChevronRight} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
  } from "@/components/ui/alert-dialog";

function AdminArticlePage (){
  const [alertDeleteArticleState,setAlertDeleteArticleState]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function deleteData(){
    setAlertDeleteArticleState(false)
  }

  function AlertDeleteArticle() {  
    return (
      <AlertDialog open={alertDeleteArticleState} onOpenChange={setAlertDeleteArticleState}>
        <AlertDialogContent className="bg-white rounded-md pt-16 pb-12 max-w-[26rem] sm:max-w-lg flex flex-col items-center gap-6">
          <AlertDialogTitle className="text-3xl font-bold pb-2 text-center">Delete article</AlertDialogTitle>
          <AlertDialogTitle className="text-xl pb-2 text-center text-[#75716B] font-normal">Do you want to delete this article?</AlertDialogTitle>
          <div className="flex gap-2 ">
            <Button variant="whiteButton" className="rounded-full py-6 px-10 text-lg "onClick={()=>setAlertDeleteArticleState(false)}>Cancel</Button>
            <Button variant="blackButton" className="rounded-full py-6 px-10 text-lg "onClick={()=>deleteData()}>Delete</Button>
          </div>
          <AlertDialogCancel onClick={() => setAlertDeleteArticleState(false)} className="absolute right-4 top-2 sm:top-4 p-1 border-none">
            <X className="h-6 w-6"/>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    );
  }  
  return(
        <>
        <AlertDeleteArticle alertDeleteArticleState={alertDeleteArticleState} setAlertDeleteArticleState={setAlertDeleteArticleState}/>
          <section className="flex flex-row">
          <div className=" top-8 left-3 fixed p-1 bg-gray-300 rounded-3xl 
                            xl:hidden">
                <ChevronRight onClick={() => setIsOpen(true)}/>
                {/* Slide-in Component */}
                <SlideInPanel pageNow="Article management" isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
            
            <div className="hidden xl:flex">
                <SideBar pageNow="Article management" />            
            </div>
          <div className="flex flex-col  w-full xl:ml-[335px]">
            <div className="flex justify-center items-center h-[96px] w-full border-b-1 border-[#DAD6D1] ">
              <div className=" flex flex-row justify-between items-center h-full my-6 w-full mx-15">
                <h1 className="text-2xl font-bold">Article management</h1>               
                <button className="bg-[#26231E] py-2 px-6 sm:py-3 sm:px-12 border-1 text-lg text-[#FFFFFF] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3 "
                                    onClick={()=>{navigate('/AdminCreateArticlePage')}}> <Plus />Create article</button>
              </div>
            </div>
            <div className="w-full px-10 sm:px-15 py-5 ">
              <div className=" flex justify-between my-5" >
                {/* search */}
                <div className="w-[360px] relative z-[-1]">
                    <Input  type="search"
                            placeholder="search" 
                          // value={objSearchKeyword.searchInput||""}
                          // onChange={(event)=>setObjSearchKeyword((item)=>({...item,searchInput:event.target.value}))}
                          // onFocus={() => setObjSearchKeyword((item)=>({...item,openDropDown:true}))}
                          // onBlur={() => setTimeout(() => setObjSearchKeyword((item) => ({ ...item, openDropDown: false })), 100)}
                            className=" bg-white py-6 text-xl border-2 pl-10 
                                      sm:text-base lg:text-xl "/>
                      <Search color="gray" 
                              strokeWidth={2} 
                              className="absolute size-5 inset-y-4 left-3 
                                        sm:size-4 lg:size-5"/>
                  </div>
                {/* dropdown */}
                <div className="flex flex-row justify-between gap-4 w-[416px] ">
                  <div className='w-full'>
                    <Select 
                    // onValueChange={(value)=>setSelectedCategory(value)}
                    >
                      <SelectTrigger className="w-full bg-white py-6 text-gray-500 text-base ">
                      <SelectValue placeholder="Status"/></SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="text-gray-700" >
                          <SelectLabel className=" text-gray-400">Select Category</SelectLabel>
                                  {/* {categories.map((categorie)=> <SelectItem key={categorie} value={categorie}>{categorie}</SelectItem>)} */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='w-full'>
                    <Select 
                    // onValueChange={(value)=>setSelectedCategory(value)}
                    >
                      <SelectTrigger className="w-full bg-white py-6 text-gray-500 text-base">
                        <SelectValue placeholder="Category"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="text-gray-700" >
                          <SelectLabel className=" text-gray-400">Select Category</SelectLabel>
                                  {/* {categories.map((categorie)=> <SelectItem key={categorie} value={categorie}>{categorie}</SelectItem>)} */}
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
                  <tr className="border-b h-16">
                    <td className="py-2 px-4">เข้าใจพฤติกรรมแมว: ทำไมเพื่อนแมวของคุณถึงทำตัวแบบที่พวกเขาทำ...</td>
                    <td className="py-2 px-4">แมว</td>
                    <td className={`py-2 px-4 font-semibold ${"Published" === "Published" ? "text-[#12B279]" : ""}`}>เผยแพร่</td>
                    <td className="flex flex-row gap-4 justify-end items-center py-4 pr-6 ">
                    <div className="relative group">
            <Pencil color="#75716B" className="cursor-pointer" onClick={() => {}} />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded p-2 transition-opacity">
              Edit
            </div>
                    </div>
                    <div className="relative group">
                      <Trash2 color="#75716B" className="cursor-pointer" onClick={() => {setAlertDeleteArticleState(true)}} />
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded p-2 transition-opacity">
                      Delete
                      </div>
                    </div>
                    </td>
                  </tr>
                  <tr className="border-b h-16">
                    <td className="py-2 px-4">เข้าใจพฤติกรรมแมว: ทำไมเพื่อนแมวของคุณถึงทำตัวแบบที่พวกเขาทำ...</td>
                    <td className="py-2 px-4">แมว</td>
                    <td className={`py-2 px-4 font-semibold ${"Published" === "Published" ? "text-[#12B279]" : ""}`}>เผยแพร่</td>
                    <td className="flex flex-row gap-4 justify-end items-center py-4 pr-6 ">
                      <Pencil color="#75716B"/>
                      <Trash2 color="#75716B"/>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
          </div>
          </section>
        </>
    )
}
export default AdminArticlePage