
import "animate.css";
import { LuBrainCircuit } from "react-icons/lu";
import { useAuth } from './useAuth'; // Adjust the path as necessary
import "./Comp.css"
export const Background = () => {
    const { currentUser } = useAuth();
    console.log(currentUser.displayName)
    const username = currentUser?.displayName || 'Guest'; // Fallback to 'Guest' if no user name

    return (
        <div className="fixed flex-col -z-10 flex justify-center items-center w-full h-screen">
            <nav className="">
                <p className="subtitle text-zinc-400 flex items-center font-bold text-lg animate__animated animate__fadeIn">Welcome, {username}</p>
            </nav>
            <h3 className="title text-9xl animate__animated animate__fadeIn font-extrabold flex text-zinc-400"><LuBrainCircuit/>Synapse.</h3>

        </div>
    );
};
