/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { ReactNode } from "react";
import Loading from "../../components/Loading";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import Redirect from "../Redirect";
import paths from "../paths";

const AuthRoutes = ({ children }: { children: ReactNode }) => {
  const {
    loading: { isLoading },
    auth: { isAuthenticated },
  } = useGlobalContext();

  if (isLoading) return <Loading />;

  if (isAuthenticated) return <Redirect to={paths.mySpace} />;

  return <>{children}</>;
};

export default AuthRoutes;
