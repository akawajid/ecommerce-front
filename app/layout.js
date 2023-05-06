"use client";
import Header from "@/components/Header";
import { Inter } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export const metadata = {
  title: "Ecommerce NextJS App",
  description: "Ecommerce app",
};

import { Roboto } from 'next/font/google';
 
const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      <html lang="en">
        <body className={roboto.className} suppressHydrationWarning={true}>
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}
