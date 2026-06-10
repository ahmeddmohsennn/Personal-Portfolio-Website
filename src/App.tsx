import { useState } from "react";
import Navigation from "./components/Navigation";
import HomeView from "./components/HomeView";
import ProjectsView from "./components/ProjectsView";
import SandboxView from "./components/SandboxView";
import ContactView from "./components/ContactView";
import { ShieldCheck, HeartPulse, CodeXml, Users, Sparkles } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");

  return (
    <div className="min-h-screen bg-slate-50/30 text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-100 selection:text-sky-900">
      <div className="flex-1 flex flex-col pt-4">
        {/* Navigation Bar Header */}
        <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Central Component View Stage */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
          {currentTab === "home" && <HomeView setCurrentTab={setCurrentTab} />}
          {currentTab === "projects" && <ProjectsView />}
          {currentTab === "sandbox" && <SandboxView />}
          {currentTab === "contact" && <ContactView />}
        </main>
      </div>

      {/* Footer Design */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 mt-16 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border-b border-slate-900 pb-8">
            {/* Branding Column */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-none bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-bold">
                  MD
                </div>
                <span className="serif-display text-base font-light text-white tracking-wide">
                  Dr. Jack Harris, MD, MS
                </span>
              </div>
              <p className="text-slate-500 leading-normal max-w-xs font-sans text-xs">
                Clinical Software Developer bridging patient-face medicine with production full-stack engineering.
              </p>
            </div>

            {/* Certifications and Licensures Column */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Credential Clearances</h4>
              <ul className="space-y-2 text-slate-500 font-mono text-[11px]">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>Licensed Medical Practitioner (MD #722-3861A)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>HL7 FHIR Interoperability certified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>HIPAA Compliant Development Specialist</span>
                </li>
              </ul>
            </div>

            {/* Inquiries */}
            <div className="space-y-2 text-slate-500 text-xs">
              <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Contract Availability</h4>
              <p className="leading-relaxed font-sans">
                Currently taking freelance projects and clinical consulting contracts. Rates based on system specification complexity and certification level.
              </p>
              <p className="text-sky-400 font-mono text-xs font-semibold cursor-pointer flex items-center space-x-1 hover:underline" onClick={() => setCurrentTab("contact")}>
                <span>Enter Consult Intake Room →</span>
              </p>
            </div>
          </div>

          {/* Copyright and Legal Footnote */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[10px] uppercase tracking-widest font-mono">
            <span id="footer-copyright">
              © {new Date().getFullYear()} DR. JACK HARRIS. ALL RIGHTS RESERVED.
            </span>
            <span id="compliance-notices">
              ISO-13485 CERTIFIED SPECIFICATIONS | HIPAA SAFE HARBOR COMPLIANT SECURE LAYOUT
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
