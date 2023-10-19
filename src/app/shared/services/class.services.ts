import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { ClassType } from "../types/class.type";
import { UserType } from "../types/user.type";

const api = "/api/v1/class";

export type ClassApiResponse = AxiosResponse<
  ClassType & { contacts: Array<UserType> },
  ClassType & { contacts: Array<UserType> }
>;

export type ClassesApiResponse = AxiosResponse<
  {
    classs: Array<ClassType & { contacts: Array<UserType> }>;
    routes: { name: string; link: string }[];
  },
  {
    classs: Array<ClassType & { contacts: Array<UserType> }>;
    routes: { name: string; link: string }[];
  }
>;

// Service Get Classs
export const getClassService = async (
  classId: number | null
): Promise<ClassesApiResponse> => {
  return axios.get(`${api}?class=${classId}`);
};

// Service Create Class
export const createClassService = async (
  classe: Omit<ClassType, "id" | "filename" | "createdAt">,
  contacts: Array<number>,
  file?: File
): Promise<ClassApiResponse> => {
  const formData = new FormData();
  if (file) formData.append("file", file);
  formData.append("name", classe.name);
  formData.append("userId", classe.userId + "");
  formData.append("folderId", classe.folderId + "");
  formData.append("contacts", "[" + contacts + "]");
  return axios.post(`${api}`, formData, {
    headers: {
      "Content-Type": "application/form-data",
    },
  });
};

// Service Update Class
export const updateClassService = async (
  classe: Omit<
    ClassType,
    "userId" | "classId" | "folderId" | "filename" | "createdAt"
  >,
  contacts: Array<number>
): Promise<ClassApiResponse> => {
  return axios.put(`${api}/${classe.id}`, { ...classe, contacts });
};

// Service Delete Class
export const deleteClassService = async (
  id: number
): Promise<ClassApiResponse> => {
  return axios.delete(`${api}/${id}`);
};
