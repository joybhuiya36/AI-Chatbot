import React, { useEffect, useRef } from "react";
import "./index.scss";
import { IChatMessage } from "../../types";
import TypingAnimation from "../TypingAnimation";
import ReactMarkdown from "react-markdown";

interface MessageListProps {
  messages: IChatMessage[];
  isFreshConversation: boolean;
  showLoading?: boolean;
  initialMessage?: string;
}

const AUTHOR = {
  USER: "User",
  ASSISTANT: "Assistant",
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isFreshConversation,
  showLoading = false,
  initialMessage,
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
      {!initialMessage ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`message-list__row message-list__row--${message.author}`}
          >
            <div className="message-list__avatar">
              {message.author === AUTHOR.ASSISTANT ? "AI" : "U"}
            </div>
            <div className="message-list__content">
              {message.author === AUTHOR.ASSISTANT ? (
                <div>
                  <ReactMarkdown>{message.message}</ReactMarkdown>
                </div>
              ) : (
                <div>{message.message}</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={`message-list__row message-list__row--${AUTHOR.USER}`}>
          <div className="message-list__avatar">U</div>
          <div className="message-list__content">
            <div>{initialMessage}</div>
          </div>
        </div>
      )}
      {showLoading && (
        <div
          className={`message-list__row message-list__row--${AUTHOR.ASSISTANT}`}
        >
          <div className="message-list__avatar">AI</div>
          <div className="message-list__content">
            <div>
              <TypingAnimation />
            </div>
          </div>
        </div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
