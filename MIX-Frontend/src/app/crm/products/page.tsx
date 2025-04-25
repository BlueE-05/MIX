'use client'
import { useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';

import CustomTable from '@/components/Tables/CustomTable';
import Formulario from '@/components/Forms/ProductsForms';
import RoundedButton from '@/components/Buttons/RoundedButton';
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import { CirclePlus } from 'lucide-react';
import { useFullProfile } from '@/hooks/useFullProfile';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import ProductDetailCard from '@/components/Cards/Tables/ProductDetailCard';

import { ProductView, ProductSent, ProductFromAPI } from '@/types/Product';

export default function ProductPage() {
  const productHeaders = ["#", "Name of Product", "Ref. Number", "Unitary Price", "Commission(%)", "Product Sheet", ""];
  const { profile, loading } = useFullProfile();
  const [productData, setProductData] = useState<ProductView[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // NOT SIMULATING
  const [selectedProduct, setSelectedProduct] = useState<ProductView | null>(null);

  useEffect(() => {
    if (!loading && profile) {
      console.log(`isAdmin: ${profile.isAdmin}`);
      setIsAdmin(profile.isAdmin);
    }
  }, [loading, profile]);


  if (loading || !profile) return <LoadingSpinner />;

  const transformAndSetData = (data: ProductFromAPI[]) => {
    const transformed: ProductView[] = data.map((product, index) => {
      return {
        id: index + 1,
        name: product.name,
        refNum: product.refNum,
        description: product.description,
        unitaryPrice: product.unitaryPrice,
        commission: product.commission,
        productSheet: <a 
                        key={`link-${index}`} 
                        href={product.productSheetURL} 
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Sheet
                      </a>,
        actions: <ArrowRightButton 
                  color='orange'
                  key={`arrow-${index}`} 
                  onClick={() => {
                    setSelectedProduct({
                      id: index + 1,
                      name: product.name,
                      refNum: product.refNum,
                      description: product.description,
                      unitaryPrice: product.unitaryPrice,
                      commission: product.commission,
                      productSheet: <a 
                                      href={product.productSheetURL} 
                                      className="text-blue-500 underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Sheet
                                    </a>,
                      actions: <ArrowRightButton />
                    });
                  }}
                />
      };
    });

    setProductData(transformed);
  };

  const fetchProducts = useCallback(async (searchTerm?: string) => {
    try {
      const baseUrl = "http://localhost:5000/api/products";

      if (searchTerm && searchTerm.trim() !== '') {
        const [idResponse, nameResponse] = await Promise.all([
          fetch(`${baseUrl}/id/${encodeURIComponent(searchTerm)}`),
          fetch(`${baseUrl}/name/${encodeURIComponent(searchTerm)}`)
        ]);

        if (!idResponse.ok && !nameResponse.ok) {
          throw new Error('Search requests failed');
        }

        // Handle cases where one endpoint might succeed and the other fails
        const idResults: ProductFromAPI[] = idResponse.ok ? await idResponse.json() : [];
        const nameResults: ProductFromAPI[] = nameResponse.ok ? await nameResponse.json() : [];

        const combinedResults = [...idResults, ...nameResults];
        const uniqueResults = combinedResults.filter((product, index, self) =>
          index === self.findIndex(p => p.refNum === product.refNum)
        );

        transformAndSetData(uniqueResults);
      } else {
        const res = await fetch(baseUrl);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ProductFromAPI[] = await res.json();
        transformAndSetData(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProductData([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (searchTerm: string) => {
    fetchProducts(searchTerm);
  };

  const handleNewProduct = async (data: ProductData) => { // ProductData ahora cuenta con un error: Menciona que no se le puede encontrar... eso estaba ayer .-.
    const productDataToSend: ProductSent = {
      refNum: data.refNum,
      name: data.name,
      description: data.description,
      unitaryPrice: data.unitaryPrice,
      commission: data.commission,
      productSheetURL: data.productSheetURL || '' // Make sure to handle this in your form
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
        throw new Error('Failed to create product');
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
    `$${product.unitaryPrice.toFixed(2)}`,
    `${product.commission.toFixed(2)}%`,
    product.productSheet,
    product.actions,
  ]);

  return (
    <main className="min-h-screen p-6">
      <h1 className="font-bold text-3xl mb-5">Products List</h1>

      <CustomTable
        headers={productHeaders}
        data={productDataForTable}
        color="orange"
        onSearch={handleSearch}
      />

      {selectedProduct && (
        <ProductDetailCard
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          editButtonText="Edit Product"
          closeButtonText="Close"
        />
      )}

      {showForm && (
        <Formulario 
          onClose={() => setShowForm(false)} 
          onSubmit={handleNewProduct} 
        />
      )}

      {isAdmin && (
        <div onClick={() => { setShowForm(true); }} className="fixed bottom-6 right-6">
          <RoundedButton color="orange" text="New Product" Icon={CirclePlus} />
        </div>
      )}
    </main>
  );
}