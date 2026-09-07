import { useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

const FALLBACK_PARTNERS = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Client ${i + 1}`,
  logo: `/assets/logos/${i + 1}.png`
}));


export function usePartners() {
  const [partners, setPartners] = useState(FALLBACK_PARTNERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/api/partners`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setPartners(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          // Keep using FALLBACK_PARTNERS seamlessly
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

  return () => {
    isMounted = false;
  };
}, []);

  return { partners, loading, error };
}
