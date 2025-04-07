'use client'

import { useEffect, useState } from 'react';
import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import PointsButton from '@/components/Buttons/PointsButton';
import { ReactNode } from 'react';

interface ProductFromAPI {
  RefNum: string;
  Name: string;
  Description: string;
  ArticleType: boolean;
  UnitaryPrice: number;
  Commission: number;
  CreationDate: string;
}

interface ProductRow {
  id: number;
  name: string;
  refNum: string;
  unitaryPrice: number;
  commission: number;
  productType: ReactNode;
  productSheet: ReactNode;
  actions: ReactNode;
}

const ProductPage = () => {
  const productHeaders = ["#", "Name of Product", "Ref. Number", "Unitary Price", "Commission$", "Product Type", "Product Sheet", ""];

  const [productData, setProductData] = useState<ProductRow[]>([]); // Use the ProductRow type

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data: ProductFromAPI[] = await res.json();

        const transformed: ProductRow[] = data.map((product, index) => {
          return {
            id: index + 1,
            name: product.Name,
            refNum: product.RefNum,
            unitaryPrice: product.UnitaryPrice,
            commission: product.Commission,
            productType: <LabelOval key={`label-${index}`} color={product.ArticleType ? "green" : "red"} data={product.ArticleType ? "Product" : "Service"} />,
            productSheet: <a key={`link-${index}`} href={`/files/${product.RefNum}.pdf`} className="text-blue-500 underline">View Sheet</a>,
            actions: <PointsButton key={`points-${index}`} />,
          };
        });

        setProductData(transformed);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Convert ProductRow[] to ReactNode[][]
  const productDataForTable: ReactNode[][] = productData.map(product => [
    product.id,
    product.name,
    product.refNum,
    product.unitaryPrice,
    product.commission,
    product.productType,
    product.productSheet,
    product.actions,
  ]);

  return (
    <main className="min-h-screen p-6">
      <h1 className="font-bold text-3xl mb-5">Products List</h1>
      <CustomTable headers={productHeaders} data={productDataForTable} color="orange" />

      {/*<div className="fixed bottom-6 right-6">
        <RoundedButton color="orange" text="New Product" Icon={CirclePlus} />
      </div>*/}
    </main>
  );
};

export default ProductPage;
