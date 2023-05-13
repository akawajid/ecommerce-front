import "@/styles/globals.css";
import Header from "@/components/Header";

import { roboto } from "@/utils/fonts";

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <style jsx global>{`
        :root {
          --roboto-font: ${roboto.style.fontFamily};
        }
      `}</style>
      <Header />
      <Component {...pageProps} />
    </main>
  );
}
