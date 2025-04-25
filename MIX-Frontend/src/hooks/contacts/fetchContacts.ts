import { ContactAPI } from "@/types/ContactTypes";
import { useCallback } from "react";

const fetchContacts = useCallback(async (searchTerm?: string): Promise<ContactAPI[]> => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error("API URL not defined in environment variables");
    return [];
  }

  try {
    if (searchTerm?.trim()) {
      const encodedTerm = encodeURIComponent(searchTerm.trim());

      const [byNameResults, byEnterpriseResults] = await Promise.all([
        fetch(`${url}/contacts/name/${encodedTerm}`),
        fetch(`${url}/contacts/enterprise/${encodedTerm}`)
      ]);

      if (!byNameResults.ok || !byEnterpriseResults.ok) {
        throw new Error("Error fetching filtered contacts");
      }

      const [byNameContacts, byEnterpriseContacts]: [ContactAPI[], ContactAPI[]] = await Promise.all([
        byNameResults.json(),
        byEnterpriseResults.json()
      ]);

      const uniqueContacts = [...byNameContacts, ...byEnterpriseContacts].filter(
        (contact, index, self) =>
          index === self.findIndex(c => c.ID === contact.ID)
      );

      return uniqueContacts;
    } else {
      const response = await fetch(`${url}/contacts`);
      if (!response.ok) throw new Error("Error fetching all contacts");

      const allContacts: ContactAPI[] = await response.json();
      return allContacts;
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}, []);