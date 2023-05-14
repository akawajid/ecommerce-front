import styled from "styled-components";
import Img from "./Img";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
  flex: 1 1 calc(25% - 2rem);
  max-height: 180px;
  margin-bottom: 30px;
`;

const ProductTitle = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0;
  min-height: 35px;
  display: block;
`;

const WhiteBox = styled(Link)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  display: block;
  margin-bottom: 10px;
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    object-fit: contain;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 10px 0;
`;

const Price = styled.h4`
  font-size: 18px;
  font-weight: 500;
`;

export default function ProductBox({ _id, title, price, images }) {
  const productURI = `/product/${_id}`;

  const { addProductToCart } = useContext(CartContext);

  return (
    <ProductWrapper>
      <WhiteBox href={productURI}>
        <ProductImageWrapper>
          <Image
            src={`/upload/products/${images[0]}`}
            alt="Image description"
            width={120}
            height={100}
          />
        </ProductImageWrapper>
      </WhiteBox>
      <ProductTitle href={productURI}>{title}</ProductTitle>
      <PriceWrapper>
        <Price>$ {price}</Price>
        <Button primary outline onClick={() => addProductToCart(_id)}>
          Add To Cart
        </Button>
      </PriceWrapper>
    </ProductWrapper>
  );
}
