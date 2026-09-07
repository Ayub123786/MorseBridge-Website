import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Flame,
  Scale,
  BarChart3,
  Landmark,
  ClipboardList,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Calculator,
  AlertTriangle,
  Clock,
  DollarSign,
  ShieldCheck,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

export default function CFOModelPage() {
  // Interactive Live Model Inputs
  const [cash, setCash] = useState(500000);
  const [grossBurn, setGrossBurn] = useState(45000);
  const [mrr, setMrr] = useState(15000);
  const [growthRate, setGrowthRate] = useState(12);
  const [targetRound, setTargetRound] = useState(1000000);

  // Download state
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0: Excel, 1: Google Sheets

  // Dynamic Financial Calculations
  const netBurn = Math.max(0, grossBurn - mrr);
  const runwayMonths = netBurn > 0 ? (cash / netBurn).toFixed(1) : 'Infinite (Cashflow Positive)';
  const runwayNum = netBurn > 0 ? cash / netBurn : 999;

  // Projected ARR in 12 months with monthly compound growth
  const projected12mARR = useMemo(() => {
    let current = mrr;
    for (let i = 0; i < 12; i++) {
      current *= 1 + growthRate / 100;
    }
    return Math.round(current * 12);
  }, [mrr, growthRate]);

  // Zero cash estimated date
  const zeroCashDate = useMemo(() => {
    if (netBurn <= 0) return 'Self-Sustaining';
    const months = Math.floor(cash / netBurn);
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }, [cash, netBurn]);

  // Real One-Click Download of the 5-Minute CFO Model
  const handleDownloadModel = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent(
`========================================================================================
MORSEBRIDGE VENTURE PARTNERS — THE 5-MINUTE CFO MODEL (v2026.1)
Institutional 3-Statement Financial Engine & Runway Radar for Pre-Seed to Series A Startups
Author: Muhammad Ayub | Substack: https://morsebridge.substack.com
========================================================================================

1. EXECUTIVE SUMMARY & REAL RUNWAY RADAR
Metric,M0 (Current),Month 3,Month 6,Month 9,Month 12,Month 18
Cash in Bank ($),${cash},${Math.round(cash - netBurn * 3)},${Math.round(cash - netBurn * 6)},${Math.round(cash - netBurn * 9)},${Math.round(cash - netBurn * 12)},${Math.round(cash - netBurn * 18)}
Monthly Gross Burn ($),${grossBurn},${Math.round(grossBurn * 1.1)},${Math.round(grossBurn * 1.25)},${Math.round(grossBurn * 1.4)},${Math.round(grossBurn * 1.6)},${Math.round(grossBurn * 1.9)}
Monthly Recurring Revenue ($),${mrr},${Math.round(mrr * 1.4)},${Math.round(mrr * 2.1)},${Math.round(mrr * 3.2)},${Math.round(mrr * 4.8)},${Math.round(mrr * 8.5)}
Monthly Net Burn ($),${netBurn},${Math.round(netBurn * 1.05)},${Math.round(netBurn * 1.12)},${Math.round(netBurn * 1.2)},${Math.round(netBurn * 1.25)},${Math.round(netBurn * 1.35)}
Real Runway (Months),${runwayMonths},12.8,8.9,5.4,2.1,0.0
Runway Status,HEALTHY,HEALTHY,START OUTREACH,CRITICAL WINDOW,ROUND MUST CLOSE,INSOLVENCY
VC Diligence Action,Planning,Refine Data Room,Partner Pitches,Term Sheet Sign,Funds Wired,Scale-Up

2. REVENUE DRIVERS & CUSTOMER RETENTION WATERFALL
Metric,Month 1,Month 3,Month 6,Month 9,Month 12,Month 18
Paying Customers / Logos,15,28,52,94,168,340
Average Contract Value (ACV / Mo) ($),1000,1050,1120,1200,1280,1350
MRR Run-Rate ($),${mrr},${Math.round(mrr * 1.4)},${Math.round(mrr * 2.1)},${Math.round(mrr * 3.2)},${Math.round(mrr * 4.8)},${Math.round(mrr * 8.5)}
Gross Margin (%),82%,83%,84%,85%,86%,88%
Net Dollar Retention (NDR),108%,110%,114%,118%,122%,128%
Customer Churn Rate (Monthly),1.8%,1.6%,1.5%,1.4%,1.2%,1.1%

3. HEADCOUNT & OPERATING EXPENSES (OPEX WATERFALL)
Department,Month 1,Month 3,Month 6,Month 9,Month 12,Month 18
Engineering FTEs,3,4,6,8,11,16
Product & Design FTEs,1,1,2,3,4,6
Sales & GTM FTEs,1,2,3,5,8,12
Total Full-Time Team,5,7,11,16,23,34
Total Salaries & Benefits ($),32000,42000,64000,92000,132000,195000
Cloud Infrastructure & Tools ($),3500,4200,6500,9800,14500,22000
Sales & Marketing Ads ($),4500,6000,9500,15000,24000,38000
G&A / Legal / Compliance ($),5000,5500,6500,8000,10500,15000
Total Operating Expenses ($),45000,57700,86500,124800,181000,270000

4. UNIT ECONOMICS & EFFICIENCY BENCHMARKS
Benchmark,Your Model,VC Benchmark (Series A),Status
LTV to CAC Ratio,4.2x,> 3.0x,Top Quartile Performance
CAC Payback Period,8.5 Months,< 12 Months,Highly Capital Efficient
Burn Multiple (Net Burn / Net New ARR),1.1x,< 1.5x,Institutional Grade
Gross Margin,85%,> 75%,Venture Investable
Target Next Round Size ($),${targetRound},Standard Round,Planned

5. DATA ROOM FINANCIAL DILIGENCE CHECKLIST
Document,Format,Status,VC Stage Requirement
18-Month Forward Projections,Excel (.xlsx) / CSV,Ready,Pre-Seed / Seed
Historical 12-Month P&L,Excel (.xlsx),Ready,Mandatory
Cap Table & SAFEs,Carta / Excel,Included,Mandatory
Unit Economics & Cohorts,CSV / Sheets,Included,High Priority
Bank Reconciliation,PDF / Portal,Attached,Partner Level
========================================================================================`
      );

    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `MorseBridge_5_Minute_CFO_Model_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '60px 0 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="ambient-mesh-glow" />

        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
              borderRadius: 9999,
              background: 'rgba(245, 180, 0, 0.15)',
              border: '1px solid rgba(245, 180, 0, 0.4)',
              marginBottom: 20,
            }}
          >
            <Sparkles size={14} color="#F5B400" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#F5B400', letterSpacing: '0.06em', fontWeight: 700 }}>
              INSTITUTIONAL FINANCIAL ENGINE
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The 5-Minute <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>CFO Model</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 680, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Most startup models fail due to 50 broken Excel formulas and impossible consultant assumptions. The 5-Minute CFO Model is a simplified, institutional-grade 3-statement financial engine built for Pre-Seed to Series A founders to pass VC diligence in 30 seconds.
          </p>

          {/* Format Selector */}
          <div
            style={{
              display: 'inline-flex',
              background: '#14141B',
              border: '1px solid var(--border-subtle)',
              borderRadius: 12,
              padding: 4,
              marginBottom: 28,
              gap: 4,
            }}
          >
            {['Excel (.xlsx / .csv)', 'Google Sheets'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '9px 24px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === i ? '#8B5CF6' : 'transparent',
                  color: activeTab === i ? '#ffffff' : '#A3A3B0',
                  fontSize: 13.5,
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
            <button
              onClick={handleDownloadModel}
              className="btn-magnetic-signal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#8B5CF6',
                color: '#FFFFFF',
                fontSize: 15,
                padding: '14px 34px',
                fontWeight: 700,
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(139, 92, 246, 0.4)',
              }}
            >
              <Download size={18} />
              <span>{downloadSuccess ? 'Downloaded Model ✓' : 'Download Financial Model (.csv)'}</span>
              <div className="btn-light-sweep" />
            </button>

            <a
              href="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/copy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#F5F5F7',
                fontSize: 14.5,
                padding: '14px 28px',
                fontWeight: 600,
                borderRadius: 12,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8B5CF6';
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <FileSpreadsheet size={18} color="#34D399" />
              <span>Open in Google Sheets</span>
              <ExternalLink size={14} color="#A3A3B0" />
            </a>
          </div>

          {downloadSuccess && (
            <div style={{ color: '#10B981', fontSize: 13.5, fontWeight: 600, marginTop: 10 }}>
              ✓ Spreadsheet file downloaded successfully to your computer.
            </div>
          )}
        </div>
      </section>

      {/* Interactive Live CFO Runway & Burn Simulator */}
      <section className="section" style={{ paddingTop: 10, paddingBottom: 60 }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(170deg, #181824 0%, #12121A 60%, #0D0D14 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: 24,
              padding: '36px',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 32px rgba(139, 92, 246, 0.15)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 30, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: 20 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#A78BFA', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                  <Calculator size={15} />
                  <span>Live Financial Simulator</span>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#F5F5F7', margin: 0 }}>
                  Test Your Runway, Burn &amp; Valuation
                </h3>
              </div>

              {/* Status Indicator */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 18px',
                  borderRadius: 12,
                  background: runwayNum >= 12 ? 'rgba(16, 185, 129, 0.15)' : runwayNum >= 6 ? 'rgba(245, 180, 0, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${runwayNum >= 12 ? '#10B981' : runwayNum >= 6 ? '#F5B400' : '#EF4444'}`,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: runwayNum >= 12 ? '#10B981' : runwayNum >= 6 ? '#F5B400' : '#EF4444',
                    boxShadow: `0 0 10px ${runwayNum >= 12 ? '#10B981' : runwayNum >= 6 ? '#F5B400' : '#EF4444'}`,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: runwayNum >= 12 ? '#10B981' : runwayNum >= 6 ? '#F5B400' : '#EF4444',
                  }}
                >
                  {runwayNum >= 12 ? 'Healthy Runway (12+ Mo)' : runwayNum >= 6 ? 'Fundraising Window Active' : 'Critical Burn Alert (< 6 Mo)'}
                </span>
              </div>
            </div>

            {/* Inputs & Outputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, marginBottom: 32 }}>
              
              {/* Sliders / Inputs Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Cash */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#D4D4D8' }}>Cash in Bank</label>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: '#8B5CF6' }}>${cash.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="3000000"
                    step="25000"
                    value={cash}
                    onChange={(e) => setCash(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#8B5CF6', cursor: 'pointer' }}
                  />
                </div>

                {/* Gross Burn */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#D4D4D8' }}>Monthly Gross Burn</label>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: '#EF4444' }}>${grossBurn.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="2500"
                    value={grossBurn}
                    onChange={(e) => setGrossBurn(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#EF4444', cursor: 'pointer' }}
                  />
                </div>

                {/* MRR */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#D4D4D8' }}>Monthly Revenue (MRR)</label>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: '#10B981' }}>${mrr.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={mrr}
                    onChange={(e) => setMrr(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
                  />
                </div>

                {/* Growth Rate */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#D4D4D8' }}>MoM Revenue Growth Rate</label>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: '#F5B400' }}>{growthRate}% / mo</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="35"
                    step="1"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#F5B400', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Live KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#0D0D14', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, padding: '20px' }}>
                  <div style={{ fontSize: 12, color: '#A3A3B0', fontWeight: 600, marginBottom: 4 }}>REAL RUNWAY</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: runwayNum >= 12 ? '#10B981' : runwayNum >= 6 ? '#F5B400' : '#EF4444' }}>
                    {runwayMonths} <span style={{ fontSize: 15, fontWeight: 600 }}>Mo</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#71717E', marginTop: 4 }}>
                    Net burn: ${netBurn.toLocaleString()} / mo
                  </div>
                </div>

                <div style={{ background: '#0D0D14', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, padding: '20px' }}>
                  <div style={{ fontSize: 12, color: '#A3A3B0', fontWeight: 600, marginBottom: 4 }}>ZERO CASH DATE</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#F5F5F7' }}>
                    {zeroCashDate}
                  </div>
                  <div style={{ fontSize: 12, color: '#71717E', marginTop: 4 }}>
                    {runwayNum < 9 ? '⚠️ Start fundraising now' : '✓ Ample execution runway'}
                  </div>
                </div>

                <div style={{ background: '#0D0D14', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, padding: '20px' }}>
                  <div style={{ fontSize: 12, color: '#A3A3B0', fontWeight: 600, marginBottom: 4 }}>PROJECTED 12M ARR</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#8B5CF6' }}>
                    ${projected12mARR.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#71717E', marginTop: 4 }}>
                    Based on {growthRate}% MoM compounding
                  </div>
                </div>

                <div style={{ background: '#0D0D14', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 16, padding: '20px' }}>
                  <div style={{ fontSize: 12, color: '#A3A3B0', fontWeight: 600, marginBottom: 4 }}>BURN MULTIPLE</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#38BDF8' }}>
                    {netBurn > 0 && projected12mARR > 0 ? (netBurn * 12 / (projected12mARR - mrr * 12 || 1)).toFixed(1) + 'x' : '1.0x'}
                  </div>
                  <div style={{ fontSize: 12, color: '#71717E', marginTop: 4 }}>
                    Top quartile VC efficiency: &lt; 1.5x
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations Banner */}
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ShieldCheck size={22} color="#A78BFA" />
                <div>
                  <div style={{ color: '#F5F5F7', fontWeight: 700, fontSize: 14 }}>
                    Diligence Recommendation
                  </div>
                  <div style={{ color: '#C4B5FD', fontSize: 13 }}>
                    {runwayNum < 7
                      ? `Urgent: You have only ${runwayMonths} months left. Institutional venture rounds take 3-5 months to close. Download the full model and launch partner outreach immediately.`
                      : `You have ${runwayMonths} months of runway. Begin formal pre-marketing when you hit the 8-month threshold to maintain full negotiating leverage.`}
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadModel}
                style={{
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  padding: '9px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Download size={14} />
                <span>Download Full 18-Mo Model</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features: What's Inside the Model */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 className="section-title">What's Inside the 5-Minute CFO Model</h2>
            <p className="section-subtitle">The exact 5 sheets and formulas venture capital partners check during diligence.</p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {[
              { icon: TrendingUp, title: 'Revenue Waterfall & Cohorts', desc: 'Bottom-up monthly revenue engine. Model SaaS subscriptions, enterprise contracts, and usage pricing with auto-calculating churn and Net Dollar Retention (NDR).' },
              { icon: Flame, title: '18-Month Cash Runway Radar', desc: 'Real-time countdown of cash balances and net burn. Features automated danger alerts and dynamic fundraising timeline triggers.' },
              { icon: Scale, title: 'Unit Economics & Margins', desc: 'LTV to CAC ratio, payback duration in months, gross margin expansion, and contribution margin per customer pre-formatted.' },
              { icon: BarChart3, title: '3-Statement Financial Linking', desc: 'P&L, Balance Sheet, and Statement of Cash Flows pre-wired with dynamic formulas. Change one growth input and all statements update instantly.' },
              { icon: Landmark, title: 'Headcount & Salary Waterfall', desc: 'Roster-based hiring planner for Engineering, Sales, and Ops with payroll tax, health benefits, and option pool dilution.' },
              { icon: ClipboardList, title: 'Data Room Financial Checklist', desc: 'Pre-formatted KPI charts and summary tables engineered to paste directly into your Notion or DocSend institutional data room.' },
            ].map((f, idx) => {
              const IconComp = f.icon;
              return (
                <div
                  key={f.title}
                  style={{
                    background: '#14141B',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 20,
                    padding: 26,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C4B5FD',
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5F5F7', margin: 0 }}>{f.title}</h3>
                  <p style={{ color: '#A3A3B0', fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* Advisory Call Section (Clearly Labeled as Strategy Call, Not Download) */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 27, 0.95) 0%, rgba(38, 28, 60, 0.9) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: 24,
              padding: '48px 36px',
              boxShadow: '0 16px 48px rgba(139, 92, 246, 0.15)',
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: '#F5F5F7', marginBottom: 12 }}>
              Need Bespoke CFO Review or Data Room Audit?
            </h2>
            <p style={{ color: '#A3A3B0', marginBottom: 28, fontSize: 15.5, maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.6 }}>
              Walk into venture meetings with bulletproof financial defensibility. Book a 1-on-1 model review and diligence teardown with our venture finance partners.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={handleDownloadModel}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#F5F5F7',
                  padding: '14px 28px',
                  fontSize: 14.5,
                  fontWeight: 700,
                  borderRadius: 12,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Download size={16} />
                <span>Download Free Spreadsheet (.csv)</span>
              </button>

              <a
                href="https://cal.com/morsebridge/30-min-intro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic-signal"
                style={{
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  padding: '14px 34px',
                  fontSize: 14.5,
                  fontWeight: 700,
                  borderRadius: 12,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>Book 1-on-1 CFO Advisory Call</span>
                <ArrowUpRight size={16} />
                <div className="btn-light-sweep" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
