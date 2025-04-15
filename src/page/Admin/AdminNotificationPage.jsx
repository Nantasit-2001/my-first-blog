import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
function AdminNotificationPage (){

    return(
        <>
        <section className="flex flex-row ">
            <AdminResponsiveSidebar pageNow="Notification"/>
            <div className="flex flex-col w-full xl:ml-[335px]">
                <AdminPageHeader title="Notification"/>
                <div>
                    deded
                </div>
            </div>
        </section>
        </>
    )
}
export default AdminNotificationPage