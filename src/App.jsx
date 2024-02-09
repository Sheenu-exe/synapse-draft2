import  { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from './assets/components/firebase.config'; // Update the path as per your firebaseConfig file location

import { Background } from "./assets/components/background";
import Foreground from "./assets/components/foreground";
import SignIn from "./assets/components/singIn"; // Ensure correct path and file name
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check cookie on component mount
    const isUserAuthenticated = Cookies.get('userAuthenticated') === 'true';
    setIsAuthenticated(isUserAuthenticated);

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in.
        Cookies.set('userAuthenticated', 'true', { expires: 1 }); // expires in 1 day
        setIsAuthenticated(true);
      } else {
        // User is signed out.
        Cookies.remove('userAuthenticated');
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={!isAuthenticated ? <SignIn /> : <Navigate replace to="/" />} />
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <>
                <Background />
                <div id="main">
                  <Foreground />
                </div>
              </>
            ) : (
              <Navigate replace to="/signin" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
