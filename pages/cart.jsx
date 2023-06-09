import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Table from "@/components/Table";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "@/components/Title";
import axios from "axios";
import Img from "@/components/Img";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Head from "next/head";
import { useRouter } from "next/router";

const CheckoutWrapper = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
  align-items: flex-start;
  margin: 20px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    margin: 20px 0;
  }
`;

const ProductTitle = styled.span`
  display: block;
  @media (max-width: 480px) {
    display: none;
  }
`;

const ProductTitleRow = styled.tr`
  display: none;
  @media (max-width: 480px) {
    display: table-row;
  }
`;

const CartProductsWrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  flex: 2;
`;

const ShippingInfoWrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
    margin: 10px 0;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    margin-top: 12px;
    img {
      max-width: 40px;
      max-height: 40px;
    }
  }
`;

const QtyButtonWrapper = styled.span`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  max-width: max-content;
`;

const CityWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function Cart({ props }) {
  const router = useRouter();
  const {
    cartProducts,
    addProductToCart,
    removeProductFromCart,
    emptyThisCart,
  } = useContext(CartContext);
  const [cartProductsQty, setCartProductsQty] = useState({});
  const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [redirectLoader, setRedirectLoader] = useState(false);
  const [successShown, setSuccessShown] = useState(false);

  let cartTotal = 0;

  useEffect(() => {
    if (cartProducts?.length < 1) {
      setProducts([]);
      return;
    }

    axios
      .post("/api/cart", {
        cartProducts: [...new Set(cartProducts)],
      })
      .then((res) => {
        setProducts(res?.data);
      })
      .catch((error) => {
        console.info(error);
      });

    const productsQty = {};
    cartProducts.forEach(
      (productId) =>
        (productsQty[productId] = (productsQty[productId] || 0) + 1)
    );

    setCartProductsQty(productsQty);
  }, [cartProducts]);

  const increaseQty = (_id) => {
    addProductToCart(_id);
  };

  const decreaseQty = (_id) => {
    removeProductFromCart(_id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRedirectLoader(true);

    const response = await axios.post("/api/checkout", {
      ...orderData,
      cartProducts,
    });

    if (response.data?.url) {
      window.location = response.data.url;
    }
  };

  if (redirectLoader) {
    return (
      <Center>
        <Head>
          <title>Checkout</title>
        </Head>
        <CheckoutWrapper>
          <CartProductsWrapper>
            <h1>Preparing checkout!</h1>
            <p style={{ margin: "10px 0" }}>
              You are being redirected to Stripe website for online payment...
            </p>
          </CartProductsWrapper>
        </CheckoutWrapper>
      </Center>
    );
  }

  if (router.query?.success === "1" && !successShown) {
    emptyThisCart();

    setTimeout(() => {
      setSuccessShown(true);
      window.location.href = "/cart";
    }, 5000);

    return (
      <Center>
        <Head>
          <title>Order Completed</title>
        </Head>
        <CheckoutWrapper>
          <CartProductsWrapper>
            <h1>Thank you for your order!</h1>
            <p style={{ margin: "10px 0" }}>
              An email will be sent, when your order is ready...
            </p>
          </CartProductsWrapper>
        </CheckoutWrapper>
      </Center>
    );
  }

  if (router.query?.cancelled === "1") {
    return (
      <Center>
        <Head>
          <title>Failed To Place Order</title>
        </Head>
        <CheckoutWrapper>
          <CartProductsWrapper>
            <h1>Something went wrong!</h1>
            <p style={{ margin: "10px 0" }}>
              Please try again the payment or cantact customer support...
            </p>
          </CartProductsWrapper>
        </CheckoutWrapper>
      </Center>
    );
  }

  return (
    <Center>
      <Head>
        <title>Your Cart</title>
      </Head>
      <CheckoutWrapper>
        <CartProductsWrapper>
          <Title>Cart</Title>

          {!products?.length ? <p>Cart is empty...</p> : null}
          {products?.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => {
                  const qty = cartProductsQty[item._id];
                  cartTotal += qty * item.price;
                  return (
                    qty > 0 && (
                      <>
                        <tr key={index}>
                          <td>
                            <ProductImageBox>
                              <Img
                                src={`/upload/products/${item?.images[0]}`}
                                width={100}
                                height={100}
                                alt={item.title}
                              />
                            </ProductImageBox>
                            <ProductTitle>{item.title}</ProductTitle>
                          </td>
                          <td>
                            <QtyButtonWrapper>
                              <Button onClick={() => decreaseQty(item._id)}>
                                -
                              </Button>
                              {cartProductsQty[item._id]}
                              <Button onClick={() => increaseQty(item._id)}>
                                +
                              </Button>
                            </QtyButtonWrapper>
                          </td>
                          <td>
                            $
                            {(item.price * cartProductsQty[item._id]).toFixed(
                              2
                            )}
                          </td>
                        </tr>
                        <ProductTitleRow key={index * 1000}>
                          <td colSpan={3}>{item.title}</td>
                        </ProductTitleRow>
                      </>
                    )
                  );
                })}
                {cartTotal > 0 ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${cartTotal.toFixed(2)}</td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
          )}
        </CartProductsWrapper>
        <ShippingInfoWrapper>
          <Title>Order Information</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              required
              placeholder="Name"
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
            <CityWrapper>
              <Input
                type="text"
                name="city"
                required
                placeholder="City"
                onChange={handleChange}
              />
              <Input
                type="number"
                name="postalCode"
                required
                placeholder="Postal Code"
                onChange={handleChange}
              />
            </CityWrapper>
            <Input
              type="text"
              name="streetAddress"
              required
              placeholder="Street Address"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleChange}
            />
            <br />
            <br />
            <Button black block type="submit">
              Proceed to payment
            </Button>
          </form>
        </ShippingInfoWrapper>
      </CheckoutWrapper>
    </Center>
  );
}
