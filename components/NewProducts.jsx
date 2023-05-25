import Center from "./Center";
import Title from "./Title";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
