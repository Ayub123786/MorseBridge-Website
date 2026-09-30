import { useState, useEffect } from 'react';

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    title: 'Startup Voices from MorseBridge | Real Reactions',
    youtubeUrl: 'https://www.youtube.com/shorts/Cgl0gJpd268',
    videoId: 'Cgl0gJpd268',
    tag: 'FOUNDER VOICES',
    category: 'Founders',
    speaker: 'Elena & Cohort Founders',
  },
  {
    id: 2,
    title: 'Mo Khaldi on Why Every Founder Should Join the Bootcamp',
    youtubeUrl: 'https://www.youtube.com/shorts/TAGRO208seA',
    videoId: 'TAGRO208seA',
    tag: 'BOOTCAMP ADVICE',
    category: 'Bootcamp',
    speaker: 'Mo Khaldi',
  },
  {
    id: 3,
    title: 'Inside the Global Fundraising Bootcamp | Founder Journey',
    youtubeUrl: 'https://www.youtube.com/shorts/gIw3kw30wgc',
    videoId: 'gIw3kw30wgc',
    tag: 'FOUNDER JOURNEY',
    category: 'Founders',
    speaker: 'Bootcamp Alumni',
  },
  {
    id: 4,
    title: 'MyGatePass Founder on Scaling in UAE & Bootcamp Experience',
    youtubeUrl: 'https://www.youtube.com/shorts/dLgAo8CekmE',
    videoId: 'dLgAo8CekmE',
    tag: 'UAE SCALING',
    category: 'Founders',
    speaker: 'MyGatePass Founder',
  },
  {
    id: 5,
    title: 'Pitch Fast, Negotiate Smart | Startup Demo Day Reactions',
    youtubeUrl: 'https://www.youtube.com/shorts/PNKRx4EwrBk',
    videoId: 'PNKRx4EwrBk',
    tag: 'DEMO DAY',
    category: 'Investors',
    speaker: 'Demo Day Judges',
  },
  {
    id: 6,
    title: 'How Startups Can Fix Pitch Decks, Numbers & GTM',
    youtubeUrl: 'https://www.youtube.com/shorts/2200y9BUmac',
    videoId: '2200y9BUmac',
    tag: 'PITCH & GTM',
    category: 'Bootcamp',
    speaker: 'Venture Advisors',
  },
  {
    id: 7,
    title: 'Fundraise Ready: Legal Masterclass with Top GCC Counsel',
    youtubeUrl: 'https://www.youtube.com/shorts/OXquRPVm_7E',
    videoId: 'OXquRPVm_7E',
    tag: 'LEGAL MASTERCLASS',
    category: 'Investors',
    speaker: 'Top GCC Counsel',
  },
  {
    id: 8,
    title: 'Inside the B2B SaaS Sales Workshop & GTM Strategy',
    youtubeUrl: 'https://www.youtube.com/shorts/ZzAFGdNmXsI',
    videoId: 'ZzAFGdNmXsI',
    tag: 'B2B SAAS',
    category: 'Founders',
    speaker: 'Enterprise Builders',
  },
];

const DEFAULT_METADATA = {
  1: { tag: 'FOUNDER VOICES', category: 'Founders', speaker: 'Elena & Cohort Founders' },
  2: { tag: 'BOOTCAMP ADVICE', category: 'Bootcamp', speaker: 'Mo Khaldi' },
  3: { tag: 'FOUNDER JOURNEY', category: 'Founders', speaker: 'Bootcamp Alumni' },
  4: { tag: 'UAE SCALING', category: 'Founders', speaker: 'MyGatePass Founder' },
  5: { tag: 'DEMO DAY', category: 'Investors', speaker: 'Demo Day Judges' },
  6: { tag: 'PITCH & GTM', category: 'Bootcamp', speaker: 'Venture Advisors' },
  7: { tag: 'LEGAL MASTERCLASS', category: 'Investors', speaker: 'Top GCC Counsel' },
  8: { tag: 'B2B SAAS', category: 'Founders', speaker: 'Enterprise Builders' },
};

import { API_BASE } from '../config/api';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const enriched = data.map((item, idx) => {
            const meta = DEFAULT_METADATA[item.id] || DEFAULT_METADATA[(idx % 8) + 1] || {};
            return {
              ...item,
              tag: item.tag || meta.tag || 'COMMUNITY VOICE',
              category: item.category || meta.category || 'Founders',
              speaker: item.speaker || meta.speaker || 'Founder & Investor',
            };
          });
          setTestimonials(enriched);
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

  return { testimonials, loading, error };
}
