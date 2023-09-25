/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import Loading from "../../components/Loading";

const ProtectedRoutes = ({
  children,
  code,
}: {
  children: ReactNode;
  code?: string;
}) => {
  const router = useRouter();
  const {
    auth: { isAuthenticated },
    loading: { isLoading },
  } = useGlobalContext();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated]);

  // if (!isAuthenticated) router.push("/login");

  if (isLoading) return <Loading />;
  return <>{children}</>;
};

export default ProtectedRoutes;
