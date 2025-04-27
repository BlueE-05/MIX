import { ContactData } from "@/types/ContactTypes";
import { url } from "@/utils/constants";

export const createContact = async (contactData: ContactData): Promise<void> => {
  const response = await fetch(`${url}/api/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData.EnterpriseName),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error creating contact: ${response.status} - ${errorText}`);
  }
};