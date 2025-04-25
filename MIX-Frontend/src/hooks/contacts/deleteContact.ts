const deleteContact = async (contactId: number): Promise<void> => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
        console.error("API URL not defined in environment variables");
    }

    try {
        const response = await fetch(`${url}/contacts/${contactId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error deleting contact: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error("Error deleting contact:", error);
    }
};