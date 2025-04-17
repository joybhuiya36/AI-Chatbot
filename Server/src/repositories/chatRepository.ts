import { title } from "process";
import docClient from "../utils/dynamoConfig";
import { v4 as uuidv4 } from "uuid";
import { Conversation } from "../types/types";

class ChatRepository {
  async findAllConversation(): Promise<any> {
    let params: any = {
      TableName: "Conversations",
      ProjectionExpression: "id, title, createdAt",
    };

    const data = await docClient.scan(params).promise();
    return data.Items || [];
  }

  async findChatHistory(conversationId: string): Promise<any> {
    let params = {
      TableName: "Conversations",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": conversationId,
      },
    };

    const data = await docClient.query(params).promise();
    return data.Items?.[0] || null;
  }

  async createConversation(title: string): Promise<Conversation> {
    const conversation = {
      id: uuidv4(),
      title,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    await docClient
      .put({
        TableName: "Conversations",
        Item: conversation,
      })
      .promise();

    return conversation;
  }

  async updateConversation(
    conversationId: string,
    userMessage: string,
    aiResponse: string
  ): Promise<any> {
    const params = {
      TableName: "Conversations",
      Key: { id: conversationId },
      UpdateExpression:
        "SET messages = list_append(if_not_exists(messages, :empty_list), :message)",
      ExpressionAttributeValues: {
        ":message": [
          {
            message: userMessage,
            author: "User",
            timestamp: new Date().toISOString(),
          },
          {
            message: aiResponse,
            author: "Assistant",
            timestamp: new Date().toISOString(),
          },
        ],
        ":empty_list": [],
      },
    };

    const update = await docClient.update(params).promise();

    return update;
  }
}

export default new ChatRepository();
