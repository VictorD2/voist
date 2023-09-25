/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading";
import { useGlobalContext } from "../../contexts/GlobalProvider";

const AuthRoutes = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const {
    auth: { isAuthenticated },
    loading: { isLoading },
  } = useGlobalContext();

  // useEffect(() => {
  //   if (isAuthenticated) router.push("/my-space");
  // }, [isAuthenticated]);
  if (isAuthenticated) router.push("/my-space");

  if (isLoading) return <Loading />;
  return <>{children}</>;
};

export default AuthRoutes;
