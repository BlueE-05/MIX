import { ContactData } from "@/types/ContactTypes";
import { url } from "@/utils/constants";

export const updateContact = async (contactId: number, updatedData: ContactData): Promise<void> => {
    const response = await fetch(`${url}/api/contacts/${contactId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Data: ${JSON.stringify(updatedData.EnterpriseName)} Error updating contact: ${response.status} - ${errorText}`);
    }
};