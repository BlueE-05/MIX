import { EnterpriseSend } from "@/types/EnterpriseTypes";
import { url } from "@/utils/constants";

export const createEnterprise = async (enterpriseData: EnterpriseSend): Promise<void> => {
    const response = await fetch(`${url}/api/enterprises`, {
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
};