import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
function AdminNotificationPage (){

    return(
        <>
        <section className="flex flex-row ">
            <AdminResponsiveSidebar pageNow="Notification"/>
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