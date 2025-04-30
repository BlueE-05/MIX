'use client';

import { useTeamSalesInfo } from '@/hooks/useTeamSalesInfo';

export default function BoxComisionesTeam() {
  const { comisiones, loading, error } = useTeamSalesInfo();

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
      <h3 className="text-lg font-semibold mb-2">Comisiones (Team)</h3>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Cargando...</div>
      ) : error ? (
        <div className="text-red-700 px-4 py-3">Error: {error}</div>
      ) : (
        <div className={`${getTextSize(comisiones)} font-bold text-green-600 break-words`}>
          ${comisiones.toFixed(2)}
        </div>
      )}
    </div>
  );
}