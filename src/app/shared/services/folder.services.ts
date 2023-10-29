import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { FolderType } from "../types/folder.type";
import { UserType } from "../types/user.type";

const api = "/api/v0/folders";

export type FolderApiResponse = AxiosResponse<
  FolderType & { contacts: Array<UserType> },
  FolderType & { contacts: Array<UserType> }
>;

export type FoldersApiResponse = AxiosResponse<
  {
    folders: Array<FolderType & { contacts: Array<UserType> }>;
    routes: { name: string; link: string }[];
  },
  {
    folders: Array<FolderType & { contacts: Array<UserType> }>;
    routes: { name: string; link: string }[];
  }
>;

// Service Get Folders
export const getFolderService = async (
  folderId: number | null
): Promise<FoldersApiResponse> => {
  return axios.get(`${api}?folder=${folderId}`);
};

// Service Create Folder
export const createFolderService = async (
  folder: Omit<FolderType, "id" | "userId">,
  contacts: Array<number>
): Promise<FolderApiResponse> => {
  return axios.post(`${api}`, { ...folder, contacts });
};

// Service Update Folder
export const updateFolderService = async (
  folder: Omit<FolderType, "userId" | "folderId">,
  contacts: Array<number>
): Promise<FolderApiResponse> => {
  const { id, ...rest } = folder;
  return axios.patch(`${api}/${folder.id}`, { ...rest, contacts });
};

// Service Delete Folder
export const deleteFolderService = async (
  id: number
): Promise<FolderApiResponse> => {
  return axios.delete(`${api}/${id}`);
};
