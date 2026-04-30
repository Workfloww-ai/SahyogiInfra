import { motion } from "motion/react";
import { 
  Users, 
  Search, 
  Briefcase, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  Menu,
  X,
  Hotel,
  ArrowRight,
  Award
} from "lucide-react";
import { useState } from "react";

const industries = [
  "Infrastructure", "Construction", "Manufacturing", "FMCG", "Retail", 
  "Logistics & Supply Chain", "F&B / QSR", "Hospitality", "Healthcare", 
  "Real Estate", "Energy & Power", "IT / ITES", "Telecom", "Automotive", 
  "Agriculture", "Education", "Banking & Finance", "Government & PSU"
];

const staffingTiers = [
  {
    id: "01",
    title: "Leadership & CXO",
    subtitle: "Senior Mandates",
    desc: "Retained search for C-suite and Director-level roles requiring cultural fit, domain credibility, and confidentiality.",
    points: ["CEO, COO, CFO search", "VP / Director mandates", "Board advisory", "Succession planning"]
  },
  {
    id: "02",
    title: "Middle Management",
    subtitle: "Functional Layer",
    desc: "The execution backbone. Managers and regional heads who translate strategy into measurable outcomes.",
    points: ["Regional & zonal managers", "Project managers", "Sales & Ops managers", "Team leads"]
  },
  {
    id: "03",
    title: "Entry Level & Bulk",
    subtitle: "Graduate Talent",
    desc: "High-potential freshers and lateral joiners for large-scale projects and organizational growth.",
    points: ["Campus & lateral hiring", "Management trainees", "Functional junior roles", "Bulk ramp-ups"]
  },
  {
    id: "04",
    title: "Off-Roll / Contract",
    subtitle: "Flexible Workforce",
    desc: "End-to-end payroll, statutory compliance, and lifecycle management. You focus on operations.",
    points: ["Payroll processing", "PF, ESIC, TDS compliance", "Labour licence handling", "Offer-to-exit lifecycle"]
  },
  {
    id: "05",
    title: "Blue Collar",
    subtitle: "Ground Force",
    desc: "Skilled and semi-skilled trade workers managed with speed, verification, and full compliance.",
    points: ["Trade workers", "Site supervisors", "Security & Housekeeping", "Rapid mobilisation"]
  }
];

const hospitalityDivisions = [
  {
    title: "Leisure Resorts",
    desc: "End-to-end operations of destination resorts—front-of-house experience, F&B, and revenue management.",
    points: ["Operations Management", "Revenue Optimisation", "F&B Operations", "Housekeeping SLAs"]
  },
  {
    title: "Managed Apartments",
    desc: "Operational management of branded service residences and extended-stay properties with yield management.",
    points: ["Tenant Management", "Facilities Management", "Yield Management", "Maintenance Protocols"]
  }
];

