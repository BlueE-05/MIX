'use client';

interface BoxClosedProps {
  closedDeals?: number;
  numberSize?: string;
}

export default function BoxClosed({ closedDeals, numberSize = "text-3xl"}: BoxClosedProps = {}) {
  // Valor por defecto si no se pasa la prop
  const deals = closedDeals ?? 1000;
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">Closed Deals</h3>
      <p className={`font-bold text-blue-600 flex items-center justify-center ${numberSize}`}>{deals}</p>
    </div>
  );
}