import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { UserType } from "../types/user.type";

const api = "/api/v0/contacts";

export type ContactApiResponse = AxiosResponse<UserType, UserType>;
export type ContactsApiResponse = AxiosResponse<
  Array<UserType>,
  Array<UserType>
>;
export type ContactApiDeleteResponse = AxiosResponse<number, number>;

// Service Get My Contact
export const getMyContactService = async (): Promise<ContactApiResponse> => {
  return axios.get(`${api}`);
};

// Service Get Users
export const getAllContactsService = async (
  filter: string
): Promise<ContactsApiResponse> => {
  return axios.get(`${api}/all?filter=${filter}`);
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
