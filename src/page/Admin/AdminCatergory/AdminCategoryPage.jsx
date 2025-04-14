import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "@/components/AdminSideBar"
import SlideInPanel from "@/components/ui/SlideInPanel";
import AlertDialogBox from "@/components/AlertDialog";
import { Plus,Pencil,Search,Trash2,X,ChevronRight} from 'lucide-react';
import { Input } from "@/components/ui/input";

function AdminCatergoryPage (){
  const [alertCategory,setAlertCategory]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  function deleteData(){
    setAlertCategory(false)
  }

  
  return(
        <>
          <AlertDialogBox  title="Delete category"
                                      content="Do you want to delete this category?"
                                      buttonLeft="Cancel"
                                      functionButtonLeft={()=>{setAlertCategory(false)}}
                                      buttonRight="Delete"
                                      functionButtonRight={()=>deleteData() }
                                      alertState={alertCategory} 
                                      setAlertState={setAlertCategory}
          />
          <section className="flex flex-row">
            <div className=" top-8 left-3 fixed p-1 bg-gray-300 rounded-3xl 
                            xl:hidden">
                <ChevronRight onClick={() => setIsOpen(true)}/>
                {/* Slide-in Component */}
                <SlideInPanel pageNow="Category management" isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
            <div className="hidden xl:flex">
                <SideBar pageNow="Category management" />            
            </div>
            
          <div className="flex flex-col  w-full xl:ml-[335px]">
            <div className="flex justify-center items-center h-[96px] w-full border-b-1 border-[#DAD6D1] ">
              <div className=" flex flex-row justify-between items-center h-full my-6 w-full mx-15">
                <h1 className="text-2xl font-bold">Category management</h1>               
                <button className="bg-[#26231E] py-2 px-6 sm:py-3 sm:px-12 border-1 text-lg text-[#FFFFFF] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3 "
                                    onClick={()=>{navigate('/AdminCreateCategoryPage')}}> <Plus />Create category</button>
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
                
              </div>


              <table className="min-w-full  border-collapse bg-[#ddd8d2] border-[1px] rounded-lg shadow-md overflow-x-auto">
                  <thead className=" border-b-3">
                    <tr className="h-12 bg-[#F9F8F6] text-[#75716B] text-lg font-normal ">
                      <th className="py-2 px-4 text-left">Category</th>
                      <th className="py-2 px-4 text-left"></th>

                    </tr>
                  </thead>
                <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-[#EFEEEB]">
                  <tr className="border-b h-16">
                    <td className="py-2 px-4">cat</td>
                    <td className="flex flex-row gap-4 justify-end items-center py-4 pr-6 ">
                    <div className="relative group">
                      <Pencil color="#75716B" className="cursor-pointer" onClick={() => {navigate("/AdminEditCategoryPage")}} />
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded p-2 transition-opacity">
                        Edit
                      </div>
                    </div>
                    <div className="relative group">
                      <Trash2 color="#75716B" className="cursor-pointer" onClick={() => {setAlertCategory(true)}} />
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded p-2 transition-opacity">
                        Delete
                      </div>
                    </div>
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
export default AdminCatergoryPage