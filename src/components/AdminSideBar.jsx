import { NotebookText,Folder,User,Bell,KeyRound,SquareArrowOutUpRight,LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/Authcontext'; 
function SideBar({pageNow}) {
    const styleSelectedMenu="px-6 py-3 h-15 bg-[#E4E0DA] font-medium text-[#43403B] text-lg flex items-center gap-3 cursor-pointer"
    const styleSelectableMenu ="px-6 py-3 <h-15></h-15> hover:bg-gray-200 font-medium text-[#75716B] text-lg flex items-center gap-3 cursor-pointer"
    const navigate = useNavigate()
    const { logout } = useAuth();
    return (      
      <div className="h-screen w-[335px] bg-[#F6F5F3] flex flex-col justify-between py-4 fixed order-12 
                      ">
        {/* Top section */}
        <div>
          <div className="px-6 py-14">
            <h1 className="text-4xl font-bold">Nantasit<span className="text-green-600">.</span></h1>
            <p className="text-xl font-medium text-[#F2B68C] mt-2">Admin panel</p>
          </div>
  
          {/* Menu */}
          <nav className="">
            <ul className="flex flex-col">
              <li className={pageNow==="Article management"?styleSelectedMenu:styleSelectableMenu} onClick={()=>navigate("/AdminArticlePage")}>
              <NotebookText size={18} /> Article management
              </li>
              <li className={pageNow==="Category management"?styleSelectedMenu:styleSelectableMenu} onClick={()=>navigate("/AdminCategoryPage")}>
              <Folder size={18}/> Category management
              </li>
              <li className={pageNow==="Profile"?styleSelectedMenu:styleSelectableMenu} onClick={()=>navigate("/AdminProfilePage")}>
                <User size={18}/> Profile
              </li>
              <li className={pageNow==="Notification"?styleSelectedMenu:styleSelectableMenu} onClick={()=>navigate("/AdminNotificationPage")}>
              <Bell size={18} /> Notification
              </li>
              <li className={pageNow==="Reset password"?styleSelectedMenu:styleSelectableMenu} onClick={()=>navigate("/AdminResetPasswordPage")}>
              <KeyRound size={18}/> Reset password
              </li>
            </ul>
          </nav>
        </div>
  
        {/* Bottom section */}
        <div className="mb-4">
          <div className={`${styleSelectableMenu} border-b-1 border-[#DAD6D1]`} onClick={()=>navigate("/")}>
          <SquareArrowOutUpRight size={18}/> bb. website
          </div>
          <div className={styleSelectableMenu} onClick={()=>{logout(); navigate("/");}}>
            <LogOut size={18} className="rotate-180"/> Log out
          </div>
        </div>
      </div>
    );
  }
  export default SideBar
