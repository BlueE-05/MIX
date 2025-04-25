import { ProductAPI } from "@/types/ProductTypes";

const updateProduct = async (updatedData: ProductAPI): Promise<void> => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
        console.error("API URL not defined in environment variables");
        return;
    }

    try {
        const response = await fetch(`${url}/products/${updatedData.RefNum}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error updating product: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
};