import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! 👋 I'm an AI assistant powered by Groq Cloud. I can answer questions about Aadhithya's projects, skills, education, and experience. What would you like to know?", 
      isUser: false 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => { 
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Portfolio data
  const getPortfolioData = () => {
    return `
      Name: Aadhithya R
      Location: Erode, Tamil Nadu
      Email: aadhithyaa120@gmail.com
      Education: B.Tech in AI & Data Science (Kongu Engineering College)
      Roles: Full Stack Developer, ML Engineer, Data Analyst, AI Specialist
      Projects: QuikCart, Traffic Prediction System, FarmConnect, Brain Tumor Detection AI
      Skills: C, Python, Java, React, Node.js, MongoDB, HTML, CSS, JavaScript
    `;
  };

  const generateResponse = async (userMessage) => {
    try {
      setIsLoading(true);
      
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();
      const text = data.reply || "I'm sorry, I couldn't process that request.";

      return text;
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm sorry, I encountered an error while processing your request. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = { id: Date.now(), text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    const botResponse = await generateResponse(inputMessage);
    const botMsg = { id: Date.now() + 1, text: botResponse, isUser: false };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md h-[500px] flex flex-col bg-black/90 backdrop-blur-sm rounded-xl border border-purple-500/50 shadow-2xl shadow-purple-500/20">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30 rounded-t-xl bg-gradient-to-r from-purple-900/50 to-black">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h3 className="ml-2 text-lg font-semibold text-purple-300">Portfolio Assistant</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black to-gray-900/20">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.isUser ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white' : 'bg-gray-800 text-gray-100 border border-purple-500/30'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 border border-purple-500/30 px-4 py-2 rounded-2xl max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-500/30 bg-gradient-to-r from-black to-gray-900/20">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Aadhithya"
            className="flex-1 bg-gray-800 text-white border border-purple-500/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            rows="1"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center justify-center"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by Groq Cloud API
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
