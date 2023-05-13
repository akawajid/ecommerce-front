import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";
import Img from "./Img";

const ProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin:40px 0;
`;

const Title = styled.div`
  font-size: 30px;
  margin:25px 0;
  font-weight:600
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsList>
        {products.length ? products.map((product, index) => (
          <ProductBox key={index} { ...product } />
        )) : null}
      </ProductsList>
    </Center>
  );
}
