import { useState, useEffect } from 'react';

const FALLBACK_EVENTS = [
  {
    id: 'runway-1',
    badge: 'Starts 1 Nov',
    badgeType: 'primary',
    title: 'Runway — Revenue in 90 Days',
    image: '/runway-logo-navy.jpg?v=2',
    date: 'Starts 1 November',
    time: '13-Week Hands-on Revenue Sprint (10 Founders)',
    location: 'In5 Tech Dubai / Riyadh & Remote',
    price: '$2,600 · 0% Equity',
    type: 'Hybrid',
    seatsLeft: '10 Founders Only',
    description: "Let's get you paid before the runway runs out. Thirteen weeks. Ten founders. Ayub Rafique sits with you while we build it, launch it, and find the first people willing to pay. Keep all your equity.",
    tags: ['Runway', 'Revenue in 90 Days', 'GTM', 'Clay', 'Sales Automation', 'Ayub Rafique'],
    applyLink: '/runway',
    isForm: true,
    buttonText: 'Explore & Apply',
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
    title: 'My Rising Time - A Global Summit Where Founders Rise',
    image: '/assets/events/riyadh-rising.png',
    date: 'Coming This November (Nov 2026)',
    time: '2:00 PM – 7:00 PM GST',
    location: 'DIFC, Dubai, UAE',
    price: 'Pre-Register',
    type: 'In-Person',
    seatsLeft: 'VIP Lounge',
    description: 'The premier startup & investor summit in Dubai. Network with 100+ institutional VCs and 200+ founders across MENA. Secure your spot at the forefront of innovation.',
    tags: ['My Rising Time', 'Dubai', 'VCs', 'Founders'],
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