const processSteps = [
  { title: "Discovery", desc: "Understanding structure, culture, and compliance context." },
  { title: "Solution Design", desc: "Tailored model with clear deliverables and SLAs." },
  { title: "Sourcing", desc: "Multi-channel assessment across competencies." },
  { title: "Deployment", desc: "Onboarding, registration, and Day 1 readiness." },
  { title: "Governance", desc: "Periodic reviews and continuous improvement." }
];

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <img 
      src="/logo.png" 
      alt="SahYogi InfraCare Logo" 
      className="h-16 w-auto md:h-20 object-contain drop-shadow-sm" 
    />
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    organisation: '',
    emailAddress: '',
    divisionOfInterest: 'Staffing - Leadership / CXO',
    yourRequirement: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('http://localhost:5001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus({ type: 'success', message: 'Your enquiry has been submitted successfully. We will get back to you shortly.' });
        setFormData({
          fullName: '',
          organisation: '',
          emailAddress: '',
          divisionOfInterest: 'Staffing - Leadership / CXO',
          yourRequirement: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to submit enquiry. Please try again later.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to connect to the server. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand text-slate selection:bg-clay/20 font-sans">
      {/* Navigation */}
      <header className="h-20 bg-white/90 backdrop-blur-md border-b border-moss/10 sticky top-0 z-[100] px-6 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tight text-moss leading-none">SAHYOGI INFRACARE</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-clay font-bold mt-0.5">Staffing · Hospitality · Operations</span>
          </div>
        </div>

        <nav className="hidden lg:flex gap-10 text-[11px] uppercase tracking-widest text-sage font-sans font-bold italic">
          <a href="#staffing" className="hover:text-clay transition-colors">Staffing</a>
          <a href="#hospitality" className="hover:text-clay transition-colors">Hospitality</a>
          <a href="#industries" className="hover:text-clay transition-colors">Industries</a>
          <a href="#about" className="hover:text-clay transition-colors">About</a>
          <a href="#contact" className="hover:text-clay transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="#contact"
            className="hidden sm:block bg-clay text-white px-6 py-3 rounded text-[11px] uppercase tracking-widest font-bold font-sans hover:bg-clay/90 transition-all shadow-md shadow-clay/20"
          >
            Enquire Now
          </a>
          <button 
            className="lg:hidden text-moss"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-sand border-b border-moss/10 p-6 absolute w-full z-[99] font-sans font-bold text-sm uppercase tracking-widest text-sage"
        >
          <div className="flex flex-col gap-6">
            <a href="#staffing" onClick={() => setIsMenuOpen(false)}>Staffing</a>
            <a href="#hospitality" onClick={() => setIsMenuOpen(false)}>Hospitality</a>
            <a href="#industries" onClick={() => setIsMenuOpen(false)}>Industries</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-clay text-white w-full py-4 rounded text-center"
            >
              Enquire Now
            </a>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center px-6 md:px-16 py-20 overflow-hidden bg-white">
        {/* Visiting Card Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-0 right-0 w-full h-full opacity-[0.05]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <line x1="0" y1="1000" x2="1000" y2="0" stroke="#666" strokeWidth="1" />
            <line x1="100" y1="1100" x2="1100" y2="100" stroke="#666" strokeWidth="1" />
            <line x1="-100" y1="900" x2="900" y2="-100" stroke="#666" strokeWidth="1" />
            <line x1="200" y1="1200" x2="1200" y2="200" stroke="#666" strokeWidth="1" />
            <line x1="-200" y1="800" x2="800" y2="-200" stroke="#666" strokeWidth="1" />
          </svg>
          <div className="absolute top-0 right-0 w-96 h-96 bg-moss rounded-full blur-[150px] opacity-[0.05]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-clay rounded-full blur-[150px] opacity-[0.05]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-moss font-bold block px-4 py-2 bg-moss/5 rounded-full border border-moss/10">
                Pan-India · Multi-Sector · Trusted
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1] text-slate font-black mb-8 tracking-tighter">
              Where Talent Meets <span className="text-clay">Purpose.</span> At Every Level.
            </h1>
            <p className="font-sans text-lg md:text-xl text-sage leading-relaxed mb-8 max-w-xl">
              SahYogi InfraCare brings two decades of operational credibility to workforce staffing and hospitality management.
            </p>
            <div className="flex items-center gap-4 mb-12 p-6 bg-moss/5 rounded-2xl border border-moss/10 w-fit">
              <div className="w-12 h-12 bg-clay rounded-full flex items-center justify-center text-white shrink-0">
                <Globe size={24} />
              </div>
              <p className="font-sans text-sm md:text-base font-bold text-moss italic leading-snug">
                "We combine a national network with <br className="hidden md:block" /> local intelligence."
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="bg-clay text-white px-8 py-4 rounded font-sans text-xs uppercase tracking-widest font-bold hover:shadow-xl hover:shadow-clay/30 transition-all flex items-center gap-3"
              >
                Enquire for Business <ArrowRight size={16} />
              </a>
              <a 
                href="#about"
                className="border border-moss/20 text-moss px-8 py-4 rounded font-sans text-xs uppercase tracking-widest font-bold hover:bg-moss/5 transition-all text-center"
              >
                Our Credentials
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:gap-6 relative"
          >
            <div className="bg-cream p-6 md:p-10 rounded-2xl border border-moss/5 shadow-sm transform translate-y-12 col-span-2 md:col-span-1">
              <span className="text-5xl md:text-6xl font-bold text-moss block mb-1 tracking-tighter">
                20 Years
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-clay font-bold block">Of Experience</span>
            </div>
            <div className="bg-moss p-6 md:p-10 rounded-2xl text-sand shadow-xl">
              <span className="text-4xl md:text-5xl font-bold block mb-2 tracking-tighter">Pan</span>
              <span className="font-sans text-[10px] uppercase tracking-widest opacity-80 font-bold block">India Presence</span>
            </div>
            <div className="bg-clay p-6 md:p-10 rounded-2xl text-sand shadow-lg flex flex-col justify-end">
              <span className="text-4xl md:text-5xl font-bold block mb-2 tracking-tighter">All</span>
              <span className="font-sans text-[10px] uppercase tracking-widest opacity-80 font-bold block">Industry Verticals</span>
            </div>
            <div className="bg-cream p-6 md:p-10 rounded-2xl border border-moss/5 shadow-sm transform -translate-y-12 border-l-8 border-l-clay col-span-2 md:col-span-1">
              <ul className="space-y-4 font-sans text-xs uppercase tracking-wider text-sage font-bold">
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-clay" /> Leadership Search</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-clay" /> Off-Roll Staffing</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-clay" /> Resort Operations</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Bar */}
      <section id="industries" className="bg-moss text-sand py-12 overflow-hidden border-y border-clay/10">
        <div className="flex whitespace-nowrap animate-infinite-scroll">
          {[...industries, ...industries].map((ind, i) => (
            <span key={i} className="mx-12 font-sans text-[11px] uppercase tracking-[0.3em] font-bold opacity-60 hover:opacity-100 transition-opacity cursor-default">
              {ind}
            </span>
          ))}
        </div>
      </section>

      {/* Staffing Division */}
      <section id="staffing" className="py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-clay font-bold block mb-4">Staffing Division</span>
            <h2 className="text-4xl md:text-6xl text-slate mb-6 font-bold tracking-tighter">Every level of your organisation. <span className="text-clay">Sorted.</span></h2>
            <p className="font-sans text-lg text-sage">We don’t fill vacancies — we architect your workforce. From the corner office to the shop floor.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffingTiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-2xl border border-moss/5 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="text-5xl font-bold text-moss/10 mb-6 group-hover:text-clay/20 transition-colors">{tier.id}</div>
                <div className="mb-6">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-clay font-bold block mb-1">{tier.subtitle}</span>
                  <h3 className="text-2xl font-bold text-moss">{tier.title}</h3>
                </div>
                <p className="font-sans text-sm text-sage leading-relaxed mb-8">{tier.desc}</p>
                <ul className="space-y-3">
                  {tier.points.map((point, pi) => (
                    <li key={pi} className="flex items-start gap-2 font-sans text-xs text-sage italic">
                      <ChevronRight size={14} className="text-clay mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Moved here as requested */}
      <section className="py-24 px-6 md:px-16 bg-white border-b border-moss/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold text-slate mb-6 tracking-tighter">
              A Structured <span className="text-clay italic">Process</span>.
            </h2>
            <p className="font-sans text-lg md:text-xl text-sage/60 mb-12 italic">
              Every single time. No ambiguity.
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[3.25rem] left-0 w-full h-[1px] bg-slate/10 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
              {processSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-moss rounded-full flex items-center justify-center text-white font-bold text-3xl mb-10 shadow-xl border-[6px] border-white ring-1 ring-slate/5">
                    {i + 1}
                  </div>
                  <h4 className="text-2xl font-black text-moss mb-4 tracking-tight leading-tight px-4">
                    {step.title}
                  </h4>
                  <p className="font-sans text-sm text-sage/70 leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators (Why Clients Stay With Us) */}
      <section className="py-24 px-6 md:px-16 bg-moss text-sand relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <Globe size={600} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl mb-8 leading-tight">Why Clients Stay <span className="text-clay italic">With Us</span>.</h2>
              <p className="font-sans text-lg text-sand/60 mb-12 italic">Long-term partnerships built on four unbreakable pillars.</p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: <ShieldCheck className="text-clay" />, title: "Compliance-First", desc: "Zero audit surprises. PF, ESIC, and legal handled precisely." },
                  { icon: <Briefcase className="text-clay" />, title: "Deep Sector Knowledge", desc: "14+ sectors covered with specific domain expertise." },
                  { icon: <Clock className="text-clay" />, title: "Speed Without Shortcuts", desc: "48-hour deployment for volume roles with rigour." },
                  { icon: <Building2 className="text-clay" />, title: "One Partner", desc: "Staffing and hospitality divisions under one roof." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-sand/10 rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="font-sans text-xs text-sand/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-sand/10 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-sand/10">
              <div className="flex items-center gap-6 mb-12 p-8 bg-moss rounded-2xl border border-sand/5">
                <div className="flex-shrink-0 w-20 h-20 bg-clay rounded-full flex items-center justify-center text-white">
                  <Award size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1 tracking-tight">Two Decades</h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-clay font-bold">Operational Credibility</p>
                </div>
              </div>
              <p className="text-2xl italic leading-relaxed text-sand/90">
                "We don’t fill vacancies — we architect your workforce. From the corner office to the shop floor, we deliver with precision and care."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospitality Division */}
      <section id="hospitality" className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-sans text-xs uppercase tracking-[0.4em] text-clay font-bold block mb-4 italic">Hospitality Division</span>
              <h2 className="text-4xl md:text-6xl text-slate mb-8 leading-tight">Properties managed. <br/>Experiences <span className="text-clay italic">delivered.</span></h2>
              <p className="font-sans text-lg text-sage leading-relaxed mb-10 italic">
                SahYogi InfraCare brings an operator’s discipline to hospitality asset management. We run leisure resorts, managed apartments, and service residences.
              </p>
              
              <div className="bg-moss p-10 rounded-3xl text-sand shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                  <Hotel size={200} />
                </div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-clay rounded-full flex items-center justify-center text-white"><ArrowRight size={20} /></span>
                  The SahYogi Advantage
                </h3>
                <p className="font-sans text-sm text-sand/70 mb-6 leading-relaxed">
                  Unlike pure-play hotel management firms, we bring a fully integrated workforce capability. Your property is never understaffed.
                </p>
                <div className="grid grid-cols-2 gap-4 border-t border-sand/10 pt-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-clay font-bold block mb-2">Setup</span>
                    <p className="font-sans text-[11px] text-sand/80">Structured 30-day onboarding & SOPs.</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-clay font-bold block mb-2">Standards</span>
                    <p className="font-sans text-[11px] text-sand/80">Monthly performance MIS & Audit.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-1 gap-8">
              {hospitalityDivisions.map((div, i) => (
                <div key={i} className="bg-white p-10 rounded-2xl border border-moss/5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-sand rounded-lg flex items-center justify-center text-clay">
                      {i === 0 ? <Hotel size={24} /> : <Building2 size={24} />}
                    </div>
                    <h3 className="text-2xl font-bold text-moss">{div.title}</h3>
                  </div>
                  <p className="font-sans text-sm text-sage mb-8 leading-relaxed italic">{div.desc}</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {div.points.map((point, pi) => (
                      <span key={pi} className="flex items-center gap-2 font-sans text-[10px] uppercase font-bold tracking-widest text-clay">
                        <CheckCircle2 size={12} />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About / MD Section */}
      <section id="about" className="py-24 px-6 md:px-16 bg-cream/50">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div>
                <span className="font-sans text-xs uppercase tracking-[0.4em] text-clay font-bold block mb-4 italic">The SahYogi Way</span>
                <h2 className="text-4xl md:text-6xl text-slate mb-10 leading-tight">Legacy of Operational <br/><span className="text-clay italic">Credibility.</span></h2>
                <div className="space-y-8">
                  {[
                    { title: "Pan-India Reach", desc: "Operating across all major states, combining national strength with local market intelligence." },
                    { title: "Compliance Without Compromise", desc: "PF, ESIC, TDS, and labour laws embedded in every engagement. No legal exposure." },
                    { title: "Sector Breadth", desc: "From energy projects to retail chains to leisure destinations—we bring context and depth." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-clay/10 border border-clay/20 flex items-center justify-center text-clay font-bold text-sm shadow-sm">{i+1}</div>
                      <div>
                        <h4 className="text-xl font-bold text-moss mb-2">{item.title}</h4>
                        <p className="font-sans text-base text-sage leading-relaxed italic">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="bg-moss p-12 md:p-20 rounded-[3rem] text-sand shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-clay rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10">
                 <h3 className="text-4xl font-bold mb-8 tracking-tighter">Ready to Scale?</h3>
                 <p className="font-sans text-xl text-sand/70 mb-10 leading-relaxed italic">
                   We translate your business objectives into a high-performance workforce. Rapid mobilisation, full compliance, zero friction.
                 </p>
                 <a 
                   href="#contact"
                   className="inline-flex items-center gap-4 bg-clay text-white px-10 py-5 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-clay/90 transition-all shadow-xl shadow-clay/20"
                 >
                   Connect with us <ArrowRight size={20} />
                 </a>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-20">
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-6xl text-slate mb-8 tracking-tight">Let’s talk about your <span className="text-clay italic">requirement.</span></h2>
            <p className="font-sans text-lg text-sage mb-12 italic">Whether scaling a workforce or launching a property—we respond within one business day.</p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="text-clay mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-moss mb-1">Registered Office</h4>
                  <p className="font-sans text-sm text-sage">3rd Floor, Rolex Square, City Centre, <br/>Gwalior – 474011, Madhya Pradesh</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-clay mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-moss mb-1">Direct Line</h4>
                  <p className="font-sans text-sm text-sage">+91 99937 00000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-clay mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-moss mb-1">Business Email</h4>
                  <p className="font-sans text-sm text-sage italic underline decoration-clay underline-offset-4">amit.tiwari@sahyogi.net.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleFormSubmit} className="bg-white p-8 md:p-12 rounded-3xl border border-moss/5 shadow-2xl space-y-6">
              {submitStatus && (
                <div className={`p-4 rounded-lg font-sans text-sm ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest font-bold text-sage mb-2 italic">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleFormChange} required className="w-full bg-sand border border-moss/10 rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-clay transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest font-bold text-sage mb-2 italic">Organisation</label>
                  <input type="text" name="organisation" value={formData.organisation} onChange={handleFormChange} required className="w-full bg-sand border border-moss/10 rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-clay transition-colors" placeholder="Company Name" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest font-bold text-sage mb-2 italic">Email Address</label>
                  <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleFormChange} required className="w-full bg-sand border border-moss/10 rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-clay transition-colors" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest font-bold text-sage mb-2 italic">Division of Interest</label>
                  <select name="divisionOfInterest" value={formData.divisionOfInterest} onChange={handleFormChange} className="w-full bg-sand border border-moss/10 rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-clay transition-colors appearance-none">
                    <option value="Staffing - Leadership / CXO">Staffing - Leadership / CXO</option>
                    <option value="Staffing - Bulk Hiring">Staffing - Bulk Hiring</option>
                    <option value="Staffing - Contract / Off-Roll">Staffing - Contract / Off-Roll</option>
                    <option value="Hospitality - Resort Management">Hospitality - Resort Management</option>
                    <option value="Hospitality - Managed Apartments">Hospitality - Managed Apartments</option>
                    <option value="Other Services">Other Services</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest font-bold text-sage mb-2 italic">Your Requirement</label>
                <textarea name="yourRequirement" value={formData.yourRequirement} onChange={handleFormChange} required rows={4} className="w-full bg-sand border border-moss/10 rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-clay transition-colors" placeholder="Timeline, role count, location or property details..."></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-clay text-white py-5 rounded font-sans text-xs uppercase tracking-widest font-bold hover:shadow-2xl hover:shadow-clay/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? "Submitting..." : (
                  <>Submit Business Enquiry <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-moss py-20 px-6 md:px-16 text-sand">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-1">
              <div className="flex flex-col mb-8">
                <span className="text-2xl font-bold tracking-tighter leading-none mb-1">SAHYOGI INFRACARE</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-clay font-sans font-bold">Staffing · Hospitality · Operations</span>
              </div>
              <p className="font-sans text-xs text-sand/60 leading-relaxed italic mb-8">
                A trusted partner for workforce solutions and hospitality asset management across India’s growth sectors. Gwalior-headquartered, Pan-India in reach.
              </p>
            </div>
            
            <div>
              <h4 className="font-sans text-[10px] uppercase tracking-widest text-clay font-bold mb-8">Staffing</h4>
              <ul className="space-y-4 font-sans text-xs text-sand/60">
                <li>CXO & Leadership Search</li>
                <li>Middle Management</li>
                <li>Entry Level Hiring</li>
                <li>Contract Staffing</li>
                <li>Blue Collar Workforce</li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-[10px] uppercase tracking-widest text-clay font-bold mb-8">Hospitality</h4>
              <ul className="space-y-4 font-sans text-xs text-sand/60">
                <li>Leisure Resorts</li>
                <li>Managed Apartments</li>
                <li>Service Residences</li>
                <li>Property Onboarding</li>
                <li>Compliance & Audit</li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-[10px] uppercase tracking-widest text-clay font-bold mb-8">Company</h4>
              <ul className="space-y-4 font-sans text-xs text-sand/60">
                <li><a href="#about" className="hover:text-sand transition-colors">Credentials</a></li>
                <li><a href="#contact" className="hover:text-sand transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-sand/10 flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-[10px] uppercase tracking-widest text-sand/40">
            <p>© {new Date().getFullYear()} SahYogi InfraCare Pvt Ltd. All rights reserved. Gwalior, Madhya Pradesh.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-sand transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-sand transition-colors">Terms of Engagement</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes infiniteScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infiniteScroll 60s linear infinite;
        }
        .text-shadow {
          text-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

