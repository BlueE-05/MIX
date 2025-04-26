import { EnterpriseGet } from "@/types/EnterpriseTypes";
import { url } from "@/utils/constants";

export const fetchEnterprises = async (): Promise<EnterpriseGet[]> => {
    try {
        const response = await fetch(`${url}/api/enterprises`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching enterprises: ${response.status} - ${errorText}`);
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching enterprises:", error);
        return [];
    }
}