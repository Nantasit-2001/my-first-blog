import SideBar from "@/components/AdminSideBar"
import SlideInPanel from "@/components/ui/SlideInPanel";
import LabelAndInput from "@/components/LabelAndInput"
import { ChevronRight } from 'lucide-react';
import { useState } from "react";
function AdminNotificationPage (){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
        <section className="flex flex-row ">
            
            <div className=" top-8 left-3 fixed p-1 bg-gray-300 rounded-3xl 
                            xl:hidden">
                <ChevronRight className="cursor-pointer" onClick={() => setIsOpen(true)}/>
                {/* Slide-in Component */}
                <SlideInPanel pageNow="Notification" isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
            
            <div className="hidden xl:flex">
                <SideBar pageNow="Notification" />            
            </div>
            <div className="flex flex-col w-full xl:ml-[335px]">
                <div className="flex justify-center items-center h-[96px] w-full border-b-1 border-[#DAD6D1] ">
                    <div className=" flex flex-row justify-between items-center h-full my-6 w-full ml-12 mr-2
                                    sm:ml-12 sm:mr-2
                                    lg:mx-15">

                        <h1 className="text-lg md:text-2xl font-bold
                                        ">Notification</h1>               
                    </div>
                </div>
                <div>
                    deded
                </div>
            </div>
        </section>
        </>
    )
}
export default AdminNotificationPage