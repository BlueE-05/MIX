'use client'
import { useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';

import CustomTable from '@/components/Tables/CustomTable';
<<<<<<< HEAD
import Formulario from '@/components/Forms/ProductsForms';
import RoundedButton from '@/components/Buttons/RoundedButton';
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import { CirclePlus, LoaderCircle } from 'lucide-react';
import ProductDetailCard from '@/components/Cards/Tables/ProductDetailCard';
import { fetchProducts } from '@/hooks/product/fetchProducts';
import { ProductReceive } from '@/types/ProductTypes';
import { useFullProfile } from '@/hooks/useFullProfile';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function ProductPage() {
  const productHeaders = ["#", "Name of Product", "Ref. Number", "Unitary Price", "Commission(%)", "Product Sheet", ""];
  const [tableData, setTableData] = useState<ReactNode[][]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const { profile, loading } = useFullProfile();
  const [isAdmin, setIsAdmin] = useState(false);
  
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

  useEffect(() => {
    if (!loading && profile) {
      setIsAdmin(profile.isAdmin);
    }
  }, [loading, profile]);


  if (loading || !profile) return <LoadingSpinner />;
  

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

=======
import Formulario, { ProductData } from '@/components/Forms/ProductsForms';
import RoundedButton from '@/components/Buttons/RoundedButton';
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import { CirclePlus } from 'lucide-react';
import ProductDetailCard from '@/components/Cards/Tables/ProductDetailCard';

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
  void setIsAdmin;
  const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null);

  const transformAndSetData = (data: ProductFromAPI[]) => {
    const transformed: ProductRow[] = data.map((product, index) => {
      return {
        id: index + 1,
        name: product.Name,
        refNum: product.RefNum,
        unitaryPrice: product.UnitaryPrice,
        commission: product.Commission,
        productSheet: <a key={`link-${index}`} href={`/files/${product.RefNum}.pdf`} className="text-blue-500 underline">View Sheet</a>,
        actions: <ArrowRightButton color='orange'
                  key={`arrow-${index}`} 
                  onClick={() => {
                    setSelectedProduct({
                      id: index + 1,
                      name: product.Name,
                      refNum: product.RefNum,
                      unitaryPrice: product.UnitaryPrice,
                      commission: product.Commission,
                      productSheet: <a href={`/files/${product.RefNum}.pdf`} className="text-blue-500 underline">View Sheet</a>,
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

      {/* Tarjeta de detalles del producto */}
      {selectedProduct && (
        <ProductDetailCard
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          editButtonText="Edit Product"
          closeButtonText="Close"
        />
      )}

      {/* Form to add new product */}
      {showForm && (
        <Formulario onClose={() => setShowForm(false)} onSubmit={handleNewProduct} />
      )}

      {/* Button to add new product (admin only) */}
>>>>>>> origin/pruebanewmerge_sales_report
      {isAdmin && (
        <div onClick={() => { setShowForm(true); }} className="fixed bottom-6 right-6">
          <RoundedButton color="orange" text="New Product" Icon={CirclePlus} />
        </div>
      )}
    </main>
  );
<<<<<<< HEAD
}
=======
}

/*

  const mockProducts: ProductRow[] = [
    {
      id: 1,
      name: "John",
      refNum: "Doe",
      unitaryPrice: 1,
      commission: 24,
      productSheet: 'si' ,
      actions: <ArrowRightButton color='orange' onClick={() => setSelectedProduct(mockProducts[0])} />
    },
    {
      id: 2,
      name: "John",
      refNum: "Doe",
      unitaryPrice: 1,
      commission: 24,
      productSheet: 'si' ,
      actions: <ArrowRightButton color='orange' onClick={() => setSelectedProduct(mockProducts[0])} />
    },
    {
      id: 3,
      name: "John",
      refNum: "Doe",
      unitaryPrice: 1,
      commission: 24,
      productSheet: 'si' ,
      actions: <ArrowRightButton color='orange' onClick={() => setSelectedProduct(mockProducts[0])} />
    },
    {
      id: 4,
      name: "John",
      refNum: "Doe",
      unitaryPrice: 1,
      commission: 24,
      productSheet: 'si' ,
      actions: <ArrowRightButton color='orange' onClick={() => setSelectedProduct(mockProducts[0])} />
    },
    {
      id: 5,
      name: "John",
      refNum: "Doe",
      unitaryPrice: 1,
      commission: 24,
      productSheet: 'si' ,
      actions: <ArrowRightButton color='orange' onClick={() => setSelectedProduct(mockProducts[0])} />
    },
  ];

*/
>>>>>>> origin/pruebanewmerge_sales_report
