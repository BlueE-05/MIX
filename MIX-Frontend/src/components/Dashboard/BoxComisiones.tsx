'use client';

interface BoxComisionesProps {
  comisiones?: number;
  numberSize?: string;
}

export default function BoxComisiones({ comisiones, numberSize = "text-3xl" }: BoxComisionesProps = {}) {
  // Valor por defecto si no se pasa la prop
  const amount = comisiones ?? 12500;
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">Commissions</h3>
      <p className={`text-3xl font-bold text-green-600 flex items-center justify-center ${numberSize}`}>${amount.toLocaleString()}</p>
    </div>
  );
}