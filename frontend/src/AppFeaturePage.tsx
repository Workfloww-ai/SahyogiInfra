import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Smartphone, MapPin, Mail, ArrowRight } from "lucide-react";
import QRCode from "react-qr-code";
import React from "react";

const appFeatures = [
  {
    id: "01",
    title: "Welcome to Sahyogi",
    desc: "Sahyogi is a smart staffing and operations platform designed to bridge the gap between businesses that need reliable talent and individuals looking for flexible work. Whether you are managing hospitality operations, retail stores, or gig-based projects, Sahyogi ensures you always have the right people, exactly when and where you need them.",
  },
  {
    id: "02",
    title: "Empowering Businesses",
    desc: "Managing a flexible workforce shouldn't be a full-time headache. Sahyogi provides businesses with a seamless way to:",
    points: [
      "Request Staff on Demand: On demand workforce, quickly broadcast shift requirements to a pool of ready-to-work professionals.",
      "Track Operations in Real-Time: Monitor staff attendance and location to ensure your business is always running smoothly.",
      "Simplify Payroll: Let our automated finance engine handle shift calculations, payouts, and financial reconciliation without the paperwork."
    ]
  },
  {
    id: "03",
    title: "Championing the Workforce",
    desc: "We believe in empowering our workforce—our \"Sahyogis.\" Through our easy-to-use mobile app, workaholic can take control of their careers by:",
    points: [
      "Choosing Flexible Shifts: Accepting jobs that fit their schedule and location preferences.",
      "Tracking Daily Earnings: Enjoying complete transparency with real-time updates on completed shifts and upcoming payouts.",
      "Upskilling on the Go: Accessing our built-in training and content library to learn new skills and qualify for better opportunities."
    ]
  },
  {
    id: "04",
    title: "Seamless End-to-End Management",
    desc: "Sahyogi platform eliminates the chaos of traditional staffing by bringing every step of the process into one unified platform. From the moment a business requests a workaholic to the final payout, everything is tracked, verified, and managed digitally. No more messy spreadsheets, lost timesheets, or miscommunication—just smooth, reliable operations.",
  },
  {
    id: "05",
    title: "Built for Reliability & Scale",
    desc: "Whether you are staffing a single local store or managing operations across hundreds of locations nationwide, Sahyogi grows with you. By digitizing the entire staffing lifecycle, we reduce your administrative overhead, ensure accountability, and let you focus on what you do best: growing your business.",
  }
];

