import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { IoChatboxOutline } from 'react-icons/io5'; // Importing the chat icon
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import QrComponent from "../../components/QrComponent";
import axios from "axios";


const Dashboard = () => {
  const location = useLocation();
  const [data, setData] = useState('');
  const [email, setEmail] = useState(location.state.candidateemail);
  const [candidateId, setCandidateId] = useState(location.state.candidateId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [userData, setUserData] = useState(null); // State to hold user data
  const [faq, setFaq] = useState(Array.from({ length: 4 }, () => "")); // Initialize with empty strings
  
  useEffect(() => {
    // Fetch user data from Express server
    fetchUserData();
    // Start typing FAQ
    const originalFaq = [
      "What are the common symptoms of diabetes?",
      "How can I prevent heart disease?",
      "What should I do if I experience persistent coughing?",
      "What are the risk factors associated with high blood pressure?"
    ];
    let currentIndex = 0;
    let currentLength = 0;
    const intervalId = setInterval(() => {
      // Continuously add characters to the current question
      if (currentIndex < originalFaq.length) {
        const currentQuestion = originalFaq[currentIndex];
        if (currentLength < currentQuestion.length) {
          setFaq(prevFaq => {
            const updatedFaq = [...prevFaq];
            updatedFaq[currentIndex] = currentQuestion.substring(0, currentLength + 1);
            return updatedFaq;
          });
          currentLength++;
        } else {
          currentIndex++;
          currentLength = 0;
        }
      } else {
        setFaq(Array.from({ length: 4 }, () => "")); // Reset all questions to empty strings
        currentIndex = 0; // Reset index to repeat questions infinitely
      }
    }, 100); // Typing speed: 100 milliseconds per character
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchUserData = async () => {
    let formData = new FormData();
    console.log(candidateId)
      formData.append("candidateId", candidateId);
    try {
      let res = await axios.post(
        `http://localhost:5000/auth/getCandidateId`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      {/*console.log(res.data.candidate)*/}
      if (res) {
        console.log(res)
        // const userData = await response.json();
        // setUserData(userData);
        setIsButtonVisible(true); // Show the button after content is loaded
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <div className="flex h-screen">
      <Sidebar toggleSidebar={toggleSidebar} candidateId={candidateId}/>
      
      {/* Main Content */}
      <div className={`flex flex-1 bg-gray-50 dark:bg-gray-900 p-8 relative ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="w-1/2 h-2/3 flex justify-center ">
          <div className="w-full max-w-md ml-56 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">User Details</p>
            {/* Display user details */}
            <div className="flex items-center justify-center mb-4">
              {/* React icon for user photo */}
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUserCircle color="#000" size={96} />
              </div>
            </div>
            <p className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Username: {email}</p>
          </div>
        </div>
        <div className="w-1/2 h-1/2 flex justify-center">
          <QrComponent />
        </div>
        
        {/* Frequently Asked Questions */}
        <div className="absolute w-screen h-1/4  bottom-10 left-72">
          <div className="w-4/5 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Frequently Asked Questions</p>
            {faq.map((question, index) => (
              <p key={index} className="text-gray-800 dark:text-white">{question}</p>
            ))}
          </div>
        </div>
        
        {/* Transparent hovering button with animation */}
        {isButtonVisible && (
          <button
            className={`absolute bottom-4 right-4 rounded-full border-2 border-white ${isButtonClicked ? 'border-red-500' : 'border-blue-500'} hover:bg-gray-600 transition-all duration-500 flex justify-center items-center floating-btn`}
            onClick={handleButtonClick}
            style={{
              width: '50px',
              height: '50px',
              zIndex: 1, // Ensure the button is above other elements
            }}
          >
            {/* Chat icon */}
            <IoChatboxOutline color="#ffffff" size={24} />
          </button>
        )}
      </div>
      
      {/* Style tag for CSS */}
      <style>
        {`
          .floating-btn {
            animation: floatBtn 2s ease infinite;
          }

          @keyframes floatBtn {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
