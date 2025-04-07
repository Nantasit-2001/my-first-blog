import { LogIn,RotateCcw,UserRound,LogOut,Bell,ExternalLink,ChevronUp } from 'lucide-react';
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
import { useState } from 'react';

function CurrentUser({ imageUrl, username }) {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
        <img
          src={imageUrl}
          alt={username}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/40";
          }}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{username||"Moodeng ja"}</h3>
      </div>
    </div>
  );
}
//-------------------------
function CardNotification({ picture, username, Noti, over }) {
  return (
    <div className="flex items-center p-4 cursor-pointer">
      <img src={picture} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
      <div>
        <p className="font-semibold">{username} {Noti}</p>
        <p className="text-sm text-[#F2B68C]">{over}</p>
      </div>
    </div>
  );
}
function NotificationDropdown({navigate}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><Bell className="cursor-pointer" size={20} /></DropdownMenuTrigger>
      <DropdownMenuContent className="absolute w-[calc(100vw-32px)] transform -translate-x-[100%] mx-4  mt-4
                                      sm:w-[362px] sm:mt-0">
        {/* {notifications.map((notification, index) => ( */}
          {/* <div key={index}> */}
            {<CardNotification picture="d" username="dwdwdw" Noti="q" over="111111"/> }
          {/* </div> */}
        {/* ))} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
//------------------------
function DropdownMenuItems({isAdmin,navigate}) {
  return (
    <>
            <DropdownMenuItem className="flex items-center justify-between p-4 font-medium hover:bg-gray-100 pl-10 cursor-pointer sm:pl-4"onClick={()=>{navigate("/profile")}}>
              <div className="flex items-center gap-3 ">
                <UserRound/>
                Profile
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between p-4 font-medium hover:bg-gray-100 pl-10 cursor-pointer sm:pl-4"onClick={()=>{navigate("/reset-password")}}>
              <div className="flex items-center gap-3" >
                  <RotateCcw className='transform rotate-180'/>Reset password
              </div>
            </DropdownMenuItem>
            {isAdmin?
                <DropdownMenuItem className="flex items-center justify-between p-4 font-medium hover:bg-gray-100 pl-10 cursor-pointer sm:pl-4"onClick={()=>{navigate("")}}>
                  <div className="flex items-center gap-3" >
                      <ExternalLink />Admin panel
                  </div>
                </DropdownMenuItem>:undefined}
            <DropdownMenuItem className="flex items-center p-4 font-medium hover:bg-gray-100 border-t border-gray-200 pl-10 cursor-pointer sm:pl-4"
                              onClick={() => navigate("/logout")}>
              <LogOut className='transform rotate-180'/>
              Log out
            </DropdownMenuItem>
    </>
  );
}
//-----------------------
function NavBar(){
    const [isLoggedIn,setisLoggedIn] = useState(true)
    const [isAdmin,setisAdmin] = useState(true)
    const navigate = useNavigate()
    
    return( 
      
   <nav className="w-full border-2 flex items-center justify-between py-4 px-8
                  lg:px-30">
       <h3 className="text-black font-gray-600 text-2xl
                      sm:text-2xl
                     lg:text-3xl
                     ">Nantasit</h3>
      
        {/* Mobile menu */}
        <div className='sm:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center cursor-pointer">
          {isLoggedIn ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#323232"/>
              </svg>
          ) : (
            <LogIn className='cursor-pointer' size={24} />
          )} 
        </DropdownMenuTrigger>

        {isLoggedIn ? (
          <DropdownMenuContent className="w-screen flex flex-col mt-4 sm:hidden">
            {/* User profile section */}
            <div className="p-4 flex justify-between">
              <CurrentUser/>
              <NotificationDropdown navigate={navigate}/>
            </div>
            
            <DropdownMenuItems isAdmin={isAdmin} navigate={navigate}/>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="w-screen flex flex-col justify-center items-center gap-[24px] py-[40px] px-[24px] mt-4">
            <DropdownMenuItem  
              className="flex justify-center items-center w-full border-2 border-gray-400 py-[12px] px-[40px] bg-[#FFFFFF] text-[16px] font-semibold rounded-[50px]" 
              onClick={() => navigate("/login")}
            >
              Log in
            </DropdownMenuItem>
            <DropdownMenuItem  
              className="flex justify-center items-center w-full border-2 py-[12px] px-[40px] bg-[#26231E] text-[#FFFFFF] text-[16px] font-semibold rounded-[50px]" 
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>


        {/* จอใหญ่ */}
        {
        isLoggedIn ? 
        (
          <div className='hidden
                          sm:flex  gap-4'>
              <NotificationDropdown/>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center cursor-pointer gap-2'>
                  <CurrentUser/><ChevronUp size={16} className="rotate-180"/>
                  
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col w-[250px]">
                 
                  {/* Menu items */}
                  <DropdownMenuItems isAdmin={isAdmin} navigate={navigate}/>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        )
        :(
       <div className='hidden w-[25%] h-[50px]
                       sm:flex sm:items-center sm:justify-between sm:w-[35%] sm:max-w-[276px] sm:h-[30px]
                       lg:h-[45px] '> 
        <Button variant={"whiteButton"} className="w-[48%] h-[100%] sm:py-5" onClick={()=>navigate("/Login")}>Login</Button>
        <Button variant={"blackButton"} className="w-[48%] h-[100%] sm:py-5" onClick={()=>navigate("/sign-up")}> sign in</Button>
       </div>
      )
      }
   </nav>
    )
}
export default NavBar;