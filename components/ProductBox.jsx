import styled from "styled-components";
import Img from "./Img";
import Button from "./Button";
import Image from "next/image";

const ProductWrapper = styled.div`
  flex: 1 1 calc(25% - 2rem);
  max-height: 180px;
  margin-bottom:30px;
`;

const ProductTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
  min-height:35px;
`;

const WhiteBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const addToCart = () => {
  console.log("added to cart");
};

export default function ProductBox({ product }) {
  //   console.table(product);

  return (
    <ProductWrapper>
      <WhiteBox>
        <ProductImageWrapper>
          <Image
            src={`/upload/products/${product?.images[0]}`}
            alt="Image description"
            width={120}
            height={100}
          />
        </ProductImageWrapper>
      </WhiteBox>
      <ProductTitle>{product.title}</ProductTitle>
      <Button primary onClick={addToCart}>
        Add To Cart
      </Button>
    </ProductWrapper>
  );
}
