import { useState, useEffect } from 'react';
import { TbWritingSign } from "react-icons/tb";
import { LuBrainCircuit } from 'react-icons/lu';
import { TiDelete } from 'react-icons/ti';
import '../../App.css';
import Cookies from 'js-cookie';
import { auth, db } from './firebase.config';
import { FaRunning } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Success } from './success';
import "./Comp.css"
function Foreground() {
  const [cards, setCards] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [btnMenu, setBtnMenu] = useState(false);
  const [deleteMsg, setDelMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [font, setFont] = useState('font-roboto'); 


  const handleFontChange = (e) => {
    setFont(e.target.value);
  };

  const menuAppear = () => {
    setBtnMenu(!btnMenu);
  };

  useEffect(() => {
    const fetchCards = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'flashcards'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const loadedCards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(loadedCards);
      }
    };

    fetchCards();
  }, []);

  const closer = () => {
    setShowInput(false);
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      Cookies.remove('userAuth');
      console.log('User signed out successfully and cookie removed.');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddCardClick = () => {
    setShowInput(true);
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleInputConfirm = async () => {
    if (heading.trim() && description.trim()) {
      const newCard = {
        heading: heading,
        description: description,
        size: true,
        userId: auth.currentUser.uid,
        font: font, // Include font here
      };

      try {
        const docRef = await addDoc(collection(db, 'flashcards'), newCard);
        console.log('Document written with ID: ', docRef.id);
        newCard.id = docRef.id;
        setCards([...cards, newCard]);
      } catch (e) {
        console.error('Error adding document: ', e);
      }

      setHeading('');
      setDescription('');
    }
    setShowInput(false);
  };

  const handleDeleteCard = async (cardId) => {
    await deleteDoc(doc(db, 'flashcards', cardId));
    setCards(cards.filter((card) => card.id !== cardId));
    
    // Set message and show alert
    setDelMsg("Deleted Successfully");
    setShowAlert(true);
  
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
      setDelMsg(""); // Optionally clear message
    }, 3000);
  };

  const sizeChanger = (cardId) => {
    setCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, size: !card.size } : card
      )
    );
  };

  return (
    <div className="p-4 w-full h-screen pb-5">
      {showAlert && <Success message={deleteMsg} />}
      
      <div className='flex btnhandler items-center flex-col fixed z-50 text-2xl right-10 bottom-10 '>
      <ul className={btnMenu?"flex flex-col items-center justify-center text-2xl bottom-32 ":"hidden"}>
        <li className='my-3'>
        <label className="swap swap-rotate bg-black rounded-badge p-2">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" className="theme-controller" value={"light"} />
  
  {/* sun icon */}
  <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  
  {/* moon icon */}
  <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label>
        </li>
      <li><button onClick={signOut} className='btn flex justify-center items-center bg-red-700 w-15 h-15 hover:bg-red-500 text-white font-bold  rounded-full'><FaRunning /></button></li>
        <li><button onClick={handleAddCardClick} className='btn flex justify-center items-center bg-zinc-500 h-15 hover:bg-zinc-700 text-white font-bold  my-4 rounded-full'><span className='text-4xl m-0'><TbWritingSign /></span></button></li>
      </ul>
        <button
          onClick={menuAppear}
          className="flex justify-center items-center bg-zinc-500 w-15 h-15 hover:bg-zinc-700 text-white font-bold py-2 px-2 rounded-full"
        >
          <span className='text-6xl'><LuBrainCircuit /></span>
        </button>
      </div>
        
      <div className="fixed z-50 bottom-0 right-0 flex flex-col-reverse">
        {showInput && (
          <div className="relative backdrop-blur-xl z-10 h-screen w-screen flex justify-center items-center">
            <button className="closeinput absolute right-10 top-10 text-red-400 text-6xl" onClick={closer}>
              <TiDelete />
            </button>
            <div className="inputbox bg-white flex rounded-2xl flex-col p-4">
              <input
                type="text"
                value={heading}
                onChange={handleHeadingChange}
                className="border border-gray-300 m-4 p-2 rounded-lg"
                placeholder="Heading"
              />
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="border m-4 border-gray-300 p-2 rounded-lg"
                placeholder="Description"
              />
              <select
            value={font}
            onChange={handleFontChange}
            className="border m-4 border-gray-300 p-2 rounded-lg"
          >
            <option value="font-roboto">Roboto</option>
            <option value="font-open-sans">Open Sans</option>
            {/* Add more font options as needed */}
          </select>
              <button
                onClick={handleInputConfirm}
                className="border m-4 border-gray-300 p-2 rounded-lg bg-zinc-600 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onDoubleClick={() => sizeChanger(card.id)}
            className={
              card.size
                ? 'cardbody p-4 overflow-hidden backdrop-blur-md shadow-xl mx-3 relative h-72 w-56 rounded-3xl animate__animated animate__fadeIn'
                : 'cardbodybig overflow-visible min-h-screen max-h-fit flex flex-col m-0  w-screen p-0 backdrop-blur-md absolute z-50 animate__animated animate__fadeIn'
            }
          >
            <div className="head flex mb-3 flex-row justify-between items-center">
              <LuBrainCircuit className={card.size ? 'text-2xl logoshort' : 'text-6xl logobig'} />
              <button
                onClick={() => handleDeleteCard(card.id)}
                className={
                  card.size ? 'absolute delshort text-red-300 top-3 right-3 text-3xl font-bold justify-center items-center rounded-full hidden' : 'text-red-500 text-4xl deleterfull mr-10 font-bold flex justify-center items-center rounded-full'
                }
              >
                <MdDelete />
              </button>
            </div>
            <h3 className={card.size ? 'font-bold text-current text-3xl' : 'cardtitle font-bold mb-10 text-6xl w-[90vw]'}>
              {card.heading}
            </h3>
            <p className={card.size ? 'my-2 mb-2 text-current text-lg whitespace-pre-wrap' : 'carddesc my-2 mb-2 text-2xl w-[98vw] whitespace-pre-wrap'}>
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Foreground;
