import { LogIn } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

function NavBar(){
    const navigate = useNavigate()
    return( 
   <nav className="w-full border-2 border-gray-400 flex items-center justify-between py-4 px-8">
       <h3 className="text-black font-gray-600 text-2xl
                      sm:text-2xl
                     lg:text-3xl
                     ">Nantasit</h3>
       <div className='sm:hidden flex justify-center rounded-xl p-[6px] hover:scale-130 transition-transform duration-300 hover:bg-gray-200'>

        <DropdownMenu>
            <DropdownMenuTrigger><LogIn className=' cursor-pointer'size={24}/></DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen flex flex-col justify-center items-center gap-[24px] py-[40px] px-[24px] mt-4">
                <DropdownMenuItem 
                    className="flex justify-center items-center w-full border-2 border-gray-400 py-[12px] px-[40px] bg-[#FFFFFF] text-[16px]  font-semibold rounded-[50px] "
                        >Log in </DropdownMenuItem>
                <DropdownMenuItem 
                    className="flex justify-center items-center w-full border-2 py-[12px] px-[40px] bg-[#26231E] text-[#FFFFFF] text-[16px]  font-semibold rounded-[50px] "
                        onClick={()=>navigate("/sign-up")}
                        >sign in</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> 
        </div>

       <div className='hidden w-[25%] h-[50px]
                       sm:flex sm:items-center sm:justify-between sm:w-[35%] sm:max-w-[276px] sm:h-[30px]
                       lg:h-[45px] '> 
        {/* <Button variant={"blackButton"} onClick={()=>navigate("/sign-up")}> sign in</Button> */}
        <Button variant={"whiteButton"} className="w-[48%] h-[100%] sm:py-5 ">Login</Button>
        <Button variant={"blackButton"} className="w-[48%] h-[100%] sm:py-5" onClick={()=>navigate("/sign-up")}> sign in</Button>
       </div>
   </nav>
    )
}
export default NavBar;