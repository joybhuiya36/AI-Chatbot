import { NextFunction, Request, Response } from "express";
import chatService from "../services/chatService";
import HttpStatus from "../common/httpStatus";
import { failure, success } from "../common/commonResponse";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";

class ChatController {
  // Bind methods in constructor
  constructor() {
    this.getAllConversation = this.getAllConversation.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
    this.processMessage = this.processMessage.bind(this);
  }

  async getAllConversation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const conversation = await chatService.getAllConversation();
      return res
        .status(HttpStatus.OK)
        .send(success(SUCCESS_MESSAGES.CONVERSATION_FETCHED, conversation));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async getChatHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { conversationId } = req.query;

      const messages = await chatService.getChatHistory(
        conversationId as string
      );
      return res
        .status(HttpStatus.OK)
        .send(success(SUCCESS_MESSAGES.CHAT_HISTORY_FETCHED, messages));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async processMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { message, conversationId } = req.body;

      if (!message) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(failure(ERROR_MESSAGES.MESSAGE_REQUIRED));
      }

      const processedMessage = await chatService.processMessage(
        message,
        conversationId
      );

      return res
        .status(HttpStatus.OK)
        .send(success(SUCCESS_MESSAGES.MESSAGE_PROCESSED, processedMessage));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}

export default new ChatController();
