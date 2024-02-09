import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { FaGoogle } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { Alerter } from "./alerter";
import Study from "../imgs/studying-and-learning-online-concept-illustration-free-vector-Photoroom.png-Photoroom.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [signup, setSignUp] = useState(true);
  const [flipDirection, setFlipDirection] = useState("");
  const [username, setUsername] = useState("");


  function flipper() {
    setSignUp(!signup);
    setEmail("");
    setPassword("");
    // Toggle the flip direction based on the current state
    setFlipDirection(flipDirection === "flipIn" ? "flipOut" : "flipIn");
  }
  

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);
      setAlertMessage(error.message); // Set the error message for the alert
      setTimeout(() => {
        setAlertMessage(""); // Clear the alert message after 3 seconds
      }, 3000);
    }
  };

  const handleSignInWithEmailPassword = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);
      setAlertMessage(error.message); // Set the error message for the alert
      setTimeout(() => {
        setAlertMessage(""); // Clear the alert message after 3 seconds
      }, 3000);
      // Optionally, show an error message to the user
    }
  };
  const signUpWithEmailPassword = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Await the completion of the updateProfile call
      await updateProfile(userCredential.user, {
        displayName: username,
      });
     
      // On success, set a cookie or local storage
      Cookies.set("isLoggedIn", "true", { expires: 7 }); // Cookie expires in 7 days
      console.log(userCredential); // For debugging purposes
      navigate("/"); // Redirect to the main app page after sign up
    } catch (error) {
      console.error("Sign Up error:", error.message);
      setAlertMessage(error.message); // Set the error message for the alert
      setTimeout(() => {
        setAlertMessage(""); // Clear the alert message after 3 seconds
      }, 3000);
    }
  };
  
  console.log(username)

  return (
    <div className="signinpage h-screen w-screen flex flex-row justify-center items-center">
      <div className="signleft w-[50vw] h-[100vh]  flex justify-center items-center">
        <img className="h-[70vh] studyguy object-cover w-auto " src={Study} alt="" />
      </div>
      <div className="signRight w-[50vw] h-[100vh]  flex justify-center items-center flex-col">
        <div className="cardsignin flex pb-4 justify-start items-center flex-col">
        <span className="text-4xl logo mt-7">
          <LuBrainCircuit className="logo text-black drop-shadow-2xl shadow-black" />
        </span>
        <h1 className="signtitle text-6xl text-black my-4 flex font-extrabold">
          Welcome To Synapse!
        </h1>
        <p className="signsubtit text-2xl my-3 text-black mt-0">Your Study Buddy for every Exam!</p>
        <p className="minisub text-xl text-black my-3 mt-0"> 
          Start your journey with us and boost your learning experience.
        </p>
        <label
          htmlFor="AcceptConditions"
          className="relative h-8 w-28 mb-3 flex items-center  cursor-pointer rounded-full bg-black border transition [-webkit-tap-highlight-color:_transparent]"
        >
          <input
            onClick={flipper}
            type="checkbox"
            id="AcceptConditions"
            className="peer text-black sr-only"
          />
          <span className="absolute text-black w-fit inset-y-0 px-2 start-0 m-1 size-6 rounded-full bg-[#fdf4e4] transition-all peer-checked:start-9">
            {signup ? "Sign Up" : "Sign In"}
          </span>
        </label>

        <div className={`flipper ${flipDirection}`}>
      {signup? 
      
      // Signin form
      (<form
            onSubmit={handleSignInWithEmailPassword}
            className={signup?"flex flex-col gap-2":"flex flex-col gap-2"}
          >

            <div className="relative">
              <input
                type="email"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                type="password"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                  <circle cx="16.5" cy="7.5" r=".5" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleSignInWithEmailPassword}
              type="submit"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-black justify-center dark:text-[#fdf4e4]"
            >
              Sign In
            </button>
          </form>
          
        ) : (

          // Sign up form
          <form
            onSubmit={signUpWithEmailPassword}
            className={signup?"flex flex-col gap-2 ":"flex flex-col gap-2"}
          >
            <div className="relative">
              <input
                type="text"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                type="email"
                                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg className="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
            </div>
            <div className="relative">
              <input
                type="password"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg
  className="flex-shrink-0 w-4 h-4 text-gray-500"
  xmlns="http://www.w3.org/2000/svg"
  width={24}
  height={24}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
  <circle cx="16.5" cy="7.5" r=".5" />
</svg>
              </div>
            </div>

            <button
              onClick={signUpWithEmailPassword}
              type="submit"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-black justify-center dark:text-[#fdf4e4]"
            >
              Sign Up
            </button>
          </form>
        )}
        </div>
        <p className="mt-5 or text-xl text-black font-extrabold">Or</p>
        <button
          className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-black justify-center dark:text-[#fdf4e4] mt-5"
          onClick={signInWithGoogle}
        >
          Sign In with{" "}
          <span className="ml-1">
            <FaGoogle />
          </span>
        </button>
      </div>
      <div className="absolute z-100 top-0">
        {alertMessage && <Alerter name={alertMessage} />}
      </div>
        </div>
        </div>
  );
};

export default SignIn;
