export interface MessageItem {
  author: string;
  message: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: MessageItem[];
  createdAt: string;
  updatedAt: string;
}
