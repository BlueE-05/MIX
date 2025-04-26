import { ContactRecieve } from "@/types/ContactTypes";
import { url } from "@/utils/constants";

export const fetchContacts = async (searchTerm?: string): Promise<ContactRecieve[]> => {
  try {
    if (searchTerm && searchTerm.trim() !== '') {
      const encodedTerm = encodeURIComponent(searchTerm);

      const [byNameResults, byEnterpriseResults] = await Promise.all([
        fetch(`${url}/api/contacts/name/${encodedTerm}`),
        fetch(`${url}/api/contacts/enterprise/${encodedTerm}`)
      ]);

      if (!byNameResults.ok || !byEnterpriseResults.ok) {
        throw new Error("Error fetching filtered contacts");
      }

      const [byNameContacts, byEnterpriseContacts]: [ContactRecieve[], ContactRecieve[]] = await Promise.all([
        byNameResults.json(),
        byEnterpriseResults.json()
      ]);

      // Remove duplicates while preserving order
      const uniqueContacts = [...byNameContacts, ...byEnterpriseContacts].reduce(
        (acc: ContactRecieve[], current) => {
          if (!acc.some(contact => contact.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, 
        []
      );

      return uniqueContacts;
    } else {
      const response = await fetch(`${url}/api/contacts`);
      if (!response.ok) throw new Error("Error fetching all contacts");

      const allContacts: ContactRecieve[] = await response.json();
      return allContacts;
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};