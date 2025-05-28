import { useState } from "react";
import { ChevronRight } from "lucide-react";
import SlideInPanel from "./ui/SlideInPanel";
import SideBar from "./AdminSideBar";

const AdminResponsiveSidebar = ({pageNow}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="top-8 left-3 fixed p-1 bg-gray-300 rounded-3xl xl:hidden z-100">
        <ChevronRight onClick={() => setIsOpen(true)} />
        <SlideInPanel
          pageNow={pageNow}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>

      <div className="hidden xl:flex">
        <SideBar pageNow={pageNow} />
      </div>
    </>
  );
};

export default AdminResponsiveSidebar;
