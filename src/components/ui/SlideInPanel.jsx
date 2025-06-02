import {X} from 'lucide-react';
import AdminSideBar from "../AdminSideBar"
export default function SlideInPanel({ isOpen, onClose,pageNow }) {
    return (
      <div
        className={` top-0 left-0  shadow-lg transform transition-transform duration-300 ease-in-out z-50 h-screen w-[335px] bg-[#F6F5F3] flex flex-col fixed
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
        <AdminSideBar pageNow={pageNow}/>
        <X className="absolute top-6 right-4" onClick={onClose}/>
        </div>
        
      </div>
    );
  }