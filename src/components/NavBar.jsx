import { LogIn } from 'lucide-react';

function NavBar(){
    return( 
   <nav className="w-full border-2 border-gray-400 flex items-center justify-between py-4 px-8">
       <h3 className="text-black font-gray-600 text-2xl
                     sm:h- sm:text-2xl
                     lg:text-3xl
                     ">Nantasit</h3>
       <div className=' rounded-xl p-1 hover:scale-130 transition-transform duration-300 hover:bg-gray-200'>
         {/* <img className="w-10 h-10 cursor-pointer 
                       sm:hidden" 
                       src="./src/assets/Frame.png" alt="Logo" /> */}
                        <LogIn className='sm:hidden cursor-pointer'size={23}/>
       </div>
       <div className='hidden w-[25%] h-[50px] 
                       sm:flex sm:items-center sm:justify-between sm:max-w-[276px] sm:h-[30px]
                       lg:h-[50px] '> 
       <button className="w-[48%] h-[100%] border-2  bg-[#FFFFFF] text-[16px] font-semibold rounded-[50px]">Log in</button>
       <button className="w-[48%] h-[100%] border-2  bg-[#26231E] text-[#FFFFFF] text-[16px] font-semibold rounded-[50px]">sign in</button>
       </div>
   </nav>
    )
}
export default NavBar;