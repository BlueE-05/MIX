import { ContactData } from "@/components/Forms/ContactsForms";

const updateContact = async (contactId: number, updatedData: ContactData): Promise<void> => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
        console.error("API URL not defined in environment variables");
        return;
    }

    try {
        const response = await fetch(`${url}/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error updating contact: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error("Error updating contact:", error);
    }
};