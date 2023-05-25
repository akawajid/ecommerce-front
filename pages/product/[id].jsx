import Center from "@/components/Center";
import Img from "@/components/Img";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Head from "next/head";
import { useContext, useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
`;

const ImagesWrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  flex-basis: 40%;

  div {
    img {
      width: auto !important;
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
  }
`;

const DetailWrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  flex-basis: 60%;
`;

const SmallImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;

  div {
    max-width: max-content;
    cursor: pointer;
  }

  img {
    width: auto;
    max-width: 100%;
    display: block;
    margin: 0 auto;
    outline-offset: 6px;
    border-radius: 6px;
  }

  img:hover {
    outline: 2px solid #ccc;
  }

  img.active {
    outline: 2px solid #ddd;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  gap: 3rem;
  align-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const Price = styled.h4`
  font-size: 24px;
  font-weight: 500;
`;

export default function ProductDetail({ product }) {
  const { _id, title, description, price, images } = product;
  const [mainImage, setMainImage] = useState(images[0] || "");
  const { addProductToCart } = useContext(CartContext);

  const setShownImage = (image) => {
    setMainImage(image);
  };

  return (
    <Center>
      <Head>
        <title>{title}</title>
      </Head>

      <Title>{title}</Title>

      <ProductWrapper>
        <ImagesWrapper>
          <Img src={`/upload/products/${mainImage}`} fill alt={title} />

          {images.length > 1 ? (
            <SmallImagesWrapper>
              {images.map((img, i) => (
                <Img
                  key={i}
                  src={`/upload/products/${img}`}
                  width="50"
                  height="50"
                  alt={title}
                  className={img === mainImage ? "active" : ""}
                  onClick={() => setShownImage(img)}
                />
              ))}
            </SmallImagesWrapper>
          ) : null}
        </ImagesWrapper>
        <DetailWrapper>
          <p>{description}</p>

          <PriceWrapper>
            <Price>${price}</Price>
            <Button primary outline md onClick={() => addProductToCart(_id)}>
              Add To Cart
            </Button>
          </PriceWrapper>
        </DetailWrapper>
      </ProductWrapper>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  await mongooseConnect();
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
