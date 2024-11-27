import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { SearchHistory } from "../components/Ecobot/SearchHistory";
import InputBar from "../components/Ecobot/InputBar";
import Chat from "../components/Ecobot/Chat";
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'tailwindcss/tailwind.css';

const EcoBot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = 'AIzaSyBXh39japRVTEI8lUu0_jUVaipeGqVdh70'; // Replace with your actual API key

    // Initialize GoogleGenerativeAI instance with API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const result = await model.generateContent(question);
        const response = await result.response;
        const text = await response.text();
        const plainText = text.replace(/[*#]/g, ''); // Remove markdown syntax

        // Process and format response
        const formattedResponse = formatResponse(plainText);

        setMessages([...messages, { type: 'user', text: question }]);

        // Display formatted response gradually
        for (let i = 0; i < formattedResponse.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust delay time as needed
            setMessages(prevMessages => [...prevMessages, { type: 'bot', text: formattedResponse[i] }]);
        }

        setQuestion('');
    } catch (error) {
        console.error('Error generating content:', error);
        setError('Error generating answer. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const formatResponse = (text) => {
    // Split text into paragraphs based on double newline
    const paragraphs = text.split(/\n{2,}/);

    // Apply formatting to each paragraph
    const formattedParagraphs = paragraphs.map(paragraph => {
        // Use regex to identify and format text within asterisks as bold
        let formattedText = paragraph.replace(/\*([^\*]+)\*/g, '<b>$1</b>');

        // Use regex to identify and format text within underscores as italic
        formattedText = formattedText.replace(/_([^_]+)_/g, '<i>$1</i>');

        return `<p>${formattedText}</p>`;
    });

    return formattedParagraphs;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} className="h-screen" />

      {/* Main Content */}
      <div className="relative flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Chat Section */}
            <div className="bg-white flex-[2] shadow-md rounded-lg border border-gray-300 p-6 flex flex-col relative h-full">
              <h2 className="font-bold text-2xl mb-4 text-gray-800">EcoChat</h2>
              <div className="flex-grow overflow-y-auto">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`my-2 px-4 py-2  rounded-xl ${
          message.type === 'user'
            ? 'bg-gray-100 text-right self-end ml-auto'
            : 'bg-green-100 text-left'
        }`}
        style={{
           // Ensures the bubble adjusts to content
          alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
          width: `fit-content`, // Adjust width dynamically to content
          maxWidth: '50%', // Prevents bubbles from exceeding half the container width
          wordWrap: 'break-word', // Wrap long words
          overflowWrap: 'break-word', // Ensures long unbroken text wraps correctly
          padding: '0.5rem 1rem', // Consistent padding for bubbles
        }}
        dangerouslySetInnerHTML={{ __html: message.text }}
      ></div>
    ))}
  </div>
              <form onSubmit={handleSubmit} className="p-4 flex items-center border-t border-gray-300">
    <input
      type="text"
      placeholder="Type your question here..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      className="flex-1 p-2 border rounded border-gray-300 mr-2"
      required
    />
    <button
      type="submit"
      className="bg-green-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
      disabled={loading}
    >
      {loading ? 'Sending...' : 'Send'}
    </button>
  </form>
            </div>

            {/* History Section */}
            <div className="bg-white flex-[1] shadow-md rounded-lg border border-gray-300 p-6 flex flex-col h-full">
              <h2 className="font-bold text-2xl mb-4 text-gray-800">
                History
              </h2>
              <div className="flex-grow overflow-y-auto">
                <SearchHistory />
              </div>
              <div className="mt-4">
                <Button
                  variant="outlined"
                  className="text-red-500 border-red-500 hover:bg-red-100 w-full"
                >
                  Clear History
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EcoBot;
