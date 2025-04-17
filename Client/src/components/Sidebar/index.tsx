import React from "react";
import "./index.scss";
import { IConversation } from "../../types";

interface SidebarProps {
  allConversation: IConversation[];
  startNewChat: () => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
  activeConversationId: string | undefined;
  onSelectConversation: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  allConversation,
  startNewChat,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  activeConversationId,
  onSelectConversation,
}) => {
  return (
    <div
      className={`sidebar ${isMobileSidebarOpen ? "sidebar--mobile-open" : ""}`}
    >
      <button
        className="sidebar__close-btn"
        onClick={() => setIsMobileSidebarOpen(false)}
      >
        &times;
      </button>
      <div className="sidebar__header">
        <button className="sidebar__new-chat-btn" onClick={startNewChat}>
          + New Conversation
        </button>
      </div>
      <div className="sidebar__chat-history">
        {allConversation.map((chat) => (
          <div
            key={chat.id}
            className={`sidebar__history-item ${
              activeConversationId === chat.id
                ? "sidebar__history-item--active"
                : ""
            }`}
            onClick={() => onSelectConversation(chat.id)}
          >
            {chat.title}
          </div>
        ))}
      </div>
      <div className="sidebar__footer">
        <div className="sidebar__user-info">
          <div className="sidebar__user-avatar">U</div>
          <div className="sidebar__user-name">User</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
