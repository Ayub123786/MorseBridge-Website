import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const BLOG_DATA = {
  'agentic-ai-roadmap-for-founders-and-builders': {
    title: 'Agentic AI Roadmap for Founders and Builders',
    category: 'AI & Technology',
    date: 'August 2025',
    readTime: '8 min read',
    author: 'MorseBridge Team',
    intro: 'Agentic AI systems are rapidly moving from research labs to production environments. For founders and builders, understanding this shift is now a competitive necessity.',
    sections: [
      { heading: 'What Is Agentic AI?', body: 'Unlike traditional AI that responds to single prompts, agentic AI operates in loops — planning, taking actions, observing results, and adjusting. Think of it as AI that can run tasks autonomously over time, use tools, browse the web, and chain multi-step reasoning.' },
      { heading: 'Why It Matters for Founders', body: 'The cost of software development, customer support, and operations is collapsing. Founders who build with agentic AI as a core primitive — not a feature — will have structural advantages over those who treat it as an add-on.' },
      { heading: 'The Practical Roadmap', body: 'Start by identifying repetitive, high-cost workflows in your business. These are your first automation targets. Then layer in retrieval-augmented generation (RAG) for knowledge access, and build feedback loops so your agents improve over time.' },
      { heading: 'Key Risks to Manage', body: 'Hallucination in long-running agent chains, prompt injection attacks, and the cost of inference at scale are the three biggest risks. Build evaluation pipelines early — before you scale.' },
    ],
  },
  'does-your-pitch-deck-meet-yc-standards-mena': {
    title: 'Does Your Pitch Deck Meet YC Standards? (MENA Edition)',
    category: 'Fundraising',
    date: 'July 2025',
    readTime: '6 min read',
    author: 'MorseBridge Team',
    intro: "Y Combinator's pitch standards have become the global benchmark for early-stage decks. Here's how MENA founders can align to those expectations.",
    sections: [
      { heading: 'The YC Framework', body: 'YC evaluates decks on a simple framework: problem, solution, market size, traction, team, and ask. Every slide should answer one of these dimensions clearly and concisely.' },
      { heading: 'Where MENA Decks Often Fall Short', body: 'The most common gaps are: over-explaining the market context without getting to the point, weak unit economics, and missing or vague traction metrics. Investors read dozens of decks per week — brevity wins.' },
      { heading: 'Localize Without Over-Localizing', body: 'Highlight your MENA advantage — regulatory moats, unbanked population, government digitization tailwinds — but contextualize it for a global investor audience. Not all VCs know the Saudi Vision 2030 roadmap.' },
      { heading: 'The 10-Slide Standard', body: 'Problem, Solution, Why Now, Market, Product, Traction, Business Model, Team, Financials, Ask. Each slide gets one clear message. If you need more than 12 slides, you have a clarity problem, not a content problem.' },
    ],
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (BLOG_DATA[slug]) {
      setPost(BLOG_DATA[slug]);
      return;
    }
    fetch(`/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((data) => setPost(data))
      .catch(() => setPost(null));
  }, [slug]);

  if (!post) {
    return (
      <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
        <div style={{ textAlign: 'center', padding: '120px 24px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
          <h1 style={{ color: 'var(--text-primary)', fontWeight: 800, marginBottom: 12 }}>Article Not Found</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>This article may have been moved or doesn't exist.</p>
          <Link to="/blog" className="btn-purple" style={{ padding: '12px 28px' }}>
            Back to All Articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Article Header */}
      <section style={{ padding: '60px 0 40px', borderBottom: '1px solid var(--border-slate)' }}>
        <div className="container container-narrow">
          <Link to="/blog" style={{ color: 'var(--purple-primary)', fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>
            ← Back to All Articles
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <span className="mb-badge">{post.category}</span>
            <span style={{ color: 'var(--text-subtle)', fontSize: 13 }}>{post.readTime}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 20 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'var(--text-muted)', fontSize: 13.5 }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>By {post.author || 'MorseBridge Team'}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container container-narrow">
          {post.intro && (
            <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: 40, fontStyle: 'italic', borderLeft: '3px solid var(--purple-primary)', paddingLeft: 20 }}>
              {post.intro}
            </p>
          )}

          {post.sections &&
            post.sections.map((sec, i) => (
              <div key={i} style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
                  {sec.heading}
                </h2>
                <p style={{ color: 'var(--text-body)', fontSize: 16, lineHeight: 1.8 }}>
                  {sec.body}
                </p>
              </div>
            ))}

          {/* Share & subscribe CTA */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-slate)', borderRadius: 20, padding: 36, textAlign: 'center', marginTop: 60, boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Enjoyed This Article?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
              Subscribe to the MorseBridge Substack for weekly insights on MENA tech and fundraising.
            </p>
            <a
              href="https://morsebridge.substack.com/?utm_campaign=profile_chips"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-purple"
              style={{ padding: '12px 28px', fontSize: 14 }}
            >
              Subscribe on Substack ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
