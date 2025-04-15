import { Plus} from 'lucide-react';
function AdminPageHeader({ title, buttons = [] }) {
    return (
        <div className="flex justify-center items-center h-[96px] w-full border-b-1 border-[#DAD6D1] ">
        <div className=" flex flex-row justify-between items-center h-full my-6 w-full ml-12 mr-2
                        sm:ml-12 sm:mr-2
                        lg:mx-15">
          <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
          {buttons.length > 0 && (
            <div className="flex flex-row gap-2">
              {buttons.map((item, index) => (
              <button
              key={index}
              type={item.type || "button"}
              onClick={item.functionOnClick}
              form={item.form}
              name={item.name} // <== สำคัญ
              value={item.value} // <== สำคัญ
              className={item.black
                 ? "bg-[#26231E] text-[#FFFFFF] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3 text-sm px-8 py-3 md:text-lg sm:text-sm sm:px-12"
                 : "bg-[#ffffff] border border-black text-[#000000] font-semibold rounded-[50px] hover:bg-[#75716B] cursor-pointer flex flex-row items-center gap-3 text-sm px-8 py-3 md:text-lg sm:text-sm sm:px-11"
               }
             >
               <h4 className='flex flex-row items-center '>
                 <span className="hidden sm:inline">{item.textHiddenMobile} {'\u00A0'}</span> {item.plus&&<Plus/>}
                 {item.text}
               </h4>
             </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default AdminPageHeader;
  