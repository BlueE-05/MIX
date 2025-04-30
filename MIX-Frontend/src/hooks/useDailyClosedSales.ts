import { useEffect, useState } from 'react';
import { url } from '@/utils/constants';
import { useFullProfile } from '@/hooks/useFullProfile';

interface SalePoint {
  DiaDelMes: number;
  VentasCerradas: number;
}

export function useDailyClosedSales(email?: string, forceIndividual = false) {
    const [data, setData] = useState<SalePoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const { profile, loading: loadingProfile } = useFullProfile();
  
    useEffect(() => {
      if (loadingProfile) return;
  
      const isIndividual = forceIndividual || !!email;
      const payload = isIndividual
        ? { email: email ?? profile?.email }
        : { iduser: profile?.email };
  
      if (!payload.email && !payload.iduser) return;
  
      const fetchData = async () => {
        setLoading(true);
        try {
          const endpoint = isIndividual
            ? `${url}/report/DailyClosedSalesByMember`
            : `${url}/report/DailyClosedSalesByTeam`;
  
          const res = await fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
  
          if (!res.ok) throw new Error('Error al obtener ventas cerradas');
          const json = await res.json();
          setData(Array.isArray(json) ? json : []);
        } catch (err: any) {
          setError(err.message || 'Unknown error');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [email, profile?.email, loadingProfile, forceIndividual]);
  
    return { data, loading, error };
  }
  