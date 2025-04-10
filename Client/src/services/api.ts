import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<any, string>({
      query: (message) => ({
        url: "/chat",
        method: "POST",
        body: { message },
      }),
    }),

    // Get chat history
    getChatHistory: builder.query<any, void>({
      query: () => "/history",
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
