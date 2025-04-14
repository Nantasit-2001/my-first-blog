import SideBar from "@/components/AdminSideBar"
import LabelAndInput from "@/components/LabelAndInput"
import useForm from "@/hooks/useForm"
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
                <SelectTrigger className=" bg-white py-6 my-2 text-gray-500 text-base w-[480px] h-12">
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
    return(
        <>
        <section className="flex flex-row">
            <SideBar pageNow="Article management"/>
            <div className="flex flex-col w-full ml-[335px]">
                <div className="flex justify-center items-center h-[96px] w-full border-b-1 border-[#DAD6D1] ">
                    <div className=" flex flex-row justify-between items-center h-full my-6 w-full mx-15">
                        <h1 className="text-2xl font-bold">Create article</h1>               
                        <div className=" flex flex-row gap-2">
                            <button className="bg-[#ffffff] py-3 px-12 border-1 border-black text-lg text-[#000000] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3 "
                                    // onClick={()=>{navigate('/AdminCreateArticlePage')}}>
                                    >Save as draft</button>
                            <button className="bg-[#26231E] py-3 px-12 border-1 text-lg text-[#FFFFFF] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3 "
                                    // onClick={()=>{navigate('/AdminCreateArticlePage')}}> 
                                    >Save and publish</button>
                        </div>
                    </div>
                </div>
                <div className=" py-10 px-15 flex flex-col gap-6">
                    <div className=" text-[#75716B] ">
                        <h4>Thumbnail image</h4>
                        <div className=" flex flex-row gap-6 items-end">
                        <img    src="eerror" // รูปที่อาจโหลดไม่ได้
                                alt="Image"
                                className="w-[460px] h-[260px]"
                                onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/460x260?text=No+Image";}}/>
                        <button className="bg-[#ffffff] h-12 px-12 border-1 border-black text-lg text-[#000000] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer "
                                    // onClick={()=>{navigate('/AdminCreateArticlePage')}}>
                                    >Upload thumbnail image</button>
                        </div>
                    </div> 
                    <div className='w-full mt-4'>
                        <label className="text-lg text-gray-500 font-normal">Category</label>
                        <SelectCategory/>
                    </div>

                    <div  className="flex flex-col text-lg text-gray-500 gap-2 w-[480px]">
                        <label className="w-[110px] text-gray-500 opacity-50 cursor-not-allowed" htmlFor="inputThompson">Author name</label>
                        <input  type="text" 
                            id="inputThompson" 
                            placeholder="Thompson P." 
                            class="bg-gray-200 text-gray-500 py-2 px-4 rounded opacity-50 pointer-events-none " 
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

                </div>
            </div>
        </section>
        </>
    )
}
export default AdminCreateArticlePage