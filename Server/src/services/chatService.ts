import { GEN_AI } from "../utils/genAIConfig";
import chatRepository from "../repositories/chatRepository";
import docClient from "../utils/dynamoConfig";
import { ERROR_MESSAGES, PROMPT_TEMPLATES } from "../common/messages";

class ChatService {
  async getAllConversation() {
    return await chatRepository.findAllConversation();
  }

  async getChatHistory(conversationId: string): Promise<any> {
    const conversation = await chatRepository.findChatHistory(conversationId);
    if (!conversation) {
      throw new Error(ERROR_MESSAGES.CONVERSATION_NOT_FOUND);
    }

    return conversation;
  }

  async processMessage(message: string, conversationId?: string): Promise<any> {
    if (!conversationId) {
      const prompt = PROMPT_TEMPLATES.TITLE_GENERATION + message;
      const aiResponse = await GEN_AI(prompt);

      const conversation = await chatRepository.createConversation(
        aiResponse?.replace("\n", "") || ""
      );
      conversationId = conversation.id;
    }

    const conversation = await chatRepository.findChatHistory(conversationId);
    if (!conversation) {
      throw new Error(ERROR_MESSAGES.CONVERSATION_NOT_FOUND);
    }

    let prompt = PROMPT_TEMPLATES.ASSISTANT_ROLE;

    (conversation.messages || []).forEach((message: any) => {
      prompt += message.author + ": " + message.message + "\n";
    });
    prompt += `User: ${message}\nAssistant:`;

    const aiResponse = await GEN_AI(prompt);

    await chatRepository.updateConversation(
      conversationId,
      message,
      aiResponse || ""
    );

    return {
      conversationId,
      aiResponse,
    };
  }
}

export default new ChatService();
