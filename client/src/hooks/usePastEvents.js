import { useState, useEffect } from 'react';

const FALLBACK_PAST_EVENTS = [
  {
    id: 1,
    title: 'What Investors Really Think About Startups Outside the US',
    youtubeUrl: 'https://www.youtube.com/shorts/z1UMcbF7i9A',
    videoId: 'z1UMcbF7i9A',
    category: 'Startup Fundraising',
  },
  {
    id: 2,
    title: "Top VC Firms Don't Win by Seeing More Deals",
    youtubeUrl: 'https://www.youtube.com/shorts/lPuPA9M2zsQ',
    videoId: 'lPuPA9M2zsQ',
    category: 'Startup Fundraising',
  },
  {
    id: 3,
    title: 'Startup Innovation Meetup | Founder & Investor Connect',
    youtubeUrl: 'https://www.youtube.com/shorts/6F1UNtMalJ4',
    videoId: '6F1UNtMalJ4',
    category: 'Community',
  },
  {
    id: 4,
    title: 'Global Fundraising Bootcamp Cohort 3 — Master Pitch Decks & GTM',
    youtubeUrl: 'https://www.youtube.com/shorts/FbnIgzwafD4',
    videoId: 'FbnIgzwafD4',
    category: 'Workshops',
  },
  {
    id: 5,
    title: 'Expand North Star 2025: Investors Roundtable & Demo Day',
    youtubeUrl: 'https://www.youtube.com/shorts/2l7s12IIu7s',
    videoId: '2l7s12IIu7s',
    category: 'Community',
  },
  {
    id: 6,
    title: 'AI Meets Blockchain: Erik Mendelson at Frontier Capital Roundtable',
    youtubeUrl: 'https://www.youtube.com/shorts/PM383MoSQPM',
    videoId: 'PM383MoSQPM',
    category: 'Workshops',
  },
  {
    id: 7,
    title: 'The Investors Roundtable + Demo Day',
    youtubeUrl: 'https://www.youtube.com/shorts/7gjQPHrBeG0',
    videoId: '7gjQPHrBeG0',
    category: 'Startup Fundraising',
  },
  {
    id: 8,
    title: 'Inside the Investors Roundtable + Demo Day',
    youtubeUrl: 'https://www.youtube.com/shorts/kTNOAtNIJr0',
    videoId: 'kTNOAtNIJr0',
    category: 'Community',
  },
  {
    id: 9,
    title: 'Investors Roundtable + Demo Day + After Party',
    youtubeUrl: 'https://www.youtube.com/shorts/ncTZX7T8Etc',
    videoId: 'ncTZX7T8Etc',
    category: 'Community',
  },
  {
    id: 10,
    title: 'Inside the Global Fundraising Bootcamp | Founders Journey',
    youtubeUrl: 'https://www.youtube.com/shorts/gIw3kw30wgc',
    videoId: 'gIw3kw30wgc',
    category: 'Workshops',
  },
];

import { API_BASE } from '../config/api';

export function usePastEvents() {
  const [pastEvents, setPastEvents] = useState(FALLBACK_PAST_EVENTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/api/past-events`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setPastEvents(data);
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

  return { pastEvents, loading, error };
}
