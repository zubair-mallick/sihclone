"use client";

import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { getCareerGuidanceResponse } from "./actions";

const formatMessage = (message) => {
  console.log(message);

  // Convert **text** to bold text
  let formattedMessage = message.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );
  formattedMessage = formattedMessage.replace(/(\.)(\s|$)/g, "$1\n");
  return formattedMessage;
};

// Typing Indicator
const TypingIndicator = () => {
  const props = useSpring({
    opacity: 1,
    config: { duration: 500 },
    from: { opacity: 0 },
  });
  return (
    <animated.div
      style={props}
      className="flex items-center mb-3 text-gray-400"
    >
      <span className="animate-pulse">Loading...</span>
    </animated.div>
  );
};

// ChatBubble component
const ChatBubble = ({ message, sender }) => {
  // Format the message
  const formattedMessage = formatMessage(message);

  return (
    <div
      className={`flex items-start mb-3 ${
        sender === "ai" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg shadow-md ${
          sender === "ai" ? "bg-gray-700 text-white" : "bg-blue-500 text-white"
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
      </div>
    </div>
  );
};

// Counseling Chatbot Component
const CounselingChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageTimestamps, setMessageTimestamps] = useState([]);
  const chatEndRef = useRef(null);

  const formatChatHistory = () => {
    return messages
      .map(
        (msg) => `${msg.sender === "ai" ? "ai(you)" : "user"}: ${msg.message}`
      )
      .join("\n");
  };

  const handleSendMessage = async () => {
    const currentTime = Date.now();
    const oneMinuteAgo = currentTime - 60000;

    // Filter out messages older than 1 minute
    const recentMessages = messageTimestamps.filter(
      (timestamp) => timestamp > oneMinuteAgo
    );

    if (recentMessages.length >= 10) {
      alert(
        "You have reached the limit of 10 messages per minute. Please wait before sending more messages."
      );
      return;
    }

    // Add the current message timestamp
    setMessageTimestamps([...recentMessages, currentTime]);

    if (userInput.trim()) {
      // Add user message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), message: userInput, sender: "user" },
      ]);

      setUserInput("");
      setIsLoading(true);

      const chatHistory = formatChatHistory();

      try {
      

          const {response : botResponse} = await getCareerGuidanceResponse(userInput,chatHistory)

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), message: botResponse, sender: "ai" },
        ]);
      } catch (error) {
        console.error("Error communicating with chatbot:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now(),
            message: "An error occurred. Please try again.",
            sender: "ai",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      console.log(messages);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="container mx-auto text-center section">
      <h1 className="max-w-3xl py-2 mb-6 text-transparent title bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900">
        Career Counseling Chatbot
      </h1>

      <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-300">
        Our Career Counseling Chatbot is designed to help you navigate your
        career path, provide information, and solve your doubts. It offers a
        secure and anonymous space to discuss your career-related concerns, with
        personalized advice and resources to guide you.
      </p>

      <div className="p-6">
        <h2 className="mb-6 text-3xl font-bold text-white capitalize">
          Chatbot AI
        </h2>

        <div className="bg-gray-800 rounded-lg shadow-md flex-1 overflow-y-auto p-4 max-h-[60vh] min-h-[30vh]">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.message.replace(/["/]/g, "")}
              sender={msg.sender}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center pt-4 mt-4 border-t border-gray-700">
          <input
            type="text"
            className="flex-grow p-3 text-gray-300 placeholder-gray-500 bg-gray-800 border border-gray-600 rounded-l-lg focus:outline-none focus:border-transparent"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
          />
          <button
            className="p-3 text-white transition-colors bg-blue-600 rounded-r-lg hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounselingChatbot;
