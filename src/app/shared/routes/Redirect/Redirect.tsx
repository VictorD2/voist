"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../../components/Loading";

const Redirect = ({ to }: { to: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <Loading />;
};

export default Redirect;
