import { ContactAPI } from "@/types/ContactTypes";

const createContact = async (contactData: ContactAPI): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error("API URL not defined in environment variables");
  }

  try {
    const response = await fetch(`${url}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating contact: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error("Error creating contact:", error);
  }
};