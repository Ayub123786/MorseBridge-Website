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
    title: 'Principal Plug and Play: Investors are Not ATM Machines!',
    guest: 'Andrea Azzolari',
    guestRole: 'Principal, Plug and Play Tech Center MENA',
    youtubeUrl: 'https://www.youtube.com/watch?v=O1hPe9GncBQ',
    videoId: 'O1hPe9GncBQ',
    duration: '1 hr 7 min',
    category: 'Venture Capital & Pitching',
    desc: 'Andrea Azzolari, Principal at Plug and Play Tech Center MENA, breaks down VC evaluation criteria, why investors are not ATM machines, and what truly makes founders fundable.'
  },
  {
    id: 2,
    title: 'How Startup Fundraising Works | Startup School',
    guest: 'Founders Talk with Ayub',
    guestRole: 'Venture Masterclass',
    youtubeUrl: 'https://www.youtube.com/watch?v=rjflnyDqN2M',
    videoId: 'rjflnyDqN2M',
    duration: '1 hr 13 min',
    category: 'Fundraising Masterclass',
    desc: 'A comprehensive masterclass on how startup fundraising actually works: valuation mechanics, pitch deck narratives, SAFEs, and negotiating with lead investors.'
  },
  {
    id: 3,
    title: 'Family Offices From Scratch',
    guest: 'Private Wealth & Family Offices',
    guestRole: 'GCC & Global Capital Allocations',
    youtubeUrl: 'https://www.youtube.com/watch?v=SrJu7zkwsYs',
    videoId: 'SrJu7zkwsYs',
    duration: '1 hr 5 min',
    category: 'Family Offices',
    desc: 'Everything founders and fund managers need to know about Family Offices: structure, investment mandates, direct startup deals, and securing long-term institutional backing.'
  }
];

export const initialPartners = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Client ${i + 1}`,
  logo: `/assets/logos/${i + 1}.png`
}));


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
