// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import formGif from "../../assets/img/form.gif";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const candidateId = location.state ? location.state.candidateId : null; // Check if location.state exists

  useEffect(() => {
    console.log(candidateId);
  }, [candidateId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar candidateId={candidateId} />
      {/* Main Content */}
      <div className={`flex flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900 p-8 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="w-full ml-56 max-w-4xl">
          <p className="text-2xl font-bold ml-7 mb-4 text-gray-800 dark:text-white">Welcome, {candidateId}</p>
          {/*<FormComponent />
        </div>
        <div className=" flex justify-center items-center"> {/* Adjusted width for the GIF container */}
          <img src={formGif} alt="Form GIF" className="max-w-full max-h-full object-cover transform scale-120" /> {/* Increased size by 20% */}
        </div>
      </div>
    </div>
  );
};

export default App;
