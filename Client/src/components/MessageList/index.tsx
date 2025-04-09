import React from "react";
import "./index.scss";

interface Message {
  text: string;
  sender: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-list__row message-list__row--${message.sender}`}
        >
          <div className="message-list__avatar">
            {message.sender === "bot" ? "AI" : "U"}
          </div>
          <div className="message-list__content">{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
