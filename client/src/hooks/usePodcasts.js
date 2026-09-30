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
    id: 'pod-why-startups-fail',
    title: 'Why Most Startups FAIL to Raise Funding | VC Secrets ft. Andrea Azzolari',
    youtubeUrl: 'https://www.youtube.com/watch?v=TcFcFcInvEI',
    videoId: 'TcFcFcInvEI',
    guest: 'ft. Andrea Azzolari · Principal, Plug and Play Tech Center MENA',
    duration: '1 min 21 sec',
    category: 'VC Secrets',
    desc: 'Inside the pitch room: why most startups fail to close term sheets, and the red flags VCs spot in the first 5 minutes.',
  },
  {
    id: 'pod-wealth-destroys-families',
    title: 'How Wealth Destroys Families: The Shocking Truth About Money & Power!',
    youtubeUrl: 'https://www.youtube.com/watch?v=d6pu_iluZYU',
    videoId: 'd6pu_iluZYU',
    guest: 'Founders Talk with Ayub',
    duration: '8 min 24 sec',
    category: 'Wealth & Family Offices',
    desc: 'The shocking reality behind wealth preservation, generational conflict, and how regional dynasties manage and protect family office capital.',
  },
  {
    id: 'pod-vc-effect',
    title: 'The VC Effect: Turning Bold Ideas Into Billion Dollar Empires',
    youtubeUrl: 'https://www.youtube.com/watch?v=ivIKIhgTqaM',
    videoId: 'ivIKIhgTqaM',
    guest: 'Founders Talk with Ayub',
    duration: '1 hr 10 min',
    category: 'Venture Capital',
    desc: 'Unpacking the venture capital flywheel in the Middle East and how high-conviction founders scale from seed stage to regional decacorns.',
  },
  {
    id: 'pod-mena-strategies',
    title: 'MENA Startup Strategies: How to Navigate VC Culture & Embrace Failure',
    youtubeUrl: 'https://www.youtube.com/watch?v=cRRVPKch9gc',
    videoId: 'cRRVPKch9gc',
    guest: 'Founders Talk with Ayub',
    duration: '47 min 38 sec',
    category: 'Startup Strategy',
    desc: 'A raw discussion on founder resilience, pivoting through economic cycles, and building a high-velocity startup in the Gulf.',
  },
  {
    id: 'pod-dubai-vs-eu',
    title: 'Dubai vs EU Startups: Is Gulf the Smart Move Right Now?',
    youtubeUrl: 'https://www.youtube.com/watch?v=DpkrALvguT8',
    videoId: 'DpkrALvguT8',
    guest: 'Founders Talk with Ayub',
    duration: '53 min 34 sec',
    category: 'Dubai & Ecosystem',
    desc: '0% tax, rapid regulatory support, and deep sovereign capital: comparing the UAE startup ecosystem against established European hubs.',
  },
  {
    id: 'pod-save-invest-dubai',
    title: 'How to Save & Invest Money in Dubai (UAE)',
    youtubeUrl: 'https://www.youtube.com/watch?v=SAOsGRA4x6Q',
    videoId: 'SAOsGRA4x6Q',
    guest: 'Founders Talk with Ayub',
    duration: '15 min 5 sec',
    category: 'Wealth & Investing',
    desc: 'A practical roadmap for founders and executives to optimize cash flow, tax-efficient structures, and offshore wealth in Dubai.',
  },
  {
    id: 'pod-fundraising-works',
    title: 'How Startup Fundraising Works | Startup School',
    youtubeUrl: 'https://www.youtube.com/watch?v=rjflnyDqN2M',
    videoId: 'rjflnyDqN2M',
    guest: 'ft. Ivo Detelinov · Investor who funded 26 startups',
    duration: '1 hr 13 min',
    category: 'Fundraising Masterclass',
    desc: 'A comprehensive masterclass on how startup fundraising actually works: valuation mechanics, pitch deck narratives, SAFEs, and negotiating with lead investors.',
  },
  {
    id: 'pod-family-offices',
    title: 'Family Offices From Scratch',
    youtubeUrl: 'https://www.youtube.com/watch?v=SrJu7zkwsYs',
    videoId: 'SrJu7zkwsYs',
    guest: 'Advisor to the region\'s wealthiest families',
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
