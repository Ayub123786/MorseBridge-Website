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
    badge: '22-23 Nov 2026',
    badgeType: 'warning',
    title: 'My Rising Time - A Global Summit Where Founders Rise',
    image: '/assets/events/riyadh-rising.png',
    date: '22-23 Nov 2026',
    time: 'Online Mode via Zoom',
    location: 'Online via Zoom',
    price: 'Pre-Register',
    type: 'Online via Zoom',
    seatsLeft: 'Live on Zoom',
    description: 'The premier global summit for founders and strategic capital. Network with 100+ institutional VCs, angel syndicates, and sovereign partners online via Zoom.',
    tags: ['My Rising Time', 'Online', 'Zoom', 'VCs', 'Founders'],
    rsvpLink: 'https://myrisingtime.com',
    registrationType: 'Official Summit Registration',
    buttonText: 'Register on My Rising Time',
    calLink: 'https://cal.com/morsebridge/30-min-intro',
  },
  {
    id: 4,
    badge: '8–10 Dec 2026',
    badgeType: 'success',
    title: 'Expand North Star 2026 — GITEX Global',
    image: '/assets/events/expand_north_star.jpg',
    date: '8–10 December 2026',
    time: 'Dubai Exhibition Centre · Expo City',
    location: 'Dubai Exhibition Centre, Expo City',
    price: 'Ecosystem Partner',
    type: 'In-Person Global Summit & Expo',
    seatsLeft: 'Registration Open',
    description: "MorseBridge is joining forces with Expand North Star 2026 as an Ecosystem Partner plugging into one of the region's biggest meeting points for founders, investors and the people building what's next.\n\nTogether, we're connecting the dots across the startup ecosystem, creating more opportunities for ambitious founders to meet the right people, discover new possibilities and take their next big step.\n\n8–10 December 2026 | Dubai Exhibition Centre, Expo City\nGet Involved  https://tinyurl.com/MorseBridge\nSee you at Expand North Star!",
    tags: ['Expand North Star', 'GITEX Global', 'Dubai', 'Expo City', 'Ecosystem Partner'],
    rsvpLink: 'https://tinyurl.com/MorseBridge',
    registrationType: 'Ecosystem Partner Registration',
    buttonText: 'Get Involved / Register',
    calLink: 'https://tinyurl.com/MorseBridge',
  },
  {
    id: 5,
    badge: '9 Dec 2026',
    badgeType: 'warning',
    title: "Investor's Roundtable — Expand North Star & GITEX Global",
    image: '/assets/events/investor_roundtable.jpg',
    date: 'Wednesday, 9 December 2026',
    time: '7:00 PM – 9:00 PM GST',
    location: 'AstroLabs, JLT, Cluster R, Dubai, UAE',
    price: 'Invite / Register',
    type: 'In-Person Roundtable',
    seatsLeft: '20+ Investors',
    description: "A polished, in-person roundtable connecting 20+ family offices, VCs, and angel investors from across the region in collaboration with Expand North Star & GITEX Global.\n\nWednesday, 9 Dec 2026 | 7:00–9:00 PM GST\nAstroLabs, JLT, Cluster R, Dubai, UAE",
    tags: ['Investor Roundtable', 'AstroLabs', 'JLT', 'Expand North Star', 'GITEX Global', 'Dubai', 'VCs', 'Family Offices', 'Angels'],
    rsvpLink: 'https://www.eventbrite.com/e/2004227211542?aff=oddtdtcreator',
    registrationType: 'Official Eventbrite Registration',
    buttonText: 'Register on Eventbrite',
    calLink: 'https://www.eventbrite.com/e/2004227211542?aff=oddtdtcreator',
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
