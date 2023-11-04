/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { ReactNode } from "react";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import Loading from "../../components/Loading";
import Redirect from "../Redirect";
import paths from "../paths";

const ProtectedRoutes = ({
  children,
  code = "",
}: {
  children: ReactNode;
  code?: string;
}) => {
  const {
    auth: { isAuthenticated },
    loading: { isLoading },
    user: { user },
  } = useGlobalContext();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return <Redirect to={paths.login} />;

  if (code.length !== 0 && !user.role?.permissions.includes(code)) {
    return <Redirect to={paths.root} />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
