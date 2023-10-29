import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { ConversationType } from "../types/conversation.type";

const api = "/api/v0/conversations";

export type ConversationApiResponse = AxiosResponse<
  ConversationType,
  ConversationType
>;
export type ConversationsApiResponse = AxiosResponse<
  Array<ConversationType>,
  Array<ConversationType>
>;
export type ConversationApiDeleteResponse = AxiosResponse<number, number>;

// Service Get  Conversations
export const getConversationsService = async (
  classId: number
): Promise<ConversationsApiResponse> => {
  return axios.get(`${api}?classId=${classId}`);
};

// Service Create Conversation
export const createConversationService = async (
  classId: number,
  question: string,
  answer: string
): Promise<ConversationApiResponse> => {
  return axios.post(`${api}`, { classId, question, answer });
};
