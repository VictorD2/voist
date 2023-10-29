import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { ClassType } from "../types/class.type";
import { UserType } from "../types/user.type";
import axiosFlask from "axios";
import { FLASK_API } from "../utils/api";

const api = "/api/v0/classes";
const api2 = FLASK_API + "/api/v0/chat";

export type ClassApiResponse = AxiosResponse<
  ClassType & { contacts: Array<UserType> },
  ClassType & { contacts: Array<UserType> }
>;

export type ClassesApiResponse = AxiosResponse<
  Array<ClassType & { contacts: Array<UserType> }>,
  Array<ClassType & { contacts: Array<UserType> }>
>;

// Service Get Classs
export const getClassesService = async (
  folderId: number | null
): Promise<ClassesApiResponse> => {
  return axios.get(`${api}?folder=${folderId}`);
};

// Service Get Classs
export const getClassService = async (
  classId: number | null
): Promise<ClassesApiResponse> => {
  return axios.get(`${api}/${classId}`);
};

// Service Create Class
export const createClassService = async (
  classe: Omit<
    ClassType,
    | "id"
    | "filename"
    | "createdAt"
    | "userId"
    | "updatedAt"
    | "duration"
    | "resume"
    | "url_pdf"
    | "url_audio"
  >,
  contacts: Array<number>,
  file?: File | Blob
): Promise<ClassApiResponse> => {
  const formData = new FormData();
  if (file) formData.append("file", file);
  formData.append("name", classe.name);
  formData.append("folderId", classe.folderId + "");
  formData.append("contacts", "[" + contacts + "]");
  return axios.post(`${api}`, formData, {
    headers: {
      "Content-Type": "application/form-data",
    },
  });
};

export const getChatAnswer = async (urlPdf: string, question: string) => {
  return axiosFlask.post(api2, { url_pdf: urlPdf, question });
};

export const getChatResumen = async (urlPdf: string) => {
  return axiosFlask.post(api2 + "/resume", { url_pdf: urlPdf });
};

export const createChatResumen = async (content: string, classId: number) => {
  return axios.post(api + "/resume", { content, classId });
};

// Service Update Class
export const updateClassService = async (
  classe: Omit<
    ClassType,
    | "updatedAt"
    | "duration"
    | "resume"
    | "url_pdf"
    | "url_audio"
    | "userId"
    | "classId"
    | "folderId"
    | "filename"
    | "createdAt"
  >,
  contacts: Array<number>
): Promise<ClassApiResponse> => {
  return axios.patch(`${api}/${classe.id}`, { name: classe.name, contacts });
};

// Service Delete Class
export const deleteClassService = async (
  id: number
): Promise<ClassApiResponse> => {
  return axios.delete(`${api}/${id}`);
};
