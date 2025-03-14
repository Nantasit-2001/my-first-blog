import { Input } from "./ui/input"
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,} from './ui/select';

function SelectBar (){
    return(
    <Select id='SelectBar1'>
    <SelectTrigger className="w-full bg-white py-6 my-2 text-gray-500 text-base ">
      <SelectValue placeholder="Highlight"/>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup className="text-gray-500" >
        <SelectLabel className=" text-gray-400">Category</SelectLabel>
        <SelectItem value="Highlight" >Highlight</SelectItem>
        <SelectItem value="Cat">Cat</SelectItem>
        <SelectItem value="Inspiration">Inspiration</SelectItem>
        <SelectItem value="Ganeral" >Ganeral</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
    )
}

    
function ArticleSection (){
    return(
    <>
    <section className='w-full mt-4 mx-auto lg:max-w-300
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
                        className="bg-white py-6 text-xl border-2
                                    sm:text-base lg:text-xl"/>
                <Search color="gray" 
                        strokeWidth={2} 
                        className="absolute size-5 inset-y-4 right-2 
                                   sm:size-4 lg:size-5"/>
            </div>
            <div className='w-full mt-4 
                            sm:hidden'>
                <label htmlFor="SelectBar1" 
                        className="text-xl text-gray-500 font-bold">Category</label>
                <SelectBar id='SelectBar1'/>
            </div>
            <div className="hidden sm:flex sm:justify-around text-gray-500
                            lg:gap-6">
            <Button variant="LatestArticles">Highlight</Button>
            <Button variant="LatestArticles">Cat</Button>
            <Button variant="LatestArticles">Inspiration</Button>
            <Button variant="LatestArticles">Ganeral</Button>
            </div>
        </div>
    </section>
    </>
    )
}
export default ArticleSection