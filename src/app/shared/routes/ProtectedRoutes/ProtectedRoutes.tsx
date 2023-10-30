/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { ReactNode } from "react";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import Loading from "../../components/Loading";
import Redirect from "../Redirect";
import paths from "../paths";
import WebSocketComponent from "../../components/WebSocketComponent";

const ProtectedRoutes = ({
  children,
  code,
}: {
  children: ReactNode;
  code?: string;
}) => {
  const {
    auth: { isAuthenticated },
    loading: { isLoading },
  } = useGlobalContext();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return <Redirect to={paths.login} />;

  return <WebSocketComponent>{children}</WebSocketComponent>;
};

export default ProtectedRoutes;
