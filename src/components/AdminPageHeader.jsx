import { Plus} from 'lucide-react';
function  AdminPageHeader({ title, buttons = [],disablestyle=false }) {
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
              disabled={disablestyle}
              form={item.form}
              name={item.name}
              value={item.value}
              className={item.black 
                 ? `${disablestyle?"bg-gray-400 ":"bg-[#26231E] hover:bg-[#75716B] cursor-pointer "} text-[#FFFFFF] font-semibold rounded-[50px] flex flex-row items-center gap-3 text-sm px-8 py-3 md:text-lg sm:text-sm sm:px-12`
                 : `${disablestyle?"bg-gray-400 ":"bg-[#ffffff] hover:bg-[#75716B] cursor-pointer  border-black "} border text-[#000000]  font-semibold rounded-[50px] flex flex-row items-center gap-3 text-sm px-8 py-3 md:text-lg sm:text-sm sm:px-11`
               }
             >
               <h4 className='flex flex-row items-center '>
                 <span className="hidden sm:inline">{item.textHiddenMobile} {'\u00A0'}</span> {item.plus&&<Plus/>}
                 {disablestyle?"loading ...":item.text}
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
  