import styled from "styled-components";
import Center from "./Center";
import Img from "./Img";
import ButtonLink from "./ButtonLink";
import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const DarkBG = styled.div`
  background-color: #111;
`;

const FeaturedDiv = styled.div`
  padding: 40px 0;
  display: flex;
  gap: 100px;
  justify-content: space-between;
`;

const FeaturedTitle = styled.h2`
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
`;

const FeaturedDesc = styled.p`
  color: #fff;
  padding: 12px 0;
  font-size: 1.1rem;
`;

const FeaturedImage = styled(Img)`
  object-fit: cover;
`;

const DetailWrapper = styled.div`
  flex: 60%;
`;

const ImageWrapper = styled.div`
  flex: 40%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export default function Featured({ _id, title, description, images }) {
  const { addProductToCart } = useContext(CartContext);

  return (
    <DarkBG>
      <Center>
        <FeaturedDiv>
          <DetailWrapper>
            <FeaturedTitle>{title}</FeaturedTitle>
            <FeaturedDesc>{description}</FeaturedDesc>
            <ButtonWrapper>
              <ButtonLink href={"/product/" + _id} outline={1} white={1}>
                Read more
              </ButtonLink>
              <Button white onClick={() => addProductToCart(_id)}>
                Add To Cart
              </Button>
            </ButtonWrapper>
          </DetailWrapper>
          <ImageWrapper>
            <FeaturedImage
              src={`/upload/products/${[images[0]]}`}
              fill={true}
              alt={title}
            />
          </ImageWrapper>
        </FeaturedDiv>
      </Center>
    </DarkBG>
  );
}
