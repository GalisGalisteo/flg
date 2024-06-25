"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainHeader } from "@/components/MainHeader";
import { createApolloClient } from "@/utils/apolloConfiguration";
import { ApolloProvider } from "@apollo/client";
import { LoginContextProvider } from "@/components/LogingContextProvider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "FLG",
//   description: "Families LGTBI+",
// };

const apolloClient = createApolloClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(inter.className, "bg-primary-light")}>
        <ApolloProvider client={apolloClient}>
          <LoginContextProvider>
            <MainHeader />
            {children}
          </LoginContextProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
