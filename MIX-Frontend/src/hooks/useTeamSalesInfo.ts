import { useEffect, useState } from 'react';
import { url } from '@/utils/constants';

const initialData = {
  cerradas: 0,
  activas: 0,
  canceladas: 0,
  comisiones: 0,
};

export function useTeamSalesInfo() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/report/SalesInfoTeam`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          signal: controller.signal,
        });
        console.log('Response status:', res.status);

        if (!res.ok) throw new Error('Error al obtener info de team');

        const json = await res.json();

        const info = Array.isArray(json)
          ? json.reduce((acc, item) => ({
              canceladas: acc.canceladas + Number(item.Canceladas ?? 0),
              activas: acc.activas + Number(item.Activas ?? 0),
              cerradas: acc.cerradas + Number(item.VentasCerradas ?? 0),
              comisiones: acc.comisiones + Number(item.TotalComisiones ?? 0),
            }), initialData)
          : initialData;

        setData(info);
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return { ...data, loading, error };
}