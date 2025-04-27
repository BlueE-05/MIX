import { url } from "@/utils/constants";

export const deleteProduct = async (refnum: string): Promise<void> => {
    try {
        const response = await fetch(`${url}/api/products/${refnum}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error deleting product: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};