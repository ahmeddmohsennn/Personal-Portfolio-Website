import { useState, FormEvent } from "react";
import { Mail, Phone, Calendar, ShieldAlert, CheckCircle2, ClipboardCheck, ArrowUpRight } from "lucide-react";

export default function ContactView() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    clinicalAffiliation: "",
    systemTarget: "emr-overlay",
    scopeLevel: "prototype",
    interop: "fhir",
    challenge: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.challenge) return;
    setFormSubmitted(true);
  };

  return (
    <div id="contact-view" className="space-y-12 py-4 animate-fade-in">
      {/* Header */}
      <div id="contact-header" className="max-w-3xl space-y-4">
        <span className="inline-block text-[10px] font-mono tracking-widest text-sky-600 uppercase font-semibold">
          Secure Intake Form // HIPAA Protected
        </span>
        <h1 className="serif-display text-4xl sm:text-5xl font-light text-slate-900 tracking-tight">
          Initiate a <span className="italic font-normal">Consultation Intake</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Need a robust HIPAA portfolio overlay, an advanced EHR API connector, or a speech-to-chart AI pipeline? Complete this clinical developer intake form to schedule an architectural preview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact details */}
        <div id="contact-info-panel" className="lg:col-span-4 space-y-6">
          <div className="bg-slate-950 text-white rounded-none p-6 space-y-5 border border-slate-900 relative overflow-hidden">
            <h3 className="serif-display text-2xl font-light italic text-sky-400">Direct Channels</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Prefer classic encrypted email, active calendar dispatch, or clinical telemetry channels? Get in touch directly and receive a clinician's response within 24 hours.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center space-x-3 text-slate-300 hover:text-sky-400 transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="truncate">dr.harris@clinicalcoder.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+1 (555) 722-3868</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Calendar className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Mon - Fri (Clinical Labs)</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-none space-y-4">
            <div className="flex items-start space-x-3">
              <ShieldAlert className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Compliance Protocol</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-2 font-sans">
                  All communication channels, intake forms, and initial development briefs are covered under standard unilateral medical NDA protocols. Client patient datasets (PHI) are strictly avoided during analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div id="contact-form-panel" className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 rounded-none">
          {!formSubmitted ? (
            <form id="consultation-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="serif-display text-xl font-light text-slate-900 flex items-center space-x-2">
                  <ClipboardCheck className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>Clinical Software Intake Sheet</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Fill out the clinical specifications to auto-structure our analysis call.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Provider / Principal Investigator *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3 py-3 border border-slate-200 rounded-none focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900 bg-slate-55/30 focus:bg-white"
                    placeholder="e.g. Dr. Sarah Chen, MD"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Intake Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3 py-3 border border-slate-200 rounded-none focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900 bg-slate-55/30 focus:bg-white"
                    placeholder="e.g. schen@cardiohealth.org"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Hospital Site / Practice Affiliation</label>
                <input
                  type="text"
                  value={formData.clinicalAffiliation}
                  onChange={(e) => setFormData({ ...formData, clinicalAffiliation: e.target.value })}
                  className="w-full text-xs px-3 py-3 border border-slate-200 rounded-none focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900 bg-slate-55/30 focus:bg-white"
                  placeholder="e.g. Mercy General Hospital, Biotech Research Lab, private practice"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">System Topology Target</label>
                  <select
                    value={formData.systemTarget}
                    onChange={(e) => setFormData({ ...formData, systemTarget: e.target.value })}
                    className="w-full text-xs px-3 py-3 border border-slate-200 rounded-none bg-slate-55/30 focus:bg-white focus:outline-hidden"
                  >
                    <option value="emr-overlay">EMR Web Overlay / API</option>
                    <option value="ai-scribe">Clinical Generative Scribe</option>
                    <option value="laboratory-viz">Laboratory Telemetry / Charts</option>
                    <option value="hipaa-audit">Core Database HIPAA Audit</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Scope & Timeline Protocol</label>
                  <select
                    value={formData.scopeLevel}
                    onChange={(e) => setFormData({ ...formData, scopeLevel: e.target.value })}
                    className="w-full text-xs px-3 py-3 border border-slate-200 rounded-none bg-slate-55/30 focus:bg-white focus:outline-hidden"
                  >
                    <option value="prototype">Sandbox Prototype (1-2 weeks)</option>
                    <option value="pilot">Clinical Pilot Trial (4 weeks)</option>
                    <option value="production">Hospital-Grade Production (8+ weeks)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Interoperability Criteria</label>
                  <select
                    value={formData.interop}
                    onChange={(e) => setFormData({ ...formData, interop: e.target.value })}
                    className="w-full text-xs px-3 py-3 border border-slate-200 rounded-none bg-slate-55/30 focus:bg-white focus:outline-hidden"
                  >
                    <option value="fhir">RESTful HL7 FHIR Standard</option>
                    <option value="hl7-v2">Legacy HL7 v2 Socket Feeds</option>
                    <option value="none">Independent Secure database</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Clinical Workflow Pain Point & Concept Brief *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  className="w-full text-xs p-4 border border-slate-200 rounded-none bg-slate-55/30 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900 leading-relaxed font-mono"
                  placeholder="Describe the clinical bottleneck (e.g. 'EPIC charting is wasting hours', 'My lab needs a dashboard converting hematology CSV outputs to graphs', 'I need the HIPAA anonymization parser module')"
                />
              </div>

              <button
                id="btn-submit-intake"
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 text-white rounded-none py-4 text-xs font-bold uppercase tracking-widest hover:bg-sky-600 transition-colors cursor-pointer"
              >
                <span>Submit Intake & Generate Diagnostic</span>
                <ArrowUpRight className="w-4 h-4 text-sky-400" />
              </button>
            </form>
          ) : (
            /* Success Response State with "Clinical diagnostic structured report" */
            <div id="intake-success-report" className="space-y-6 text-xs animate-fade-in text-slate-750">
              <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-none bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                  <CheckCircle2 className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="serif-display text-xl font-light text-slate-900">Intake Dispatch Validated</h3>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-1">CASE_INTAKE_REF // {Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-none border border-slate-200 space-y-4">
                <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Physician Architectural Dispatch Diagnostic</h4>
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400">INTAKE COORDINATOR:</span> <strong className="text-slate-800">{formData.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">EHR INTEROPERABILITY:</span> <strong className="text-sky-600 font-bold uppercase">{formData.interop}</strong>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">CLINICAL AFFILIATION:</span>{" "}
                    <strong className="text-slate-800">{formData.clinicalAffiliation || "Independent Provider"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">TARGET ARCHITECTURE CLASS:</span>{" "}
                    <strong className="text-slate-800 uppercase">
                      {formData.systemTarget.replace("-", " ")} ({formData.scopeLevel})
                    </strong>
                  </div>
                  <div className="border-t border-slate-200 pt-3 mt-3">
                    <p className="text-slate-400 text-[9px] uppercase tracking-wider mb-2">Registered Clinical Pain Point Brief:</p>
                    <p className="border border-slate-250 bg-white p-3 rounded-none text-slate-600 italic leading-relaxed text-[11px] font-mono">
                      "{formData.challenge}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4 font-sans text-xs text-slate-705 leading-relaxed">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Recommended Consultation Protocols:</h4>
                <p>
                  Thank you, Dr. Harris has received this technical case formulation and will cross-reference it against hospital compliance frameworks. A custom development layout outline and code-architecture preview proposal has been auto-scheduled and sent to <strong>{formData.email}</strong>.
                </p>
              </div>

              <button
                id="btn-return-form"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    clinicalAffiliation: "",
                    systemTarget: "emr-overlay",
                    scopeLevel: "prototype",
                    interop: "fhir",
                    challenge: ""
                  });
                }}
                className="inline-flex items-center space-x-1.5 text-sky-600 font-mono font-bold hover:text-sky-700 transition"
              >
                <span>← Initiate New Case Intake Form</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

