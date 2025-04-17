import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      any,
      { message: string; conversationId?: string }
    >({
      query: ({ message, conversationId }) => ({
        url: "/chat",
        method: "POST",
        body: { message, conversationId },
      }),
    }),

    // Get chat history
    getChatHistory: builder.query<any, string | void>({
      query: (conversationId) =>
        conversationId
          ? `/history?conversationId=${conversationId}`
          : "/history",
    }),

    // Create a new conversation
    createConversation: builder.mutation<any, void>({
      query: () => ({
        url: "/conversation",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetChatHistoryQuery,
  useCreateConversationMutation,
} = apiSlice;
