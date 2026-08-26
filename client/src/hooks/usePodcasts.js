import { useState, useEffect } from 'react';

const FALLBACK_PODCASTS = [
  {
    id: 'pod-1',
    title: 'Founder Raised: Zero to Funded | Reached 2.5M Subscribers',
    youtubeUrl: 'https://www.youtube.com/watch?v=7EXsB0FWuyw',
    videoId: '7EXsB0FWuyw',
    guest: 'Growth Secrets with Top MENA Creators',
    duration: '38 min',
    timestamp: '04:15',
  },
  {
    id: 'pod-2',
    title: 'How Can You Build Wealth in 2025? | Investing & Tax Tips',
    youtubeUrl: 'https://www.youtube.com/watch?v=bghlkGP1894',
    videoId: 'bghlkGP1894',
    guest: 'Private Wealth & Tax Strategies in UAE',
    duration: '44 min',
    timestamp: '02:30',
  },
  {
    id: 'pod-3',
    title: 'How Family Offices Invest in Middle East | Family Offices',
    youtubeUrl: 'https://www.youtube.com/watch?v=SrJu7zkwsYs',
    videoId: 'SrJu7zkwsYs',
    guest: 'GCC Family Office Allocations & Direct Deals',
    duration: '52 min',
    timestamp: '06:45',
  },
  {
    id: 'pod-4',
    title: 'Why Most Startups FAIL to Raise Funding | VC Secrets',
    youtubeUrl: 'https://www.youtube.com/watch?v=TcFcFcInvEI',
    videoId: 'TcFcFcInvEI',
    guest: 'ft. Andrea Azzolari · Venture Insights',
    duration: '41 min',
    timestamp: '03:10',
  },
];

export function usePodcasts() {
  const [podcasts, setPodcasts] = useState(FALLBACK_PODCASTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch('http://localhost:5000/api/podcasts')
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
