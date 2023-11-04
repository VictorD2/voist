/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { io } from "socket.io-client";
import { FC, useEffect, useState } from "react";
import { WebSocketComponentProps } from "./WebSocketComponent.type";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import { DOMAIN } from "../../utils/api";

const WebSocketComponent: FC<WebSocketComponentProps> = (props) => {
  const {
    user: { user },
  } = useGlobalContext();
  const [token, setToken] = useState<string>("");
  const { children } = props;
  useEffect(() => {
    setToken(localStorage.getItem("token")!);
    // Conéctate al servidor WebSocket
    const socket = io(DOMAIN, {
      auth: {
        token: localStorage.getItem("token"),
        user: user,
      },
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); // Reemplaza con la URL de tu servidor NestJS

    socket.on("connect", () => {
      console.log("Conexión establecida con el servidor WebSocket");
    });

    // Cierra la conexión cuando el componente se desmonta
    return () => {
      socket.disconnect();
      setToken("");
    };
  }, []);
  return <>{children}</>;
};

export default WebSocketComponent;
