import { useState, useEffect } from 'react';

const FALLBACK_EVENTS = [
  {
    id: 1,
    badge: 'Cohort 3 Launch',
    title: 'Global Fundraising BootCamp Launch',
    image: '/assets/events/bootcamp.jpg',
    date: 'Oct 22, 2026',
    time: '4:00 PM – 8:00 PM GST',
    location: 'In5 Tech, Dubai Internet City / Virtual Livestream',
    description: '5 Workshops, 10 Startups, 25 Angels, VCs & Accelerators. Master pitch decks, term sheet negotiation, and GTM mechanics.',
    seatsLeft: 12,
    type: 'Hybrid',
    tags: ['Bootcamp', 'Fundraising', 'Cohort 3', 'Pitching'],
    rsvpLink: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    calLink: 'https://cal.com/morsebridge/30-min-intro',
  },
  {
    id: 2,
    badge: 'Flagship Summit',
    title: 'Riyadh Rising 2026 — Startups & Investor Summit',
    image: '/assets/events/riyadh_rising.jpg',
    date: 'Jan 21–22, 2026',
    time: '9:00 AM – 6:00 PM AST',
    location: 'King Abdullah Financial District (KAFD), Riyadh, KSA',
    description: '200+ Global Startups, 100+ Active Investors, 20+ Workshops, VIP Investor Lounge, and Desert Night Meet.',
    seatsLeft: 18,
    type: 'In-Person',
    tags: ['Riyadh Summit', 'VCs', 'Founders', 'Networking'],
    rsvpLink: 'https://riyadhrising.net/',
    calLink: 'https://cal.com/morsebridge/30-min-intro',
  },
  {
    id: 3,
    badge: 'Coming This November!',
    title: 'Dubai Rising 2026 — The Ultimate Startups & Investor Summit',
    image: '/assets/events/dubai_rising.jpg',
    date: 'Coming This November (Nov 2026)',
    time: '2:00 PM – 7:00 PM GST',
    location: 'Dubai International Financial Centre (DIFC), UAE',
    description: 'The premier startup & investor summit in Dubai. Network with 100+ institutional VCs and 200+ founders across MENA.',
    seatsLeft: 8,
    type: 'In-Person',
    tags: ['Dubai Summit', 'Investors', 'Founders', 'Coming Soon'],
    rsvpLink: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    calLink: 'https://cal.com/morsebridge/30-min-intro',
  },
  {
    id: 4,
    badge: 'Live Pitch Competition',
    title: 'Startup Pitch Fest 2026',
    image: '/assets/events/bootcamp.jpg',
    date: 'Dec 05, 2026',
    time: '3:00 PM – 6:30 PM GST',
    location: 'In5 Tech Dubai / Virtual Livestream',
    description: '12 curated seed-stage tech startups pitch live in front of active Saudi and UAE angel syndicates and Tier-1 regional funds.',
    seatsLeft: 15,
    type: 'Hybrid',
    tags: ['Pitch Fest', 'Seed Capital', 'Angel Syndicates'],
    rsvpLink: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
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
