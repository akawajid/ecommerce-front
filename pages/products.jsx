import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import Head from "next/head";
import Title from "@/components/Title";
import { Product } from "@/models/Product";
import ProductsGrid from "./../components/ProductsGrid";

export default function Products({ products }) {
  console.log(products);

  return (
    <Center>
      <Head>
        <title>All Products</title>
      </Head>
      <Title>All Products</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find().sort({ updatedAt: -1 });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
