import { ShieldCheck, HeartPulse, CodeXml, Users, Sparkles, Database, FileSpreadsheet, ArrowRight } from "lucide-react";
// @ts-ignore
import avatarImg from "../assets/images/physician_developer_avatar_1781084491253.png";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function HomeView({ setCurrentTab }: HomeViewProps) {
  const values = [
    {
      title: "Deep Clinical Context",
      icon: HeartPulse,
      color: "text-sky-600 bg-sky-50 border-sky-100",
      description: "Non-MD coders can spend months learning basic clinical terminologies, charting workflows, and hospital billing hierarchies. I operate with instant native physician understanding."
    },
    {
      title: "HIPAA & Core Integrity",
      icon: ShieldCheck,
      color: "text-slate-700 bg-slate-50 border-slate-200/80",
      description: "Data governance is built directly into the database architecture. My software designs prioritize phi-encryption, secure audit trails, and strict healthcare compliance frameworks."
    },
    {
      title: "HL7 & FHIR Standardizations",
      icon: Database,
      color: "text-sky-600 bg-sky-50 border-sky-100",
      description: "Advanced experience mapping legacy demographic databases and proprietary clinical files to modern interoperable standards, exposing clean RESTful FHIR bundles."
    },
    {
      title: "AI Co-Clinical Agents",
      icon: Sparkles,
      color: "text-slate-800 bg-slate-100 border-slate-200",
      description: "Specialized in running on-premise or cloud-secured Gemini models to extract clinical observations, write draft summaries, and auto-match billing categories, saving hours of EMR burnout."
    }
  ];

  const highlights = [
    { label: "Active Practice MD", value: "08+ Years" },
    { label: "HL7 / FHIR Integration", value: "REST-FHIR" },
    { label: "HIPAA Certified Logs", value: "Compliant" },
    { label: "AI Code Specialty", value: "NLP / SOAP" }
  ];

  return (
    <div id="home-view" className="space-y-16 py-4 animate-fade-in">
      {/* Hero Section - Artistic grid-bg design */}
      <section id="hero-section" className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-12 border border-slate-200 overflow-hidden">
        {/* Subtle grid accent background */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        
        <div className="lg:col-span-7 space-y-8 z-10">
          <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 border border-slate-200 text-xs text-slate-800 font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-sky-500 animate-pulse relative" />
            <span>Currently Consulting on Medical Software & AI Integrations</span>
          </div>

          <h1 className="serif-display text-5xl sm:text-7xl font-light text-slate-900 leading-[0.95] tracking-tight">
            Precision <br />
            <span className="italic font-normal text-sky-600">Diagnostics</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
            Hi, I’m Dr. Jack Harris. I build clinical-grade software. By pairing medical expertise with TypeScript and NLP architectures, I design high-fidelity tools that eliminate EMR burden, map FHIR interoperability, and operate with native medical wisdom.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white p-4 border border-slate-200 shadow-xs">
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{h.label}</p>
                <p className="text-base font-bold text-slate-800 mt-1 font-mono italic">{h.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-2">
            <button
              id="hero-go-sandbox"
              onClick={() => setCurrentTab("sandbox")}
              className="inline-flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-sky-600 transition-colors cursor-pointer"
            >
              <span>Test Clinical AI Sandbox</span>
              <Sparkles className="w-4 h-4 text-sky-400" />
            </button>
            <button
              id="hero-go-projects"
              onClick={() => setCurrentTab("projects")}
              className="inline-flex items-center justify-center space-x-2 bg-white text-slate-800 border border-slate-200 px-6 py-4 text-xs font-bold uppercase tracking-widest hover:border-slate-900 transition-colors cursor-pointer"
            >
              <span>View Lab Hub</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Profile Avatar Frame - Artistic layout */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <div className="relative w-full max-w-sm aspect-square bg-slate-100 border border-slate-200 p-4 shadow-sm">
            <div className="absolute top-2 left-2 text-[9px] font-mono uppercase tracking-widest text-slate-400">
              Avatar_Secure_PHI_OFF
            </div>
            <img
              src={avatarImg}
              alt="Dr. Jack Harris Avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-none relative z-10 border border-slate-200 bg-white"
            />
          </div>
        </div>
      </section>

      {/* Why Clinical Coder Section */}
      <section id="philosophy-section" className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="serif-display text-4xl font-light text-slate-900 tracking-tight">
            Why Hiring a <span className="italic text-sky-600 font-normal">Physician-Coder</span> Saves Time & Funding
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Most clinical software fails because its creators have never charted in an active emergency department, navigated legacy insurance software, or handled high-stress laboratory protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                id={`philosophy-card-${i}`}
                className="bg-white p-6 border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-5"
              >
                <div className={`p-3 rounded-none border flex-shrink-0 ${v.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="serif-display text-lg italic text-slate-800">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Specialties Callout */}
      <section id="specialties-section" className="bg-slate-900 text-white rounded-none p-8 sm:p-12 relative overflow-hidden">
        {/* Artistic background accents */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="text-[10px] font-mono uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1.5 tracking-widest">
              Clinical Specializations
            </span>
            <h2 className="serif-display text-3xl sm:text-4xl font-light leading-tight">
              Bridging Medicine <span className="italic font-normal text-sky-400">&</span> Logic
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Whether you are an independent clinician seeking to prototype an idea, a healthcare network deploying EMR custom automation, or a healthtech startup scaling FHIR services:
            </p>
            <ul className="space-y-3 pt-2 text-xs font-mono text-slate-400">
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-sky-400" />
                <span>Responsive, client-specific EMR overlays & scheduling software</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-sky-400" />
                <span>FHIR standard mappings & robust TypeScript integration</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-sky-400" />
                <span>Custom offline dashboard and telemetry visualizations (D3/Recharts)</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 border border-slate-700/65 space-y-3">
              <CodeXml className="w-6 h-6 text-sky-400" />
              <h4 className="serif-display text-lg italic">Web & Mobile Apps</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Lightweight React + Tailwind frameworks designed for mobile-first clinical staff.</p>
            </div>
            <div className="bg-slate-800 p-6 border border-slate-700/65 space-y-3">
              <Sparkles className="w-6 h-6 text-sky-400" />
              <h4 className="serif-display text-lg italic">Clinical GenAI</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Automated ambient dictations, chart parsing, and billing analysis using LLMs.</p>
            </div>
            <div className="bg-slate-800 p-6 border border-slate-700/65 space-y-3">
              <Database className="w-6 h-6 text-sky-400" />
              <h4 className="serif-display text-lg italic">Secure HIPAA APIs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Strict end-to-end security, PHI safety, and certified HIPAA architecture.</p>
            </div>
            <div className="bg-slate-800 p-6 border border-slate-700/65 space-y-3">
              <FileSpreadsheet className="w-6 h-6 text-sky-400" />
              <h4 className="serif-display text-lg italic">FHIR Integrations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Parsing legacy hospital streams directly to secure interoperable REST vectors.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

