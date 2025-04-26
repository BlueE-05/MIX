//ESTE COMPONENTE ES UTILIZADO PARA MOSTRAR LA INFORMACIÓN DE UN EQUIPO
//O DE UN MIEMBRO DEL EQUIPO EN PARTICUAL EN VISTA DE ADMIN

'use client';

interface BoxClosedProps {
  closedDeals?: number;
  numberSize?: string;
}

export default function BoxClosedReport({ closedDeals, numberSize = "text-3xl"}: BoxClosedProps = {}) {
  // Valor por defecto si no se pasa la prop
  const deals = closedDeals ?? 1000;
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">Closed Deals</h3>
      <p className={`font-bold text-blue-600 flex items-center justify-center ${numberSize}`}>{deals}</p>
    </div>
  );
}