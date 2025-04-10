import { useState, useEffect } from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import {
  useSendMessageMutation,
  useGetChatHistoryQuery,
  useCreateConversationMutation,
} from "./services/api";
import { Message } from "./types";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "General Assistance" },
    { id: 2, title: "Writing Help" },
    { id: 3, title: "Code Generation" },
  ]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFreshConversation, setIsFreshConversation] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState<number>();

  // API calls
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const { data: historyData } = useGetChatHistoryQuery();
  const [createConversation] = useCreateConversationMutation();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileSidebarOpen &&
        !target.closest(".sidebar") &&
        !target.closest(".chat-header__menu-btn")
      ) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  // Update chat history from API when available
  useEffect(() => {
    if (historyData) {
      setChatHistory(historyData);
      if (historyData.length > 0 && !activeConversationId) {
        setActiveConversationId(historyData[0].id);
      }
    }
  }, [historyData, activeConversationId]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Set fresh conversation to false when user sends a message
    setIsFreshConversation(false);

    // Add user message
    setMessages([...messages, { text: input, sender: "user" }]);

    try {
      const response = await sendMessage(input).unwrap();

      // Add bot response from API
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text:
            response.message || "I'm sorry, I couldn't process your request.",
          sender: "bot",
        },
      ]);
    } catch (error) {
      // Handle error
      console.error("Failed to send message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, there was an error processing your request.",
          sender: "bot",
        },
      ]);
    }

    setInput("");
  };

  const startNewChat = async () => {
    try {
      // Create new conversation using API
      // await createConversation().unwrap();

      setMessages([]);
      setIsFreshConversation(true);
      setActiveConversationId(undefined);
      setInput("");

      if (window.innerWidth <= 768) {
        setIsMobileSidebarOpen(false);
      }
    } catch (error) {
      console.error("Failed to create new conversation:", error);
    }
  };

  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
    // TODO: Here you would typically fetch the messages for this conversation
    setMessages([]);
    setIsFreshConversation(false);

    // Close mobile sidebar after selection
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
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
      />

      <div className="main-content">
        <ChatHeader
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />

        <MessageList
          messages={messages}
          isFreshConversation={isFreshConversation}
        />

        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isFreshConversation={isFreshConversation}
          isSendButtonDisabled={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
