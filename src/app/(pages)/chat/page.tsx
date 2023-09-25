"use client";

import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";
import Container from "@/app/ui/Container";
import { NextPage } from "next";

const ChatPage: NextPage = () => {
  return (
    <ProtectedRoutes>
      <Container separator={{ padding: "p-4" }} font={{ color: "text-white" }}>
        Chat
      </Container>
    </ProtectedRoutes>
  );
};

export default ChatPage;
