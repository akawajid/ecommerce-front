import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const LOCALSTORAGE_CART_KEY = "cartProducts";
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCart = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeProductFromCart = (productId) => {
    setCartProducts((prev) => {
      const indexToRemove = prev.findIndex((item) => item === productId);
      return prev.filter((_, index) => index != indexToRemove);
    });
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_KEY));
    if (products?.length > 0) {
      setCartProducts(products);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{ cartProducts, addProductToCart, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
