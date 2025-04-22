'use client';

interface BoxComisionesProps {
  comisiones?: number;
}

export default function BoxComisiones({ comisiones }: BoxComisionesProps = {}) {
  // Valor por defecto si no se pasa la prop
  const amount = comisiones ?? 12500;
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Commissions</h3>
      <p className="text-3xl font-bold text-green-600">${amount.toLocaleString()}</p>
    </div>
  );
}