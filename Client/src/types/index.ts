export interface IConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConversationResponse {
  success: boolean;
  message: string;
  result: {
    data: IConversation[];
  };
}

export interface IChatMessage {
  message: string;
  author: "User" | "Assistant";
  timestamp: string;
}

export interface IChatMessageHistory extends IConversation {
  messages: IChatMessage[];
}

export interface IChatMessageHistoryResponse {
  success: boolean;
  message: string;
  result: IChatMessageHistory;
}
