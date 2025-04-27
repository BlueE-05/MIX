import { ProductUpdate } from "@/types/ProductTypes";
import { url } from "@/utils/constants";

export const updateProduct = async (refNum: string, updatedData: ProductUpdate): Promise<void> => {
    try {
        const response = await fetch(`${url}/api/products/${refNum}`, {
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