import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import Head from "next/head";
import { Product } from '../models/Product';
import NewProducts from "@/components/NewProducts";

export default function Home({ featuredProduct, newProducts }) {

  return (
    <>
    <Head>
      <title>Ecommerce Front</title>
    </Head>
    <Featured {...featuredProduct} />
    <NewProducts products={newProducts} />
    </>
  )
}

export async function getServerSideProps(context){
  await mongooseConnect();
  const featured = await Product.findById('64441e31b458fc9416cd67e3');

  const newProducts = await Product.find().limit(8).sort({'updatedAt': -1});

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featured)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}
