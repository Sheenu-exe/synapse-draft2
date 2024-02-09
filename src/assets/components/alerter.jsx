import "animate.css"
import "./../../App.css"

export const Alerter = ({name}) =>{
    return(
        <div
  className="alerter bg-red-500 mt-2 text-sm text-white rounded-lg p-4 animate__animated animate__slideInDown"
  role="alert"
>
  <span className="font-bold mr-1">Error</span> {name}
</div>
    )
}