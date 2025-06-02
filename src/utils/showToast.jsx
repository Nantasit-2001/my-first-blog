import {toast } from "sonner"
import {X} from 'lucide-react';
function showToast(Bgcolor,title,content) {
    toast.custom((t) => (
        <div className={`${Bgcolor} lg:w-[700px] md:w-[350px] text-white p-6 rounded-lg relative pr-10`}>
            <div>
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-sm">{content}</p>
            </div>
            <span onClick={() => toast.dismiss(t)}><X className="cursor-pointer absolute top-4 right-4" /></span>
        </div>
    ))
}
export default showToast