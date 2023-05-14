import "@/styles/globals.css";
import Header from "@/components/Header";
import { CartContextProvider } from "@/components/CartContext";
import { roboto } from "@/utils/fonts";

function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <style jsx global>{`
        :root {
          --roboto-font: ${roboto.style.fontFamily};
        }
      `}</style>
      <CartContextProvider>
        <Header />
        <Component {...pageProps} />
      </CartContextProvider>
    </main>
  );
}

export default MyApp;