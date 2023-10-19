import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { UserType } from "../types/user.type";

const api = "/api/v1/user";

export type UsersApiResponse = AxiosResponse<Array<UserType>, Array<UserType>>;

// Service Get Users
export const getUserService = async (
  filter: string
): Promise<UsersApiResponse> => {
  return axios.get(`${api}?filter=${filter}`);
};
