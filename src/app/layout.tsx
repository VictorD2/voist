/* eslint-disable @next/next/google-font-display */
"use client";

import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
// import { Quicksand } from "next/font/google";
import { GlobalProvider } from "./shared/contexts/GlobalProvider";
import Container from "./ui/Container";

// If loading a variable font, you don't need to specify the font weight
// const inter = Quicksand({
//   subsets: ["latin"],
//   display: "swap",
// });

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
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Container as="body" >
            <ToastContainer />
            {children}
          </Container>
        </GlobalProvider>
      </QueryClientProvider>
    </html>
  );
}
