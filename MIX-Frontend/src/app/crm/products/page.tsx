'use client'
import { useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';

import CustomTable from '@/components/Tables/CustomTable';
import Formulario from '@/components/Forms/ProductsForms';
import RoundedButton from '@/components/Buttons/RoundedButton';
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import { CirclePlus, LoaderCircle } from 'lucide-react';
import ProductDetailCard from '@/components/Cards/Tables/ProductDetailCard';
import { fetchProducts } from '@/hooks/product/fetchProducts';
import { ProductReceive } from '@/types/ProductTypes';

export default function ProductPage() {
  const productHeaders = ["#", "Name of Product", "Ref. Number", "Unitary Price", "Commission(%)", "Product Sheet", ""];
  const [tableData, setTableData] = useState<ReactNode[][]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [isAdmin/*, setIsAdmin*/] = useState(true); // Simulating admin status //TODO: connect to backend
  const [selectedProduct, setSelectedProduct] = useState<ProductReceive | null>(null);

  // Method to transform ContactRecieve to ReactNode[][] for table display
  const transformToTableData = useCallback((products: ProductReceive[]): ReactNode[][] => {
    return products.map((product, index) => [
      index + 1,
      product.Name,
      product.RefNum,
      `$${product.UnitaryPrice.toFixed(2)}`,
      `${product.Commission.toFixed(2)}%`,
      <a href={product.ProductSheetURL} className="text-blue-500 hover:underline">View Sheet</a>,
      <ArrowRightButton key={`arrows-${index}`} onClick={() => setSelectedProduct(product)} aria-label={`View details of ${product.Name}`} />
    ]);
  }, []);

  // Load products and transform to view model
  const loadProducts = useCallback(async (searchTerm?: string) => {
    setIsLoading(true);
    try {
      const products = await fetchProducts(searchTerm);
      setTableData(transformToTableData(products));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [transformToTableData]);

  // if search term is provided, load contacts with that term
  const handleSearch = useCallback((searchTerm: string) => {
    loadProducts(searchTerm);
  }, [loadProducts]);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <main className="min-h-screen p-6">

      {/* Title of the page */}
      <div className="flex justify-between items-center mb-5 mr-5">
        <h1 className="font-bold text-3xl">Products List</h1>
        {isLoading && <LoaderCircle className="animate-spin text-stone-900" />}
      </div>

      <CustomTable
        headers={productHeaders}
        data={tableData}
        color="orange"
        onSearch={handleSearch}
      />

      {selectedProduct && (
        <ProductDetailCard
          product={selectedProduct}
          onClose={() => { setSelectedProduct(null); loadProducts(); setShowForm(false); }}
        />
      )}

      {showForm && (
        <Formulario onClose={() => { setShowForm(false); loadProducts(); }} />
      )}

      {isAdmin && (
        <div onClick={() => { setShowForm(true); }} className="fixed bottom-6 right-6">
          <RoundedButton color="orange" text="New Product" Icon={CirclePlus} />
        </div>
      )}
    </main>
  );
}