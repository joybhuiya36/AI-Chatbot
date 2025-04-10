import React from "react";
import "./index.scss";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  isFreshConversation: boolean;
  isSendButtonDisabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSend,
  isFreshConversation,
  isSendButtonDisabled,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      className={`chat-input ${
        isFreshConversation ? "chat-input--centered" : ""
      }`}
    >
      <div className="chat-input__container">
        <input
          className="chat-input__field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isFreshConversation ? "Ask anything" : "Type your message here..."
          }
        />
        <button
          className={`chat-input__send-btn ${
            input.trim() === "" ? "chat-input__send-btn--disabled" : ""
          }`}
          onClick={handleSend}
          disabled={input.trim() === "" || isSendButtonDisabled}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      {!isFreshConversation && (
        <div className="chat-input__disclaimer">
          AI responses are generated and may not always be accurate. Verify
          important information.
        </div>
      )}
    </div>
  );
};

export default ChatInput;
