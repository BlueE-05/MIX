'use client'

import { useEffect, useState } from 'react';
import { CirclePlus } from "lucide-react";

import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import PointsButton from '@/components/Buttons/PointsButton';
import RoundedButton from '@/components/Buttons/RoundedButton';

interface ProductFromAPI {
  RefNum: string;
  Name: string;
  Description: string;
  ArticleType: boolean;
  UnitaryPrice: number;
  Commission: number;
  CreationDate: string;
}

const ProductPage = () => {
  const productHeaders = ["#", "Name of Product", "Ref. Number", "Unitary Price", "Commission$", "Product Type", "Product Sheet", ""];

  const [productData, setProductData] = useState<any[][]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data: ProductFromAPI[] = await res.json();

        const transformed = data.map((product, index) => {
          return [
            index + 1,
            product.Name,
            product.RefNum,
            product.UnitaryPrice,
            product.Commission,
            <LabelOval key={`label-${index}`} color={product.ArticleType ? "green" : "red"} data={product.ArticleType ? "Product" : "Service"} />,
            <a key={`link-${index}`} href={`/files/${product.RefNum}.pdf`} className="text-blue-500 underline">View Sheet</a>,
            <PointsButton key={`points-${index}`} />,
          ];
        });

        setProductData(transformed);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen p-6">
      <h1 className="font-bold text-3xl mb-5">Products List</h1>
      <CustomTable headers={productHeaders} data={productData} color="orange" />

      {/*<div className="fixed bottom-6 right-6">
        <RoundedButton color="orange" text="New Product" Icon={CirclePlus} />
      </div>*/}
    </main>
  );
};

export default ProductPage;
