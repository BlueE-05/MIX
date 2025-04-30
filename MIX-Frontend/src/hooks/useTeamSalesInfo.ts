import { useEffect, useState } from 'react';
import { url } from '@/utils/constants';

export function useTeamSalesInfo() {
  const [data, setData] = useState({
    cerradas: 0,
    activas: 0,
    canceladas: 0,
    comisiones: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/report/SalesInfoMember`, { credentials: 'include' });
        if (!res.ok) throw new Error('Error al obtener info de team');
        const json = await res.json();
        const info = Array.isArray(json) ? json.reduce((acc, m) => ({
          canceladas: acc.canceladas + Number(m.Canceladas || 0),
          activas: acc.activas + Number(m.Activas || 0),
          cerradas: acc.cerradas + Number(m.VentasCerradas || 0),
          comisiones: acc.comisiones + Number(m.TotalComisiones || 0),
        }), { canceladas: 0, activas: 0, cerradas: 0, comisiones: 0 }) : json;
        setData(info);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { ...data, loading, error };
}