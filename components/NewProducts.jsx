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

export default function NewProducts({ products }) {
  return (
    <Center>
      <ProductsList>
        {products.length ? products.map((product, index) => (
          <ProductBox key={index} product={product} />
        )) : null}
      </ProductsList>
    </Center>
  );
}
