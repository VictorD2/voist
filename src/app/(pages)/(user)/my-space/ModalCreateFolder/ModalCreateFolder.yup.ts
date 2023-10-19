import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const FolderResolver = yupResolver(
  yup.object().shape({
    name: yup.string().required("Este campo es requerido"),
    userId: yup.number().required("Este campo es requerido"),
    folderId: yup.number().required("Este campo es requerido"),
    id: yup.number().required("Este campo es requerido"),
    contacts: yup
      .array()
      .required()
      .of(
        yup.object().shape({
          id: yup.number().required("Este campo es requerido"),
          name: yup.string().required("Este campo es requerido"),
          lastname: yup.string().required("Este campo es requerido"),
          email: yup
            .string()
            .email("El formato es incorrecto")
            .required("Este campo es requerido"),
        })
      ),
  })
);
