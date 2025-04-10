import React, { useEffect, useRef } from "react";
import "./index.scss";

interface Message {
  text: string;
  sender: string;
}

interface MessageListProps {
  messages: Message[];
  isFreshConversation: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isFreshConversation,
}) => {
  // Create a ref for scrolling to the latest message
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isFreshConversation) {
    return (
      <div className="message-list message-list--fresh">
        <div className="message-list__welcome">
          <h1>How can I assist you?</h1>
        </div>
      </div>
    );
  }

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
      {/* This empty div will be used as the scroll target */}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
