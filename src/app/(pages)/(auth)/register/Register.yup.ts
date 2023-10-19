import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const RegisterResolver = yupResolver(
  yup.object().shape({
    name: yup.string().required("Este campo es requerido"),
    lastname: yup.string().required("Este campo es requerido"),
    email: yup
      .string()
      .email("El formato es incorrecto")
      .required("Este campo es requerido"),
    password: yup.string().required("Este campo es requerido"),
    repeatPassword: yup.string().required("Este campo es requerido"),
  })
);
