import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChatMessageHistoryResponse, IConversationResponse } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["Conversation", "ChatHistory"],
  endpoints: (builder) => ({
    // Get chat history
    getAllConversation: builder.query<IConversationResponse, void>({
      query: () => "/conversation",
      providesTags: ["Conversation"],
    }),

    // Get chat history
    getChatHistory: builder.query<IChatMessageHistoryResponse, string>({
      query: (conversationId) => `/history/${conversationId}`,
      providesTags: ["ChatHistory"],
    }),

    // Send a message and get AI response
    sendMessage: builder.mutation<
      any,
      { message: string; conversationId?: string }
    >({
      query: ({ conversationId, message }) => ({
        url: "/process-message",
        method: "POST",
        body: { conversationId, message },
      }),

      // Optimistic update for the chat history
      async onQueryStarted(
        { conversationId, message },
        { dispatch, queryFulfilled }
      ) {
        if (!conversationId) return;

        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getChatHistory",
            conversationId,
            (draft) => {
              draft.result.messages.push({
                message,
                author: "User",
                timestamp: new Date().toISOString(),
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["ChatHistory", "Conversation"],
    }),
  }),
});

export const {
  useGetAllConversationQuery,
  useGetChatHistoryQuery,
  useSendMessageMutation,
} = apiSlice;
