// ==========================================
// MORSEBRIDGE BACKEND SEED DATA
// ==========================================

export const initialBlogs = [
  {
    id: 1,
    slug: 'raising-institutional-seed-in-mena-2026',
    title: 'The 2026 MENA Seed Fundraising Benchmark Report',
    summary: 'An empirical analysis of 140+ early-stage funding rounds in the UAE and Saudi Arabia.',
    category: 'Fundraising',
    readTime: '6 min read',
    date: 'Jan 15, 2026',
    author: 'Morsebridge Advisory',
    authorRole: 'Venture Partners',
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    tags: ['Seed Rounds', 'Venture Capital', 'MENA', 'Valuation'],
    content: [
      {
        heading: '1. The Flight to Quality Unit Economics',
        body: 'Over the last 18 months, seed valuations in Riyadh and Dubai have stabilized around rigorous milestone checks. Investors are prioritizing positive unit economics over raw customer acquisition volume.'
      },
      {
        heading: '2. Sovereign Capital Integration',
        body: 'Co-investing alongside government-backed venture funds and sovereign accelerators provides institutional credibility and accelerated commercial procurement opportunities.'
      }
    ]
  },
  {
    id: 2,
    slug: 'agentic-ai-roadmap-for-founders-and-builders',
    title: 'Agentic AI Roadmap for Founders and Builders',
    summary: 'Navigating autonomous agents, tool orchestration, and defensible enterprise moats.',
    category: 'AI & Tech',
    readTime: '9 min read',
    date: 'Nov 27, 2025',
    author: 'Morsebridge Advisory',
    authorRole: 'Venture Partners',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    tags: ['Agentic AI', 'LLMs', 'Architecture'],
    content: [
      {
        heading: '1. Beyond Single-Prompt Wrappers',
        body: 'The competitive moat in AI is not access to standard foundation APIs. Moats are constructed through proprietary fine-tuning, domain evaluation benchmarks, and tight human-in-the-loop operational feedback.'
      }
    ]
  },
  {
    id: 3,
    slug: 'speed-is-the-new-validation-for-ai-founders',
    title: 'Speed is the New Validation for AI Founders',
    summary: 'Why iteration velocity and live customer telemetry beat extensive upfront research.',
    category: 'AI & Tech',
    readTime: '5 min read',
    date: 'Nov 15, 2025',
    author: 'Morsebridge Advisory',
    authorRole: 'Venture Partners',
    heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Speed', 'AI Startups', 'Product'],
    content: [
      {
        heading: '1. The 48-Hour Feedback Loop',
        body: 'In high-velocity AI sectors, the company that ships 5 product iterations in the time a competitor takes to schedule an architectural review wins the distribution battle.'
      }
    ]
  }
];

export const initialResources = [
  {
    id: 1,
    title: 'The 5-Minute CFO Financial Model (v3.2)',
    category: 'Financial Modeling',
    type: 'XLSX / Google Sheets',
    description: 'Institutional 3-statement forecast model, hiring planner, cohort retention engine, and automated burn/runway calculator.',
    downloads: 1420,
    featured: true,
    fileUrl: '/assets/resources/5_Minute_CFO_Model_v3.xlsx'
  },
  {
    id: 2,
    title: 'Seed & Series A Due Diligence Data Room Checklist',
    category: 'Fundraising',
    type: 'PDF / Notion Template',
    description: '45-point institutional due diligence checklist covering corporate governance, IP assignment, cap table hygiene, and material contracts.',
    downloads: 980,
    featured: false,
    fileUrl: '/assets/resources/Due_Diligence_Checklist.pdf'
  },
  {
    id: 3,
    title: 'Standard GCC Post-Money SAFE Agreement Template',
    category: 'Legal',
    type: 'DOCX / PDF',
    description: 'ADGM & DIFC jurisdiction-compatible post-money Simple Agreement for Future Equity with standard MFN clauses and valuation caps.',
    downloads: 1150,
    featured: false,
    fileUrl: '/assets/resources/GCC_SAFE_Agreement_Template.docx'
  }
];

