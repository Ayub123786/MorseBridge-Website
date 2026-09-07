import { useState, useEffect } from 'react';

const FALLBACK_EVENTS = [
  {
    id: 'acc-1',
    badge: 'Cohort 04 Open',
    badgeType: 'primary',
    title: 'Revenue First AI Accelerator',
    image: '/assets/events/revenue_first_accelerator.png',
    date: 'Cohort 04 Enrolling Now',
    time: '12-Week Intensive GTM & Capital Sprint',
    location: 'In5 Tech Dubai / Riyadh & Remote',
    price: 'Apply with Form',
    type: 'Hybrid',
    seatsLeft: '12 Startups',
    description: 'Scale enterprise AI revenue, institutionalize outbound GTM loops, stress-test 5-Minute CFO financial models, and pitch directly to Tier-1 institutional venture funds.',
    tags: ['AI Accelerator', 'Revenue First', 'GTM', 'Enterprise AI', 'Demo Day'],
    applyLink: '/apply?program=revenue-first-ai-accelerator',
    isForm: true,
    buttonText: 'Apply with Form',
    calLink: 'https://cal.com/morsebridge/30-min-intro',
  },
  {
    id: 'boot-1',
    badge: 'Every Month',
    badgeType: 'primary',
    title: 'Global Fundraising Boot Camp',
    image: '/assets/events/bootcamp.png',
    date: 'Every Month (Monthly Cohorts)',
    time: '5 Intensive Workshops & 1-on-1 Sprints',
    location: 'In5 Tech Dubai / Global Online Livestream',
    price: 'Apply with Form',
    type: 'Every Month',
    seatsLeft: '10 Startups / Month',
    description: 'Held every month: 10 early-stage startups master pitch decks, the 5-Minute CFO model, SAFEs, and term sheet negotiations with 25 active angels, VCs, and accelerators.',
    tags: ['Bootcamp', 'Every Month', 'Fundraising', 'Pitch Decks', 'Monthly Cohort'],
    applyLink: '/apply?program=global-fundraising-bootcamp',
    isForm: true,
    buttonText: 'Apply with Form',
    calLink: 'https://cal.com/morsebridge/30-min-intro',
  },
  {
    id: 3,
    badge: 'Coming This November!',
    badgeType: 'warning',
    title: 'Dubai Rising 2026 — The Ultimate Startups & Investor Summit',
    image: '/assets/events/riyadh-rising.png',
    date: 'Coming This November (Nov 2026)',
    time: '2:00 PM – 7:00 PM GST',
    location: 'DIFC, Dubai, UAE',
    price: 'Pre-Register',
    type: 'In-Person',
    seatsLeft: 'VIP Lounge',
    description: 'The premier startup & investor summit in Dubai. Network with 100+ institutional VCs and 200+ founders across MENA. Secure your spot at the forefront of innovation.',
    tags: ['Dubai Rising', 'DIFC', 'VCs', 'Founders'],
    rsvpLink: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    buttonText: 'Register on Eventbrite',
    calLink: 'https://cal.com/morsebridge/30-min-intro',
  },
];

import { API_BASE } from '../config/api';

export function useEvents() {
  const [events, setEvents] = useState(FALLBACK_EVENTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/api/events`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Merge images from FALLBACK_EVENTS if backend lacks image property
          const merged = data.map((ev, i) => ({
            ...ev,
            image: ev.image || (FALLBACK_EVENTS[i] && FALLBACK_EVENTS[i].image) || '/assets/events/bootcamp.jpg'
          }));
          setEvents(merged);
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

  return { events, loading, error };
}
