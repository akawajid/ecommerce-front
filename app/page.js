'use client';

import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import Head from "next/head";
import { Product } from './../models/Product';

export default function Home({ featuredProduct }) {
  console.log(featuredProduct);

  return (
    <>
    <Head>
      <title>Ecommerce Front</title>
    </Head>
    <Featured product={featuredProduct} />
    </>
  )
}

export async function getServerSideProps(context){
  await mongooseConnect();
  const featured = await Product.findById('64441e31b458fc9416cd67e3');

  console.log(featured);

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featured)),
    }
  }
}
