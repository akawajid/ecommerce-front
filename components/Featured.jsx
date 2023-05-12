import styled from "styled-components";
import Image from "next/image";
import Center from "./Center";
import Img from "./Img";
import ButtonLink from "./ButtonLink";
import Button from './Button';

const DarkBG = styled.div`
  background-color: #111;
`;

const FeaturedDiv = styled.div`
  padding: 40px 0;
  display: flex;
  gap:100px;
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
  display:flex;
  gap: 2rem;
`;

const addToCart = () => {
  console.log('added to cart...');
}

export default function Featured({ product }) {
  return (
    <DarkBG>
      <Center>
        <FeaturedDiv>
          <DetailWrapper>
            <FeaturedTitle>{product.title}</FeaturedTitle>
            <FeaturedDesc>{product.description}</FeaturedDesc>
            <ButtonWrapper>
                <ButtonLink href={'/product/'+product._id} outline={1} white={1}>Read more</ButtonLink>
                <Button white onClick={addToCart}>Add To Cart</Button>
            </ButtonWrapper>
          </DetailWrapper>
          <ImageWrapper>
            <FeaturedImage
              src={`/upload/products/${[product.images[0]]}`}
              fill={true}
              alt="{product.title}"
            />
          </ImageWrapper>
        </FeaturedDiv>
      </Center>
    </DarkBG>
  );
}
