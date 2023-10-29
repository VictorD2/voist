import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { UserType } from "../types/user.type";
import { LoginType } from "@/app/(pages)/(auth)/login/types/type";
import { RegisterType } from "@/app/(pages)/(auth)/register/types/type";

const api = "/api/v0/auth";

interface LoginResponse {
  user: UserType;
  token: string;
}

export type LoginApiResponse = AxiosResponse<LoginResponse, LoginResponse>;

// Service Login
export const loginService = async (
  login: LoginType
): Promise<LoginApiResponse> => {
  return axios.post(`${api}/signin`, login);
};

// Service Register
export const registerService = async (
  register: Omit<RegisterType, "repeatPassword">
): Promise<LoginApiResponse> => {
  return axios.post(`${api}/signup`, register);
};
