"use client";
import Header from "@/components/Header";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export const metadata = {
  title: "Ecommerce NextJS App",
  description: "Ecommerce app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}
