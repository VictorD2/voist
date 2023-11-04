import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { UserType } from "../types/user.type";

const api = "/api/v0/users";

export type UsersApiResponse = AxiosResponse<
  { quantity: number; users: Array<UserType> },
  { quantity: number; users: Array<UserType> }
>;

export type UserApiResponse = AxiosResponse<UserType, UserType>;
export type UserLoggedTimeApiResponse = AxiosResponse<
  Array<{ day: string; minutes: number }>,
  Array<{ day: string; minutes: number }>
>;
export type UserCountApiResponse = AxiosResponse<number, number>;

// Service Get Users
export const getUsersService = async (
  filter: string,
  page: number,
  limit: number
): Promise<UsersApiResponse> => {
  return axios.get(`${api}?filter=${filter}&page=${page}&limit=${limit}`);
};

// Service Get Users
export const getUserByIdService = async (
  id: number
): Promise<UserApiResponse> => {
  return axios.get(`${api}/${id}`);
};

export const getUserLoggedTimeByIdService = async (
  id: number
): Promise<UserLoggedTimeApiResponse> => {
  return axios.get(`${api}/${id}/time`);
};

export const getCountUsersService = async (): Promise<UserCountApiResponse> => {
  return axios.get(`${api}/count`);
};

export const getCountNewUsersService =
  async (): Promise<UserCountApiResponse> => {
    return axios.get(`${api}/count/news`);
  };
