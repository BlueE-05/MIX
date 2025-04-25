import { EnterpriseSend } from "@/types/EnterpriseTypes";

const newEnterprise = async (enterpriseData: EnterpriseSend): Promise<void> => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
      console.error("API URL not defined in environment variables");
    }

    try {
        const response = await fetch(`${url}/enterprises`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(enterpriseData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error creating enterprise: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error("Error creating enterprise:", error);
    }
};