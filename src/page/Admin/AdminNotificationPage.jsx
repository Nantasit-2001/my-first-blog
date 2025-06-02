import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AdminPageHeader from "@/components/AdminPageHeader";
import { axiosGetNotificationAdmin,axiosPatchNotification } from "@/services/notification";
import { useState,useEffect } from "react";
import { formatTimeAgo } from "@/utils/formatTimeAgo";

function AdminNotificationPage (){
  const [isLoading,setIsloading] = useState(false)
  const [dataNotification,setDataNotification] = useState([])
//   const []

  useEffect(()=>{
    async function fetchNotifucation () {
        const dataNotificationTemp = await axiosGetNotificationAdmin()
        console.log(dataNotificationTemp,"-=-=-=");
        setDataNotification(dataNotificationTemp.data)
    }
    fetchNotifucation()
  },[])

  const navigateToPost = async(id,post_id)=>{
      await axiosPatchNotification(id)
      window.location.href = `/post/${post_id}`;
  }

    return(
        <>
        <section className="flex flex-row ">
            <AdminResponsiveSidebar pageNow="Notification"/>
            <div className="flex flex-col w-full xl:ml-[335px]">
                <AdminPageHeader title="Notification"/>
                <div className="flex flex-col gap-10 mt-10">
                    {dataNotification.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                     .map((item,index)=> 
                    (<div key={item.id+item.title+index} className="px-[60px]">
                      <div className="flex justify-between">
                        <div className="flex">
                          <img src={item.image} alt="Profile" className="w-[48px] h-[48px] rounded-full mr-4" />
                          <div className='h-[68px]  text-[18px]'>
                            <p className="font-bold">{item.name} <span className='text-[#75716B] font-semibold'>{
                                      item.type === "user_commented"? "Commented on your article: "+item.title+"" : "Comment on the article you have commented on."}</span> 
                            </p>
                            <p3 className="text-[#43403B] font-semibold">"{item.comment_text}"</p3>
                            <p className="text-sm text-[#F2B68C] font-normal">{formatTimeAgo(item?.created_at)}</p>
                          </div>
                        </div>
                        <h3 className="underline font-semibold cursor-pointer ml-4"
                            onClick={()=>{navigateToPost(item.id,item.post_id)}}>View</h3>
                      </div>
                    </div>))}
                </div>
            </div>
        </section>
        </>
    )
}
export default AdminNotificationPage