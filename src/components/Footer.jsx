import { Github,Icon,Linkedin} from "lucide-react";
import IconGoogle from "../assets/image/IconGoogle.png"
import { useNavigate } from "react-router-dom";
function Footer (){
    const navigate = useNavigate();
    return(
        <>
        <section className="flex flex-col justify-center items-center gap-6 bg-[#EFEEEB] h-38  
                            sm:flex-row sm:justify-between sm:h-36 sm:px-30">
            <div className="flex flex-row justify-center gap-6 items-end">
                <a className=" text-base  font-bold  text-[#43403B]">Get in touch</a>
                <div className=" flex flex-row justify-end gap-4
                                ">
        {/* Logo */}
                    <a href="https://www.linkedin.com/" className =" w-6 h-6 rounded-full bg-[#43403B] flex justify-center items-center cursor-pointer">
                        <Linkedin strokeWidth={1.5} className="w-4 h-4 text-[#EFEEEB] fill-white"/>
                    </a>
                    <a href="https://github.com" className="relative w-[24px] h-[24px] rounded-full bg-[#43403B] cursor-pointer">
                        <Github className="w-5 h-5 text-[#EFEEEB] fill-white absolute top-[5.5px] left-[2.1px]" />
                    </a>
                    <a href="https://www.google.com">
                        <img className="w-6 h-6 cursor-pointer" src={IconGoogle}/>
                    </a>
                </div>
            </div>
            <button className="underline text-base cursor-pointer" onClick={()=>navigate("/")}>Home page</button>
            
        </section>
        </>
    )
}
export default Footer 

