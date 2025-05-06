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
import { useAuth } from "@/context/Authcontext"; // Import useAuth อีกครั้งที่นี่

function CurrentUser({ user }) {
    return (
        <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">  
                <img
                    src={user?.data?.profile_pic || "https://placehold.co/100x100?text=Profile"}
                    alt={user?.data?.username}
                    onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Profile"; }}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1">
                <h3 className="font-medium">{user?.data?.username}</h3>
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
                {<CardNotification picture="d" username="dwdwdw" Noti="q" over="111111"/> }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
//------------------------
function DropdownMenuItems({isAdmin,navigate,logout}) {
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
                <DropdownMenuItem className="flex items-center justify-between p-4 font-medium hover:bg-gray-100 pl-10 cursor-pointer sm:pl-4"onClick={()=>navigate("/AdminArticlePage") }>
                    <div className="flex items-center gap-3">
                        <ExternalLink />Admin panel
                    </div>
                </DropdownMenuItem>:undefined}
            <DropdownMenuItem className="flex items-center p-4 font-medium hover:bg-gray-100 border-t border-gray-200 pl-10 cursor-pointer sm:pl-4"
                                        onClick={() => {logout(); navigate("/")}}>
                <LogOut className='transform rotate-180'/>
                Log out
            </DropdownMenuItem>
        </>
    );
}
//-----------------------
function NavBar(){
    const { loggedIn,logout,user } = useAuth(); // ใช้ useContext ที่นี่
    const isAdmin = user?.data?.role === "admin";
    const navigate = useNavigate()
    return(

   <nav className="w-full border-2 flex items-center justify-between py-4 px-8
                 lg:px-30">
        <h3 className="text-black font-gray-600 text-2xl sm:text-2xl lg:text-3xl cursor-pointer"
            onClick={()=>navigate("/")}
            >bb<span className='bg-green-500 rounded-full h-2 w-2 inline-block ml-1 mt-0'> </span>
        </h3>

        {/* Mobile menu */}
        <div className='sm:hidden'>
    <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center cursor-pointer">
            {loggedIn ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#323232"/>
                    </svg>
            ) : (
                <LogIn className='cursor-pointer' size={24} />
            )}
        </DropdownMenuTrigger>

        {loggedIn ? (
            <DropdownMenuContent className="w-screen mr-4 flex flex-col mt-4 sm:hidden">
                <div className="p-4 flex justify-between">
                    <CurrentUser user={user}/>
                    <NotificationDropdown navigate={navigate}/>
                </div>

                <DropdownMenuItems isAdmin={isAdmin} navigate={navigate} logout={logout}/>
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
        loggedIn ?
        (
            <div className='hidden
                            sm:flex  gap-8 '>
                    <NotificationDropdown/>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center cursor-pointer gap-4'>
                            <CurrentUser user={user}/><ChevronUp size={16} className="rotate-180"/>
                        </DropdownMenuTrigger>
                            <DropdownMenuContent className="hidden sm:flex flex-col w-[250px] sm:mt-1 sm:mr-4 lg:mr-12 ">
                            <DropdownMenuItems isAdmin={isAdmin} navigate={navigate} logout={logout}/>
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