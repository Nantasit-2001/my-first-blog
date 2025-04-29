import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Toaster, toast } from 'sonner'
import { axiosfetchPostById } from "@/services/postService";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
  } from "@/components/ui/alert-dialog";

import {Linkedin,Facebook,Twitter,Copy,Smile,X} from "lucide-react";

import PersonCat from "../assets/image/Person-cat.png"

function ViewPostPage() {
    const param = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [alertCreateAccountState,setAlertCreateAccountState]=useState(false);
    useEffect(() => {
        async function getPost() {
            try {
                const postId=param.postId 
                const response = await axiosfetchPostById({postId})
                // const response = await axios.get(`https://blog-post-project-api.vercel.app/posts/${param.postId}`);
                const tempContent ={...response.data.data} 
                // const tempContent ={...response.data} 
                console.log(tempContent)
                setContent(tempContent);
            } catch (error) {
                console.error("Error fetching post_:", error);
            } finally {
                setLoading(false);
            }
        }

        getPost();
    }, [param]);
    function AuthorInfo (){
        return(
        <>
         <div className="bg-[#EFEEEB] rounded-3xl p-6">
            <div className="flex flex-row items-center mb-4">
                <img src={PersonCat} className="w-16 h-16 rounded-full overflow-hidden mr-4"/>
                <div>
                    <span>Auter</span>
                    <h1 className="text-2xl font-bold">{content.author}</h1>
                </div>
            </div>
            <hr className="border-gray-300 mb-4" />
            <div className="text-muted-foreground space-y-4 ">
                <p>I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.</p>
                <p>When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes</p>
            </div>    
        </div>
        </>
        )
    }

    function LikeBar ({likes}){
        
        function copyToClipboard(text) {
            console.log(text)
              navigator.clipboard.writeText(text)
                .then(() => {
                    toast.custom((t) => (
                        <div className="bg-green-500 text-white p-6 rounded-lg relative pr-10">
                            <div>
                            <h2 className="text-xl font-bold mb-2">Copied!</h2>
                            <p className="text-sm">This article has been copied to your clipboard.</p>
                            </div>
                            <span onClick={() => toast.dismiss(t)}><X className="cursor-pointer absolute top-4 right-4" /></span>
                        </div>
                      ));  
                })
                .catch((error) => {
                  console.error("คัดลอกข้อความไม่สำเร็จ", error);
                });
        }      
        function ShareButtons({ articleUrl }) {
            const facebookShareUrl = `https://www.facebook.com/share.php?u=${encodeURIComponent(articleUrl)}`;
            const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
            const twitterShareUrl = `https://www.twitter.com/share?&url=${encodeURIComponent(articleUrl)}`;
            return (
                <div className="flex gap-2">
                    <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] p-3 rounded-full  flex justify-center items-center cursor-pointer">
                    <Facebook color="white" strokeWidth={0} size={30} className=" fill-white" /></a>
                    <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="bg-[#0077B5] p-3 rounded-full flex justify-center items-center cursor-pointer">
                    <Linkedin color="white" strokeWidth={0} size={30} className=" fill-white" /></a>
                    <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="bg-[#55ACEE] p p-3 rounded-full flex justify-center items-center cursor-pointer">
                    <Twitter color="white" strokeWidth={0} size={30} className=" fill-white" /></a>
                </div>
            );
        }

        return(
            <div className="bg-[#EFEEEB] py-4 px-4 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row md:items-center md:space-y-0 md:justify-between mb-10">
                <button className="bg-white flex items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors group group-hover:text-muted-foreground font-medium"
                    onClick={()=>setAlertCreateAccountState(true)}>
                    <Smile strokeWidth={1.5} className="mr-2" />{likes}
                </button>
                
                <div className="flex flex-row gap-2">
                    <button className="bg-white flex flex-1 items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors font-medium group group-hover:text-muted-foreground"
                        onClick={() => copyToClipboard(`http://localhost:5173/post/${param.postId}`)}>
                        <Copy strokeWidth={1.5} className="mr-2"/>Copy
                    </button>
                    <ShareButtons articleUrl={`https://blog-post-project-api.vercel.app/posts/${param.postId}`} />
                </div>
            </div>
        )
    }

    function CommentBar (){
        return(
            <>
            <section>
                <div className="px-4 mb-4">
                    <h2 className="text-2xl text-gray-500 mb-2">Comment</h2>
                    <textarea rows="3" placeholder="What are your thoughts?" className="border-2 rounded-lg w-full text-lg text-#75716B p-4"
                    onClick={()=>setAlertCreateAccountState(true)}></textarea>
                    <div className="w-full flex sm:justify-end ">
                        <button className=" border-2 bg-[#000000] text-lg py-4 px-12 mt-2 text-white font-semibold rounded-[50px]"
                        onClick={()=>setAlertCreateAccountState(true)}>Send</button>
                    </div>
                </div>
            </section>
            </>
        )
    }

    function AlertCreateAccount({ alertCreateAccountState, setAlertCreateAccountState }) {
  return (
    <AlertDialog open={alertCreateAccountState} onOpenChange={setAlertCreateAccountState}>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[26rem] sm:max-w-lg flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Create an account to continue
        </AlertDialogTitle>
        <button className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg w-52"
            onClick={()=>navigate("/sign-up")}>
            Create account
        </button>
        <AlertDialogDescription className="flex flex-row gap-1 justify-center font-medium text-center pt-2 text-muted-foreground">
          Already have an account?
          <a href="/login" className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold "
            onClick={()=>navigate("/Login")}>
            Log in
          </a>
        </AlertDialogDescription>
        <AlertDialogCancel onClick={() => setAlertCreateAccountState(false)} className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
const contentReactMarkdown = content.content;
console.log(`"${contentReactMarkdown}"`);
console.log("## 1. Vocal Communications\n\nExplore the various meows, purrs, and other vocalizations cats use to express themselves.\n\n## 2. Body Language\n\nLearn to read your cat's posture, tail position, and ear movements to understand their mood and intentions.\n\n## 3. Scent Marking\n\nDiscover why cats use scent to communicate and mark their territory.\n\n## 4. Facial Expressions\n\nUnderstand the subtle facial cues cats use to convey emotions and intentions.\n\n## 5. Interspecies Communication\n\nLearn how cats have adapted their communication methods to interact with humans and other animals.");
console.log(`"${contentReactMarkdown}"`==="## 1. Vocal Communications\n\nExplore the various meows, purrs, and other vocalizations cats use to express themselves.\n\n## 2. Body Language\n\nLearn to read your cat's posture, tail position, and ear movements to understand their mood and intentions.\n\n## 3. Scent Marking\n\nDiscover why cats use scent to communicate and mark their territory.\n\n## 4. Facial Expressions\n\nUnderstand the subtle facial cues cats use to convey emotions and intentions.\n\n## 5. Interspecies Communication\n\nLearn how cats have adapted their communication methods to interact with humans and other animals.")
    return (
        <>
        <NavBar/>
        <AlertCreateAccount alertCreateAccountState={alertCreateAccountState} 
                                            setAlertCreateAccountState={setAlertCreateAccountState} />

        <div className="max-w-7xl mx-auto space-y-8 container md:px-8 pb-20 md:pb-28 md:pt-8 lg:pt-16">
            <div className="space-y-4 md:px-4">
                <img src={content.image}alt={content.title}
               className="md:rounded-lg object-cover w-full h-[260px] sm:h-[340px] md:h-[587px] bg-amber-700"/>
            </div>
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="xl:w-3/4 space-y-8 ">
                    <article className="px-4">
                        <div className="flex">
                            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                                {content.category}
                            </span>
                            <span className="px-3 py-1 text-sm font-normal text-muted-foreground">
                                    {new Date(content.date).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    })}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold">{content.title}</h1>
                        <p className="mt-4 mb-10">{content.description}</p>
                        <div className="markdown">
                            <ReactMarkdown>{content.content}</ReactMarkdown>
                            
                        </div>
                    </article>

                    <div className="xl:hidden px-4">
                        <AuthorInfo />
                    </div>

                    <div className="md:px-4">                                      
                        <LikeBar likes={content.likes}/>
                        
                        <CommentBar/>
                    </div>
                </div>    
                <div className="hidden xl:block xl:w-1/4">
                    <div className="sticky top-4">
                        <AuthorInfo />
                    </div>
                </div>
            </div>
        </div> 
        <Footer/>
    </>
    );

}
    export default ViewPostPage