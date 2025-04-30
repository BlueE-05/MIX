import { useEffect, useState } from 'react';
import { url } from '@/utils/constants';
import { useFullProfile } from '@/hooks/useFullProfile';

export function useUserSalesInfo(userEmail?: string, isAdmin: boolean = false) {
  const { profile } = useFullProfile();
  const [data, setData] = useState({
    cerradas: 0,
    activas: 0,
    canceladas: 0,
    comisiones: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const emailToUse = userEmail || profile?.email;
    if (!emailToUse) return;

    const fetchSalesInfo = async () => {
      setLoading(true);
      try {
        const endpoint = isAdmin && userEmail
          ? `${url}/report/SalesInfoMemberByEmail`
          : `${url}/report/SalesInfoMember`;

        const res = await fetch(endpoint, {
          method: userEmail ? 'POST' : 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          ...(userEmail ? { body: JSON.stringify({ email: emailToUse }) } : {}),
        });

        if (!res.ok) throw new Error('Error al obtener información de ventas');
        const json = await res.json();
        const info = Array.isArray(json) ? json[0] : json;

        setData({
          canceladas: Number(info.Canceladas || 0),
          activas: Number(info.Activas || 0),
          cerradas: Number(info.VentasCerradas || 0),
          comisiones: Number(info.TotalComisiones || 0),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesInfo();
  }, [userEmail, profile?.email]);

  return { ...data, loading, error };
}