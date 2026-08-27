import { useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

const FALLBACK_PARTNERS = [
  { id: 1, name: 'inlabels', logo: '/assets/logos/1.png' },
  { id: 2, name: 'SCOPE fusion', logo: '/assets/logos/2.png' },
  { id: 3, name: 'Client 3', logo: '/assets/logos/3.png' },
  { id: 4, name: 'Client 4', logo: '/assets/logos/4.png' },
  { id: 5, name: 'Client 5', logo: '/assets/logos/5.png' },
  { id: 6, name: 'Client 6', logo: '/assets/logos/6.png' },
  { id: 7, name: 'Client 7', logo: '/assets/logos/7.png' },
  { id: 8, name: 'Client 8', logo: '/assets/logos/8.png' },
  { id: 9, name: 'Client 9', logo: '/assets/logos/9.png' },
  { id: 10, name: 'Client 10', logo: '/assets/logos/10.png' },
  { id: 11, name: 'Client 11', logo: '/assets/logos/11.png' },
  { id: 12, name: 'Client 12', logo: '/assets/logos/12.png' },
  { id: 13, name: 'Client 13', logo: '/assets/logos/13.png' },
  { id: 14, name: 'Client 14', logo: '/assets/logos/14.png' },
];

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
