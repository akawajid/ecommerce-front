import "@/styles/globals.css";
import Header from "@/components/Header";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Header />
      <Component {...pageProps} />
    </main>
  );
}
