import { ProductAPI } from "@/types/ProductTypes";
import { useCallback } from "react";

const fetchProducts = useCallback(async (searchTerm?: string): Promise<ProductAPI[]> => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error("API URL not defined in environment variables");
    return [];
  }

  try {
    if (searchTerm?.trim()) {
      const encodedTerm = encodeURIComponent(searchTerm.trim());

      const [byNameResults, byRefNumResults] = await Promise.all([
        fetch(`${url}/products/name/${encodedTerm}`),
        fetch(`${url}/products/refnum/${encodedTerm}`)
      ]);

      if (!byNameResults.ok || !byRefNumResults.ok) {
        throw new Error("Error fetching filtered products");
      }

      const [byNameProducts, byEnterpriseProducts]: [ProductAPI[], ProductAPI[]] = await Promise.all([
        byNameResults.json(),
        byRefNumResults.json()
      ]);

      const uniqueProducts = [...byNameProducts, ...byEnterpriseProducts].filter(
        (product, index, self) =>
          index === self.findIndex(c => c.RefNum === product.RefNum)
      );

      return uniqueProducts;
    } else {
      const response = await fetch(`${url}/products`);
      if (!response.ok) throw new Error("Error fetching all products");

      const allProducts: ProductAPI[] = await response.json();
      return allProducts;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}, []);