import { X} from 'lucide-react';
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription, 
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"

function AlertDialogBox({title,content,buttonLeft,functionButtonLeft,functionButtonRight,buttonRight,alertState,setAlertState,disable=false}) {
    return (
        <AlertDialog open={alertState} onOpenChange={setAlertState}>
            <AlertDialogContent className="bg-white rounded-md pt-16 pb-12 max-w-[26rem] sm:max-w-lg flex flex-col items-center gap-6">
                <AlertDialogTitle className="text-3xl font-bold pb-2 text-center">{title}</AlertDialogTitle>
                <AlertDialogDescription className="text-xl pb-2 text-center text-[#75716B] font-normal">{content}</AlertDialogDescription>
                <div className="flex gap-2 ">
                    <Button variant="whiteButton" disabled={disable} className="rounded-full py-6 px-10 text-lg "onClick={()=>{functionButtonLeft()}}>{buttonLeft}</Button>
                    <Button variant="blackButton" disabled={disable} className="rounded-full py-6 px-10 text-lg "onClick={()=>{functionButtonRight()}}>{buttonRight}</Button>
                </div>
                <AlertDialogCancel onClick={() => setAlertState(false)} className="absolute right-4 top-2 sm:top-4 p-1 border-none cursor-pointer">
                    <X className="h-6 w-6"/>
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    );
}
export default AlertDialogBox