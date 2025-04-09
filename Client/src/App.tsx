import { useState, useEffect } from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI assistant. How may I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "General Assistance" },
    { id: 2, title: "Writing Help" },
    { id: 3, title: "Code Generation" },
  ]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileSidebarOpen &&
        !target.closest(".sidebar") &&
        !target.closest(".hamburger-menu")
      ) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { text: input, sender: "user" }]);

    // Simulate bot response (in a real app, you'd call an API here)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "I'm your virtual assistant. I've processed your message and here's my response. I can provide information on various topics, help with tasks, or just chat if you'd like to have a conversation.",
          sender: "bot",
        },
      ]);
    }, 1000);

    setInput("");
  };

  const startNewChat = () => {
    setChatHistory([
      { id: Date.now(), title: "New Conversation" },
      ...chatHistory,
    ]);
    setMessages([
      {
        text: "Hello! I'm your AI assistant. How may I help you today?",
        sender: "bot",
      },
    ]);
    setInput("");
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <div className="chatbot-container">
      <Sidebar
        chatHistory={chatHistory}
        startNewChat={startNewChat}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />

      <div className="main-content">
        <ChatHeader
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />

        <MessageList messages={messages} />

        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  );
}

export default App;
