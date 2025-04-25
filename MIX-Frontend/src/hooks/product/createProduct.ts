import { ProductAPI } from "@/types/ProductTypes";

const createProduct = async (productData: ProductAPI): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error("API URL not defined in environment variables");
  }

  try {
    const response = await fetch(`${url}/products`, {
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