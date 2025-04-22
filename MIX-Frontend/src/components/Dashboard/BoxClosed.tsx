'use client';

interface BoxClosedProps {
  closedDeals?: number;
  justify?: string;
}

export default function BoxClosed({ closedDeals, justify }: BoxClosedProps = {}) {
  // Valor por defecto si no se pasa la prop
  const deals = closedDeals ?? 42;
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Closed Deals</h3>
      <p className={`text-3xl font-bold text-blue-600 ${justify}`}>{deals}</p>
    </div>
  );
}