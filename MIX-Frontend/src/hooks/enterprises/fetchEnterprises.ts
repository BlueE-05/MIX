import { EnterpriseGet } from "@/types/EnterpriseTypes";

const fetchEnterprises = async (page: number, pageSize: number): Promise<EnterpriseGet[]> => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
        console.error("API URL not defined in environment variables");
        return [];
    }
    
    try {
        const response = await fetch(`${url}/enterprises`, {
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