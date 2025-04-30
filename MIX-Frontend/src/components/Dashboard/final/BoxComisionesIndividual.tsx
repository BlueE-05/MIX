'use client';

import { useUserSalesInfo } from '@/hooks/useUserSaleInfo';

interface Props {
  email: string;
  isAdmin?: boolean;
}

export default function BoxComisionesIndividual({ email, isAdmin = false }: Props) {
  const { comisiones, loading, error } = useUserSalesInfo(email, isAdmin);

  return (
    <div className="p-4 items-center text-center">
      <h3 className="text-lg font-semibold mb-2">Comisiones (User)</h3>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-700 px-4 py-3">Error: {error}</div>
      ) : (
        <div className="text-3xl font-bold text-green-600 break-words">
          ${comisiones.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
        </div>
      )}
    </div>
  );
}