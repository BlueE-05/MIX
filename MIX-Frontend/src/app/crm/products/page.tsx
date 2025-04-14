'use client'
import { useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';

import CustomTable from '@/components/Tables/CustomTable';
import Formulario, { ProductData } from '@/components/Forms/ProductsForms';
import RoundedButton from '@/components/Buttons/RoundedButton';
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import { CirclePlus } from 'lucide-react';

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
  productSheet: ReactNode;
  actions: ReactNode;
}

export default function ProductPage() {
  const productHeaders = ["#", "Name of Product", "Ref. Number", "Unitary Price", "Commission$", "Product Sheet", ""];

  const [productData, setProductData] = useState<ProductRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Simulating admin status //TODO: connect to backend

    // Solución para el error de build - Eliminar este setIsAdmin, solo se ha colocado para quitar el error del build
    void setIsAdmin;

  const transformAndSetData = (data: ProductFromAPI[]) => {
    const transformed: ProductRow[] = data.map((product, index) => {
      return {
        id: index + 1,
        name: product.Name,
        refNum: product.RefNum,
        unitaryPrice: product.UnitaryPrice,
        commission: product.Commission,
        productSheet: <a key={`link-${index}`} href={`/files/${product.RefNum}.pdf`} className="text-blue-500 underline">View Sheet</a>,
        actions: <ArrowRightButton key={`arrow-${index}`} />
      };
    });

    setProductData(transformed);
  };

  const fetchProducts = useCallback(async (searchTerm?: string) => {
    try {
      const baseUrl = "http://localhost:5000/api/products";

      if (searchTerm && searchTerm.trim() !== '') {
        // Make parallel requests to both search endpoints
        const [idResponse, nameResponse] = await Promise.all([
          fetch(`${baseUrl}/id/${encodeURIComponent(searchTerm)}`),
          fetch(`${baseUrl}/name/${encodeURIComponent(searchTerm)}`)
        ]);

        // Check if responses are ok
        if (!idResponse.ok || !nameResponse.ok) {
          throw new Error('One or more search requests failed');
        }

        const idResults: ProductFromAPI[] = await idResponse.json();
        const nameResults: ProductFromAPI[] = await nameResponse.json();

        // Combine results and remove duplicates
        const combinedResults = [...idResults, ...nameResults];
        const uniqueResults = combinedResults.filter((product, index, self) =>
          index === self.findIndex(p => p.RefNum === product.RefNum)
        );

        transformAndSetData(uniqueResults);
      } else {
        // No search term, fetch all products
        const res = await fetch(baseUrl);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ProductFromAPI[] = await res.json();
        transformAndSetData(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      // Optionally set empty data or show error message
      setProductData([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (searchTerm: string) => {
    fetchProducts(searchTerm);
  };

  const handleNewProduct = async (data: ProductData) => {
    const productDataToSend = {
      id: data.refNum,
      name: data.name,
      description: data.description,
      ArticleType: false,
      unitaryPrice: data.unitaryPrice,
      commission: data.commission,
    };
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDataToSend),
      });

      if (!response.ok) {
        console.error('Failed to create product');
      }

      await fetchProducts();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const productDataForTable: ReactNode[][] = productData.map(product => [
    product.id,
    product.name,
    product.refNum,
    product.unitaryPrice ? `$${product.unitaryPrice.toFixed(2)}` : "$0.00",
    product.commission ? `$${product.commission.toFixed(2)}` : "$0.00",
    product.productSheet,
    product.actions,
  ]);

  return (
    <main className="min-h-screen p-6">
      {/* Title of the page */}
      <h1 className="font-bold text-3xl mb-5">Products List</h1>

      {/* Table of products */}
      <CustomTable
        headers={productHeaders}
        data={productDataForTable}
        color="orange"
        onSearch={handleSearch}
      />

      {/* Form to add new product */}
      {showForm && (
        <Formulario onClose={() => setShowForm(false)} onSubmit={handleNewProduct} />
      )}

      {/* Button to add new product (admin only) */}
      {isAdmin && (
        <div onClick={() => { setShowForm(true); }} className="fixed bottom-6 right-6">
          <RoundedButton color="orange" text="New Product" Icon={CirclePlus} />
        </div>
      )}
    </main>
  );
}