export const initialEvents = [
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
    calLink: 'https://cal.com/morsebridge/30-min-intro'
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
    calLink: 'https://cal.com/morsebridge/30-min-intro'
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
    calLink: 'https://cal.com/morsebridge/30-min-intro'
  },
  {
    id: 4,
    badge: 'Live Pitch Competition',
    title: 'Startup Pitch Fest 2025',
    image: '/assets/events/bootcamp.jpg',
    date: 'Dec 05, 2025',
    time: '3:00 PM – 6:30 PM GST',
    location: 'In5 Tech Dubai / Virtual Livestream',
    description: '12 curated seed-stage tech startups pitch live in front of active Saudi and UAE angel syndicates and Tier-1 regional funds.',
    seatsLeft: 15,
    type: 'Hybrid',
    tags: ['Pitch Fest', 'Seed Capital', 'Angel Syndicates'],
    rsvpLink: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    calLink: 'https://cal.com/morsebridge/30-min-intro'
  }
];

export const initialPricing = [
  {
    id: 'starter',
    name: 'Founder Starter',
    price: '$0',
    interval: 'forever free',
    description: 'Essential resources and directory access for early ideation stage founders.',
    features: [
      'Access to open knowledge hub guides',
      'Community demo day livestream spectator access',
      'Public venture pitch deck templates',
      'Quarterly ecosystem market reports'
    ],
    cta: 'Get Started Free',
    highlighted: false
  },
  {
    id: 'growth',
    name: 'Venture Accelerator',
    price: '$299',
    interval: 'per month',
    description: 'Hands-on fundraising enablement, CFO financial model audit, and warm introductions.',
    features: [
      'The 5-Minute CFO Financial Model full suite',
      '1-on-1 Pitch Deck & Narrative audit',
      'Warm introductions to 10+ verified active investors',
      'Priority showcase slot at private summits',
      'Data room structure & SAFE agreement reviews'
    ],
    cta: 'Join Accelerator',
    highlighted: true
  }
];

export const initialFaqs = [
  {
    q: "I'm a VC — can you help train our portfolio companies on GTM?",
    a: "Yes, we deliver custom GTM bootcamps, revenue model audits, and hands-on positioning sprints for VC and accelerator portfolios across MENA and globally."
  },
  {
    q: 'Do you offer GTM funnel audits for VC portfolio companies?',
    a: 'Absolutely. We conduct deep-dive revenue funnel audits analyzing pricing tiering, unit economics, conversion friction, and customer acquisition efficiency.'
  },
  {
    q: 'What is MorseBridge and how does it help founders?',
    a: 'MorseBridge is a premier venture enablement platform. We prepare founders for institutional capital through financial modeling products, pitch deck audits, and warm introductions to active investors.'
  },
  {
    q: 'How does The 5-Minute CFO Model work?',
    a: 'The 5-Minute CFO Model is an institutional-grade financial modeling framework designed for high-growth startups. It automates revenue builds, headcount plans, and runway scenarios in minutes.'
  }
];

export const initialPodcasts = [
  {
    id: 1,
    title: "How to Build & Scale Multi-Million Dollar Tech Companies",
    guest: "Erik Mendelson",
    guestRole: "Venture Partner & Web3 Pioneer",
    youtubeUrl: "https://www.youtube.com/watch?v=FbnIgzwafD4",
    videoId: "FbnIgzwafD4",
    duration: "42 min",
    category: "Scale & Growth"
  },
  {
    id: 2,
    title: "Mastering Valuation, Diligence & Term Sheets in 2026",
    guest: "Sultan Al-Husseini",
    guestRole: "MENA Seed Fund Partner",
    youtubeUrl: "https://www.youtube.com/watch?v=2l7s12IIu7s",
    videoId: "2l7s12IIu7s",
    duration: "38 min",
    category: "Fundraising"
  },
  {
    id: 3,
    title: "B2B SaaS GTM Playbook & Revenue Loops in Dubai",
    guest: "Rashid Al-Nuaimi",
    guestRole: "Principal, Gulf Tech Ventures",
    youtubeUrl: "https://www.youtube.com/watch?v=PM383MoSQPM",
    videoId: "PM383MoSQPM",
    duration: "51 min",
    category: "Revenue & GTM"
  },
  {
    id: 4,
    title: "From Pre-Seed to Series A: The Founder Mindset",
    guest: "Zaid Al-Bawardi",
    guestRole: "Managing Director, Oasis Capital",
    youtubeUrl: "https://www.youtube.com/watch?v=7gjQPHrBeG0",
    videoId: "7gjQPHrBeG0",
    duration: "45 min",
    category: "Venture Strategy"
  }
];

