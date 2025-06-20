import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminResponsiveSidebar from "@/components/AdminResponsiveSidebar";
import AlertDialogBox from "@/components/AlertDialog";
import AdminPageHeader from "@/components/AdminPageHeader";
import { Pencil,Search,Trash2} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { axiosgetCategory,axiosDeleteCategory } from "@/services/categoryService";

function AdminCatergoryPage() {
  const [allCategories, setAllCategories] = useState([]);      // เก็บข้อมูลหมวดหมู่ทั้งหมด
  const [dataCategory, setDataCategory] = useState([]);        // ข้อมูลหมวดหมู่ที่จะแสดง (filtered)
  const [alertCategory, setAlertCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState("");
  const [refacer, setReface] = useState(false);
  const [objSearchKeyword, setObjSearchKeyword] = useState({
    searchInput: "",
  });
  const navigate = useNavigate();

  // ดึงข้อมูล category จาก API
  useEffect(() => {
    async function fetchCategory() {
      const categoryTemp = await axiosgetCategory();
      const categories = categoryTemp.data.map((value) => value.name);
      setAllCategories(categories);
      setDataCategory(categories); 
    }
    fetchCategory();
  }, [refacer]);

  // กรอง category ตาม search input
  useEffect(() => {
    const keyword = objSearchKeyword.searchInput.toLowerCase().trim();
    if (keyword === "") {
      setDataCategory(allCategories);
    } else {
      setDataCategory(
        allCategories.filter(cat =>
          cat.toLowerCase().includes(keyword)
        )
      );
    }
  }, [objSearchKeyword.searchInput, allCategories]);

  async function deleteData() {
    setAlertCategory(false);
    await axiosDeleteCategory(valueCategory);
    setReface(!refacer);
  }

  function creatCategory() {
    navigate('/AdminCreateCategoryPage');
  }

  return (
    <>
      <AlertDialogBox
        title="Delete category"
        content="Do you want to delete this category?"
        buttonLeft="Cancel"
        functionButtonLeft={() => { setAlertCategory(false) }}
        buttonRight="Delete"
        functionButtonRight={() => deleteData()}
        alertState={alertCategory}
        setAlertState={setAlertCategory}
      />
      <section className="flex flex-row">
        <AdminResponsiveSidebar pageNow="Category management" />
        <div className="flex flex-col w-full xl:ml-[335px]">
          <AdminPageHeader
            title="Category management"
            buttons={[{
              black: true,
              plus: true,
              text: "Create article",
              functionOnClick: creatCategory
            }]}
          />
          <div className="w-full px-10 sm:px-15 py-5 ">
            <div className="flex justify-between my-5">
              {/* search */}
              <div className="w-[360px] relative z-[0]">
                <Input
                  type="search"
                  placeholder="search"
                  value={objSearchKeyword.searchInput || ""}
                  onChange={(e) =>
                    setObjSearchKeyword(prev => ({ ...prev, searchInput: e.target.value }))
                  }
                  className="bg-white py-6 text-xl border-2 pl-10 sm:text-base lg:text-xl"
                />
                <Search color="gray"
                  strokeWidth={2}
                  className="absolute size-5 inset-y-4 left-3 sm:size-4 lg:size-5" />
              </div>
            </div>

            <table className="min-w-full border-collapse bg-[#ddd8d2] border-[1px] rounded-lg shadow-md overflow-x-auto">
              <thead className="border-b-3">
                <tr className="h-12 bg-[#F9F8F6] text-[#75716B] text-lg font-normal ">
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left"></th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-[#EFEEEB]">
                {dataCategory.map(value => (
                  <tr className="border-b h-16" key={value}>
                    <td className="py-2 px-4">{value}</td>
                    <td className="flex flex-row gap-4 justify-end items-center py-4 pr-6 ">
                      <div className="relative group">
                        <Pencil color="#75716B" className="cursor-pointer" onClick={() => { navigate(`/AdminEditCategoryPage/${value}`) }} />
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded p-2 transition-opacity">
                          Edit
                        </div>
                      </div>
                      <div className="relative group">
                        <Trash2 color="#75716B" className="cursor-pointer" onClick={() => { setAlertCategory(true); setValueCategory(value) }} />
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded p-2 transition-opacity">
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </section>
    </>
  )
}

export default AdminCatergoryPage;
