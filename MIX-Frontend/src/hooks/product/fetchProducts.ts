import { ProductReceive } from "@/types/ProductTypes";
import { url } from "@/utils/constants";

export const fetchProducts = async (searchTerm?: string): Promise<ProductReceive[]> => {
  try {
    if (searchTerm?.trim()) {
      const encodedTerm = encodeURIComponent(searchTerm.trim());

      const [byNameResults, byRefNumResults] = await Promise.all([
        fetch(`${url}/api/products/name/${encodedTerm}`),
        fetch(`${url}/api/products/refnum/${encodedTerm}`)
      ]);

      if (!byNameResults.ok || !byRefNumResults.ok) {
        throw new Error("Error fetching filtered products");
      }

      const [byNameProducts, byEnterpriseProducts]: [ProductReceive[], ProductReceive[]] = await Promise.all([
        byNameResults.json(),
        byRefNumResults.json()
      ]);

      const uniqueProducts = [...byNameProducts, ...byEnterpriseProducts].filter(
        (product, index, self) =>
          index === self.findIndex(c => c.RefNum === product.RefNum)
      );

      return uniqueProducts;
    } else {
      const response = await fetch(`${url}/api/products`);
      if (!response.ok) throw new Error("Error fetching all products");

      const allProducts: ProductReceive[] = await response.json();
      return allProducts;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};