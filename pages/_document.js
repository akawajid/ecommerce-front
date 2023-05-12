import { Html, Head, Main, NextScript } from 'next/document'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background:#eee;
  }
`;

export const metadata = {
  title: "Ecommerce NextJS App",
  description: "Ecommerce app",
};

export default function Document() {
  return (
    <>
    <GlobalStyle />
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    </>
  )
}
