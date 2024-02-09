import { MdDeleteSweep } from "react-icons/md";
import "animate.css"
export const Success = () =>{
    return(
        <div className="bg-teal-500 successalert flex items-center text-sm text-white rounded-lg p-4 z-[102] absolute top-5 left-10 animate__animated success animate__slideInDown"  role="alert">
  <span className="font-bold text-3xl"><MdDeleteSweep/></span> Card Deleted Successfully!
</div>
    )
}