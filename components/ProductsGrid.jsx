import styled from "styled-components";
import ProductBox from "./ProductBox";

const ProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 40px 0;

  @media(max-width:480px){
  }
`;

export default function ProductsGrid({ products }) {
  return (
    <ProductsList>
      {products.length
        ? products.map((product, index) => (
            <ProductBox key={index} {...product} />
          ))
        : null}
    </ProductsList>
  );
}