export const initialPartners = [
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

export const initialPastEvents = [
  {
    id: 1,
    title: "What Investors Really Think About Startups Outside the US",
    youtubeUrl: "https://www.youtube.com/shorts/z1UMcbF7i9A",
    videoId: "z1UMcbF7i9A",
    category: "Startup Fundraising"
  },
  {
    id: 2,
    title: "Top VC Firms Don't Win by Seeing More Deals",
    youtubeUrl: "https://www.youtube.com/shorts/lPuPA9M2zsQ",
    videoId: "lPuPA9M2zsQ",
    category: "Startup Fundraising"
  },
  {
    id: 3,
    title: "Startup Innovation Meetup | Founder & Investor Connect",
    youtubeUrl: "https://www.youtube.com/shorts/6F1UNtMalJ4",
    videoId: "6F1UNtMalJ4",
    category: "Community"
  },
  {
    id: 4,
    title: "Global Fundraising Bootcamp Cohort 3 — Master Pitch Decks & GTM",
    youtubeUrl: "https://www.youtube.com/shorts/FbnIgzwafD4",
    videoId: "FbnIgzwafD4",
    category: "Workshops"
  },
  {
    id: 5,
    title: "Expand North Star 2025: Investors Roundtable & Demo Day",
    youtubeUrl: "https://www.youtube.com/shorts/2l7s12IIu7s",
    videoId: "2l7s12IIu7s",
    category: "Community"
  },
  {
    id: 6,
    title: "AI Meets Blockchain: Erik Mendelson at Frontier Capital Roundtable",
    youtubeUrl: "https://www.youtube.com/shorts/PM383MoSQPM",
    videoId: "PM383MoSQPM",
    category: "Workshops"
  },
  {
    id: 7,
    title: "The Investors Roundtable + Demo Day",
    youtubeUrl: "https://www.youtube.com/shorts/7gjQPHrBeG0",
    videoId: "7gjQPHrBeG0",
    category: "Startup Fundraising"
  },
  {
    id: 8,
    title: "Inside the Investors Roundtable + Demo Day",
    youtubeUrl: "https://www.youtube.com/shorts/kTNOAtNIJr0",
    videoId: "kTNOAtNIJr0",
    category: "Community"
  },
  {
    id: 9,
    title: "Investors Roundtable + Demo Day + After Party",
    youtubeUrl: "https://www.youtube.com/shorts/ncTZX7T8Etc",
    videoId: "ncTZX7T8Etc",
    category: "Community"
  },
  {
    id: 10,
    title: "Inside the Global Fundraising Bootcamp | Founders Journey",
    youtubeUrl: "https://www.youtube.com/shorts/gIw3kw30wgc",
    videoId: "gIw3kw30wgc",
    category: "Workshops"
  }
];

export const initialTestimonialShorts = [
  {
    id: 1,
    title: "Startup Voices from MorseBridge | Real Reactions",
    youtubeUrl: "https://www.youtube.com/shorts/Cgl0gJpd268",
    videoId: "Cgl0gJpd268"
  },
  {
    id: 2,
    title: "Mo Khaldi on Why Every Founder Should Join the Bootcamp",
    youtubeUrl: "https://www.youtube.com/shorts/TAGRO208seA",
    videoId: "TAGRO208seA"
  },
  {
    id: 3,
    title: "Inside the Global Fundraising Bootcamp | Founder Journey",
    youtubeUrl: "https://www.youtube.com/shorts/gIw3kw30wgc",
    videoId: "gIw3kw30wgc"
  },
  {
    id: 4,
    title: "MyGatePass Founder on Scaling in UAE & Bootcamp Experience",
    youtubeUrl: "https://www.youtube.com/shorts/dLgAo8CekmE",
    videoId: "dLgAo8CekmE"
  },
  {
    id: 5,
    title: "Pitch Fast, Negotiate Smart | Startup Demo Day Reactions",
    youtubeUrl: "https://www.youtube.com/shorts/PNKRx4EwrBk",
    videoId: "PNKRx4EwrBk"
  },
  {
    id: 6,
    title: "How Startups Can Fix Pitch Decks, Numbers & GTM",
    youtubeUrl: "https://www.youtube.com/shorts/2200y9BUmac",
    videoId: "2200y9BUmac"
  },
  {
    id: 7,
    title: "Fundraise Ready: Legal Masterclass with Top GCC Counsel",
    youtubeUrl: "https://www.youtube.com/shorts/OXquRPVm_7E",
    videoId: "OXquRPVm_7E"
  },
  {
    id: 8,
    title: "Inside the B2B SaaS Sales Workshop & GTM Strategy",
    youtubeUrl: "https://www.youtube.com/shorts/ZzAFGdNmXsI",
    videoId: "ZzAFGdNmXsI"
  }
];
