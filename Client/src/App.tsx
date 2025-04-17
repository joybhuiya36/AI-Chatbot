import { useState, useEffect } from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import {
  useSendMessageMutation,
  useGetChatHistoryQuery,
  useGetAllConversationQuery,
} from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFreshConversation, setIsFreshConversation] = useState(true);
  const [initialMessage, setInitialMessage] = useState<string>();
  const [activeConversationId, setActiveConversationId] = useState<string>();

  // API calls
  const { data: allConversation } = useGetAllConversationQuery();
  const { data: messageHistory } = useGetChatHistoryQuery(
    activeConversationId || "",
    {
      skip: !activeConversationId,
    }
  );
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  // UseEffects
  useEffect(() => {
    // Close sidebar when clicking outside on mobile
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

  useEffect(() => {
    setInitialMessage(undefined);
  }, [messageHistory]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    if (!activeConversationId) {
      setInitialMessage(input);
    }
    setIsFreshConversation(false);

    try {
      const apiRequest = {
        message: input,
        ...(activeConversationId
          ? { conversationId: activeConversationId }
          : {}),
      };
      setInput("");

      const response = await sendMessage(apiRequest).unwrap();

      if (!activeConversationId) {
        setActiveConversationId(response.result.conversationId);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Methods
  const startNewChat = async () => {
    try {
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

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setIsFreshConversation(false);

    // Close mobile sidebar after selection
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <div className="chatbot-container">
      <Sidebar
        allConversation={allConversation?.result.data || []}
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
          messages={messageHistory?.result.messages || []}
          isFreshConversation={isFreshConversation}
          showLoading={isLoading}
          initialMessage={initialMessage}
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
