import React from "react";
import "./index.scss";

interface ChatHeaderProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) => {
  return (
    <div className="chat-header">
      <button
        className="chat-header__menu-btn"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h2 className="chat-header__title">AI Assistant</h2>
    </div>
  );
};

export default ChatHeader;
