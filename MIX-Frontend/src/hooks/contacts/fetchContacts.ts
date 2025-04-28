import { ContactReceive } from "@/types/ContactTypes";
import { url } from "@/utils/constants";

export const fetchContacts = async (searchTerm?: string): Promise<ContactReceive[]> => {
  try {
    if (searchTerm && searchTerm.trim() !== '') {
      const encodedTerm = encodeURIComponent(searchTerm);

      const [byNameResults, byEnterpriseResults] = await Promise.all([
        fetch(`${url}/api/contacts/name/${encodedTerm}`, { credentials: "include" }),
        fetch(`${url}/api/contacts/enterprise/${encodedTerm}`,  { credentials: "include" })
      ]);

      if (!byNameResults.ok || !byEnterpriseResults.ok) {
        throw new Error("Error fetching filtered contacts");
      }

      const [byNameContacts, byEnterpriseContacts]: [ContactReceive[], ContactReceive[]] = await Promise.all([
        byNameResults.json(),
        byEnterpriseResults.json()
      ]);

      // Remove duplicates while preserving order
      const uniqueContacts = [...byNameContacts, ...byEnterpriseContacts].reduce(
        (acc: ContactReceive[], current) => {
          if (!acc.some(contact => contact.ID === current.ID)) {
            acc.push(current);
          }
          return acc;
        },
        []
      );

      return uniqueContacts;
    } else {
      const response = await fetch(`${url}/api/contacts`, { credentials: "include" });
      if (!response.ok) throw new Error("Error fetching all contacts");

      const allContacts: ContactReceive[] = await response.json();
      return allContacts;
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};