export default function AppFeaturePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-sand text-slate font-sans">
      <header className="py-4 bg-white/90 backdrop-blur-md border-b border-moss/10 sticky top-0 z-[100] px-6 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-moss hover:text-clay transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
        </div>
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="SahYogi Logo" className="h-12 md:h-16 w-auto object-contain" />
          <span className="text-lg md:text-xl font-black tracking-tight leading-none hidden sm:inline mt-1"><span className="text-moss">Sah</span><span className="text-red-600">Yogi</span><span className="text-moss"> APP</span></span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-16 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-clay font-bold block mb-4">Your Premier Staffing Partner</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate mb-8 tracking-tighter leading-tight">
              Transforming future of <span className="text-clay">flexible work</span>
            </h1>
            <p className="text-xl text-sage mb-10 leading-relaxed">
              Join Sahyogi today. A platform where businesses find reliable talent, & workaholics find flexible opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#download" className="bg-moss text-white px-8 py-4 rounded font-sans text-xs uppercase tracking-widest font-bold hover:bg-moss/90 transition-all flex items-center gap-3">
                Download Today <Smartphone size={16} />
              </a>
              <a href="#contact" className="border border-moss/20 text-moss px-8 py-4 rounded font-sans text-xs uppercase tracking-widest font-bold hover:bg-moss/5 transition-all text-center">
                Contact Us
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center relative w-full lg:w-auto mt-10 lg:mt-0">
            {/* Big Red Effect Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-clay rounded-full blur-[100px] md:blur-[120px] opacity-30 pointer-events-none"></div>

            <div className="bg-sand p-12 md:p-14 rounded-[2.5rem] border border-moss/10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] text-center z-10 relative">
              <div className="bg-white p-5 rounded-[2rem] mx-auto mb-8 inline-block shadow-md border border-slate/5">
                <QRCode
                  value="https://play.google.com/store/apps/details?id=com.workfloww.sahyogi&hl=en_IN"
                  size={220}
                  fgColor="#0b5b31"
                />
              </div>
              <h3 className="text-3xl font-black text-slate mb-3 tracking-tight">Scan to Download</h3>
              <p className="text-sage text-base font-sans mb-8">Available on Android</p>
              <a href="https://play.google.com/store/apps/details?id=com.workfloww.sahyogi&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-clay text-white px-8 py-4 rounded-xl font-sans text-sm uppercase tracking-widest font-bold hover:bg-clay/90 transition-all shadow-[0_8px_30px_rgba(237,28,36,0.3)] hover:shadow-[0_8px_30px_rgba(237,28,36,0.5)] w-full">
                DOWNLOAD APP
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Minimalist & Aesthetic */}
      <section className="py-8 px-6 md:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          {/* Sticky Left Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-clay font-bold block mb-4">Core Benefits</span>
              <h2 className="text-4xl md:text-6xl text-slate mb-12 font-black tracking-tighter leading-tight">
                The Power of <br className="hidden lg:block" />
                <span className="italic"><span className="text-moss">Sah</span><span className="text-clay">yogi</span></span>.
              </h2>
              <div className="hidden lg:flex w-24 h-24 rounded-full border border-slate/5 items-center justify-center bg-sand shadow-sm">
                <Smartphone size={32} className="text-moss" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 space-y-24">
            {appFeatures.map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                {/* Elegant Numbering */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-sans tracking-[0.2em] font-bold text-clay">
                    {feature.id}
                  </span>
                  <div className="h-[1px] w-12 bg-clay/20 transition-all duration-500 group-hover:w-24 group-hover:bg-clay/60"></div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-slate mb-6 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-xl text-sage leading-relaxed mb-10 max-w-2xl font-light">
                  {feature.desc}
                </p>

                {feature.points && (
                  <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
                    {feature.points.map((point, pi) => {
                      const [title, ...rest] = point.split(':');
                      return (
                        <div key={pi} className="p-6 bg-sand rounded-3xl border border-slate/5 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate/10 flex flex-col gap-3">
                          <CheckCircle2 className="text-moss" size={24} strokeWidth={1.5} />
                          <div>
                            {rest.length > 0 ? (
                              <>
                                <strong className="text-slate block mb-2 font-sans text-sm tracking-wide">{title}</strong>
                                <span className="text-sage text-sm leading-relaxed">{rest.join(':')}</span>
                              </>
                            ) : (
                              <span className="text-sage text-sm leading-relaxed">{point}</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Action */}
      <section id="download" className="py-12 px-6 md:px-16 bg-moss text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to get started?</h2>
          <p className="text-xl text-sand/80 mb-12 italic">
            Join thousands of businesses and Workaholics who are transforming the way they work.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="bg-white text-moss p-10 rounded-3xl shadow-2xl flex flex-col items-center transform hover:scale-105 transition-transform">
              <div className="bg-white p-2 rounded-xl mb-6 border border-slate/10 shadow-sm">
                <QRCode
                  value="https://play.google.com/store/apps/details?id=com.workfloww.sahyogi&hl=en_IN"
                  size={140}
                  fgColor="#0b5b31"
                />
              </div>
              <span className="font-bold text-xl mb-2 tracking-tight">Download <span className="text-moss">Sah</span><span className="text-clay">Yogi</span> App</span>
              <span className="text-sm text-sage/70 font-sans uppercase tracking-widest font-bold">Scan QR Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-clay font-bold block mb-4">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate mb-12 tracking-tight">Need more info? <span className="text-clay italic">Contact Us</span></h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-sand p-8 md:p-10 rounded-3xl border border-moss/10 flex items-start gap-6 shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                <Mail className="text-clay" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-moss text-xl mb-2">Email Us</h4>
                <p className="text-sage mb-4 text-sm leading-relaxed">We usually reply within 24 hours.</p>
                <a href="mailto:amit.tiwari@sahyogi.net.in" className="font-bold text-clay underline decoration-clay underline-offset-4 text-sm">amit.tiwari@sahyogi.net.in</a>
              </div>
            </div>
            <div className="bg-sand p-8 md:p-10 rounded-3xl border border-moss/10 flex items-start gap-6 shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                <MapPin className="text-clay" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-moss text-xl mb-2">Visit Us</h4>
                <p className="text-sage text-sm leading-relaxed">3rd Floor, Rolex Square, City Centre, Gwalior – 474011, Madhya Pradesh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="bg-moss py-16 text-center text-sand/50 text-sm border-t border-sand/10 flex flex-col items-center gap-8">
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate/5">
          <img src="/logo.png" alt="SahYogi Logo" className="h-20 md:h-28 w-auto object-contain" />
        </div>
        <p className="font-sans text-[10px] uppercase tracking-widest">© {new Date().getFullYear()} SahYogi InfraCare Pvt Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
