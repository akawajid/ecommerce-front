import styled from "styled-components";
import Image from "next/image";
import Center from "./Center";
import Img from "./Img";

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

export default function Featured() {
  return (
    <DarkBG>
      <Center>
        <FeaturedDiv>
          <DetailWrapper>
            <FeaturedTitle>New Mac Book Pro 2023</FeaturedTitle>
            <FeaturedDesc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              nisi ut aliquip ex ea commodo consequat.
            </FeaturedDesc>
          </DetailWrapper>
          <ImageWrapper>
            <FeaturedImage
              src="/upload/products/iTN0r-DQf7Na-jkNGIb5e.jpg"
              fill={true}
              alt="mac book pro"
            />
          </ImageWrapper>
        </FeaturedDiv>
      </Center>
    </DarkBG>
  );
}
