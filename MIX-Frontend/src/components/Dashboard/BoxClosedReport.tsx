'use client';

import { useUserSalesInfo } from '@/hooks/useUserSaleInfo';

interface Props {
  isAdmin?: boolean;
  selectedUserEmail?: string;
  numberSize?: string;
  closedDeals?: number;
}

export default function BoxClosedReport({
  isAdmin = false,
  selectedUserEmail,
  numberSize = 'text-3xl',
  closedDeals,
}: Props) {
  const useEmail = isAdmin && selectedUserEmail ? selectedUserEmail : undefined;

  const { cerradas, loading, error } = useUserSalesInfo(useEmail);
  const finalCerradas = closedDeals ?? cerradas;

  const getTextSize = (amount: number) => {
    const len = Math.floor(amount).toString().length;
    if (len <= 5) return 'text-3xl';
    if (len === 6) return 'text-2xl';
    if (len === 7) return 'text-xl';
    if (len === 8) return 'text-lg';
    return 'text-base';
  };

  return (
    <div className="p-4 items-center text-center">
      <h3 className={`text-lg font-semibold mb-2 ${numberSize}`}>Closed Deals</h3>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading data...</div>
      ) : error ? (
        <div className="text-red-700 px-4 py-3">Error: {error}</div>
      ) : (
        <div className={`${getTextSize(finalCerradas)} font-bold text-blue-600 break-words`}>
          {finalCerradas}
        </div>
      )}
    </div>
  );
}