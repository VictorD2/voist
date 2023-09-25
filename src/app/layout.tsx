"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalProvider } from "./shared/contexts/GlobalProvider";
import Container from "./ui/Container";
// import { Next13NProgress } from 'nextjs13-progress';
import "./styles/globals.css";
import "remixicon/fonts/remixicon.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand"
          rel="stylesheet"
        ></link>
      </head>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          {/* <ProgressBar shallowRouting color="#33435A" /> */}
          <Container as="body">
            <Container as="main">{children}</Container>
          </Container>
          {/* <Next13NProgress color="red" height={5} /> */}
        </GlobalProvider>
      </QueryClientProvider>
    </html>
  );
}
