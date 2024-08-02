import React, { useState } from 'react';
import axios from 'axios';
import { IoChatboxOutline, IoArrowUpCircle } from 'react-icons/io5'; // Importing the chat and arrow icons
import Sidebar from "../../components/Sidebar";

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const [messages, setMessages] = useState([]); // State to manage chat messages

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post('http://localhost:8000/query', { query });
      const newResponse = result.data.response;
      console.log(newResponse)
      setResponse(newResponse);
      setMessages(prevMessages => [...prevMessages, { text: query, isUser: true }, { text: newResponse, isUser: false }]);
      setError('');
      setQuery('');
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex dark:bg-gray-900 dark:text-white">
      <Sidebar isOpen={isSidebarOpen} />

      <div className={`main-content ${isSidebarOpen ? 'shifted-content' : ''}`}>
        <div className="ml-10 w-screen h-screen dark:bg-gray-900 dark:text-white flex flex-col justify-between">
          <div className="container">
            <h1 className="text-3xl font-bold mb-8 dark:bg-gray-900 text-gray-800 dark:text-white">Medical Bot</h1>
            <div className="mt-8">
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
          <div className="chat-container mb-8 ml-48 flex flex-col-reverse"> {/* Reverse the flex direction */}
            <div className="chat-messages flex flex-col"> {/* Flex column */}
              {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center"> 
              <input
                id="query"
                type="text"
                value={query}
                onChange={handleChange}
                className="appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/3"
                placeholder="Enter your query..."
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                <IoArrowUpCircle color="#ffffff" size={24} />
              </button>
            </form>
          </div>
        </div>

        <button
          className="fixed bottom-4 right-4 rounded-full border-2 border-white bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center h-12 w-12 focus:outline-none focus:shadow-outline"
          onClick={toggleSidebar}
        >
          <IoChatboxOutline color="#ffffff" size={24} />
        </button>
      </div>

      <style>
        {`
          .chat-container {
            height: calc(100% - 4rem);
            display: flex;
            flex-direction: column;
          }

          .chat-messages {
            flex-grow: 1;
            overflow-y: auto;
            padding: 1rem;
          }

          .chat-message {
            max-width: 50%;
            margin-bottom: 1rem;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
          }

          .user-message {
            align-self: flex-start;
            background-color: #023020;
          }

          .bot-message {
            align-self: flex-start;
            background-color: #000000;
          }
        `}
      </style>
    </div>
  );
}

export default App;
