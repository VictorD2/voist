/* eslint-disable @next/next/google-font-display */
"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalProvider } from "./shared/contexts/GlobalProvider";
import Container from "./ui/Container";
// import { Next13NProgress } from 'nextjs13-progress';
import "./styles/globals.css";
import "remixicon/fonts/remixicon.css";
import { Quicksand } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

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
          <Container as="body" className={inter.className}>
            {children}
          </Container>
        </GlobalProvider>
      </QueryClientProvider>
    </html>
  );
}
