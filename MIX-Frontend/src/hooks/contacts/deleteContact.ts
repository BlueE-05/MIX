import { url } from "@/utils/constants";

export const deleteContact = async (contactId: number): Promise<void> => {
    const response = await fetch(`${url}/api/contacts/${contactId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error deleting contact: ${response.status} - ${errorText}`);
    }
};