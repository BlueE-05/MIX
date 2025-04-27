import { ProductReceive } from "@/types/ProductTypes";
import { url } from "@/utils/constants";

export const createProduct = async (productData: ProductReceive): Promise<void> => {
  try {
    const response = await fetch(`${url}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating product: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error("Error creating product:", error);
  }
};