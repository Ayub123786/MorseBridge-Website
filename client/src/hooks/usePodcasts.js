import { useState, useEffect } from 'react';

const FALLBACK_PODCASTS = [
  {
    id: 'pod-plug-and-play',
    title: 'Principal Plug and Play: Investors are Not ATM Machines!',
    youtubeUrl: 'https://www.youtube.com/watch?v=O1hPe9GncBQ',
    videoId: 'O1hPe9GncBQ',
    guest: 'ft. Andrea Azzolari · Principal, Plug and Play Tech Center MENA',
    duration: '1 hr 7 min',
    category: 'Venture Capital',
    desc: 'Andrea Azzolari, Principal at Plug and Play Tech Center MENA, breaks down VC evaluation criteria, why investors are not ATM machines, and what truly makes founders fundable.',
  },
  {
    id: 'pod-fundraising-works',
    title: 'How Startup Fundraising Works | Startup School',
    youtubeUrl: 'https://www.youtube.com/watch?v=rjflnyDqN2M',
    videoId: 'rjflnyDqN2M',
    guest: 'Founders Talk with Ayub · Full Masterclass',
    duration: '1 hr 13 min',
    category: 'Fundraising Masterclass',
    desc: 'A comprehensive masterclass on how startup fundraising actually works: valuation mechanics, pitch deck narratives, SAFEs, and negotiating with lead investors.',
  },
  {
    id: 'pod-family-offices',
    title: 'Family Offices From Scratch',
    youtubeUrl: 'https://www.youtube.com/watch?v=SrJu7zkwsYs',
    videoId: 'SrJu7zkwsYs',
    guest: 'Private Wealth & Family Offices Blueprint',
    duration: '1 hr 5 min',
    category: 'Family Offices',
    desc: 'Everything founders and fund managers need to know about Family Offices: structure, investment mandates, direct startup deals, and securing long-term institutional backing.',
  },
];

import { API_BASE } from '../config/api';

export function usePodcasts() {
  const [podcasts, setPodcasts] = useState(FALLBACK_PODCASTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/api/podcasts`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setPodcasts(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
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

  return { podcasts, loading, error };
}
