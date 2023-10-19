import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { UserType } from "../types/user.type";

const api = "/api/v1/contact";

export type ContactApiResponse = AxiosResponse<UserType, UserType>;
export type ContactApiDeleteResponse = AxiosResponse<number, number>;

// Service Get My Contact
export const getContactService = async (): Promise<ContactApiResponse> => {
  return axios.get(`${api}`);
};

// Service Create Contact
export const createContactService = async (
  userId: number
): Promise<ContactApiResponse> => {
  return axios.post(`${api}`, { userId });
};

// Service Delete Contact
export const deleteContactService = async (
  userId: number
): Promise<ContactApiDeleteResponse> => {
  return axios.delete(`${api}/${userId}`);
};
