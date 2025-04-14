import { X} from 'lucide-react';
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
  } from "@/components/ui/alert-dialog"

function AlertDeleteArticle({alertDeleteArticleState,setAlertDeleteArticleState,deleteData}) {  
    return (
      <AlertDialog open={alertDeleteArticleState} onOpenChange={setAlertDeleteArticleState}>
        <AlertDialogContent className="bg-white rounded-md pt-16 pb-12 max-w-[26rem] sm:max-w-lg flex flex-col items-center gap-6">
          <AlertDialogTitle className="text-3xl font-bold pb-2 text-center">Delete article</AlertDialogTitle>
          <AlertDialogTitle className="text-xl pb-2 text-center text-[#75716B] font-normal">Do you want to delete this article?</AlertDialogTitle>
          <div className="flex gap-2 ">
            <Button variant="whiteButton" className="rounded-full py-6 px-10 text-lg "onClick={()=>setAlertDeleteArticleState(false)}>Cancel</Button>
            <Button variant="blackButton" className="rounded-full py-6 px-10 text-lg "onClick={()=>{deleteData()}}>Delete</Button>
          </div>
          <AlertDialogCancel onClick={() => setAlertDeleteArticleState(false)} className="absolute right-4 top-2 sm:top-4 p-1 border-none cursor-pointer">
            <X className="h-6 w-6"/>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    );
  }  
  export default AlertDeleteArticle