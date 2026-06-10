import { useState } from "react";
import { Laptop, Database, Globe, Brain, HelpCircle, CodeXml, CheckCircle2, FileCode2 } from "lucide-react";
import { Project } from "../types";

export default function ProjectsView() {
  const [selectedProject, setSelectedProject] = useState<string>("fhir-sync");
  const [detailTab, setDetailTab] = useState<"motivation" | "specs" | "snippet">("motivation");

  const projects: Project[] = [
    {
      id: "fhir-sync",
      title: "Interoperable FHIR Schema Pipeline",
      category: "Integration",
      description: "An advanced, high-velocity Node.js/Express pipeline that consumes arbitrary clinical database dumps and converts them into production-ready, hl7.org certified FHIR Resources (Patient, Observation, and Encounter schemas).",
      clinicalImpact: "Enables legacy private practices and billing networks to instantly connect to modern hospital portals and centralized national registries without complete database migration.",
      techStack: ["TypeScript", "Node.js", "Express", "Zod", "JSON-LD"],
      architecture: "Exposes secure middleware that intercepts legacy demographic payloads, validates telemetry fields against strict HL7 schemas via custom schemas, and streams clean RESTful FHIR packets to secure destinations.",
      codeSnippet: `import { FHIRPatient, LegacyRecord } from "./types/clinical";
import { v5 as uuidv5 } from "uuid";

// DNS Namespace UUID for HIPAA-consistent, reproducible identifier hashing
const HIPAA_NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

export function transformLegacyToFHIR(payload: LegacyRecord): FHIRPatient {
  // Generate consistent deterministic UUID to act as HIPAA safe identifier
  const securePatientId = uuidv5(payload.legacy_id.toString(), HIPAA_NAMESPACE);

  return {
    resourceType: "Patient",
    id: securePatientId,
    active: true,
    name: [
      {
        use: "official",
        family: payload.last_name.toUpperCase(),
        given: [payload.first_name],
      }
    ],
    telecom: [
      {
        system: "phone",
        value: payload.phone || "unknown",
        use: "mobile"
      },
      {
        system: "email",
        value: payload.email || "unknown",
        use: "home"
      }
    ],
    gender: mapToFHIRGender(payload.sex_assigned_at_birth),
    birthDate: payload.dob_iso,
    deceasedBoolean: false,
    managingOrganization: {
      reference: \`Organization/\${payload.clinic_code}\`,
      display: payload.clinic_name
    }
  };
}

function mapToFHIRGender(sex: string): "male" | "female" | "other" | "unknown" {
  switch (sex.toLowerCase()) {
    case "m": return "male";
    case "f": return "female";
    default: return "unknown";
  }
}`
    },
    {
      id: "ambient-scribe",
      title: "AetherChart: Clinical Ambient Scribe API",
      category: "AI",
      description: "A robust back-end microservice proxying clinical audio feeds to generative AI endpoints, isolating clinician conversations, and exporting pristine drafted structured SOAP notes.",
      clinicalImpact: "Reduces clinical administrative charting burden by up to 3.5 hours per shift, letting physicians look at the patient instead of typing into an EMR screen.",
      techStack: ["TypeScript", "@google/genai", "Express", "Audio-Multer", "Zod"],
      architecture: "Buffers clinical microphone feeds, executes secure speech-to-text operations through Whisper interfaces, and streams structural clinical analyses to EMR endpoints via structured JSON payloads.",
      codeSnippet: `import { GoogleGenAI, Type } from "@google/genai";
import { SOAPExtractionSchema } from "./schemas/clinical";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function extractSOAPFromTranscript(transcriptText: string) {
  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: \`Please analyze the following clinician-patient conversation and construct a clinical SOAP note:\\n\\n\${transcriptText}\`,
    config: {
      systemInstruction: "You are a professional scribe operating with strict clinical vocabulary.",
      responseMimeType: "application/json",
      responseSchema: SOAPExtractionSchema,
      temperature: 0.1
    }
  });

  return JSON.parse(result.text || "{}");
}`
    },
    {
      id: "cdss-nexus",
      title: "PlexusCDSS: Local Decision Support Router",
      category: "EMR",
      description: "An high-performance clinical decision support system (CDSS) for looking up drug-chemical interactions, contraindications, and pediatric dosage safety constraints without requiring round-trip cloud queries.",
      clinicalImpact: "Flags critical patient hazards (e.g. prescribing ACE Inhibitors during pregnancy or combining blood thinners with high-dose NSAIDs) on-demand, even during active internet outages.",
      techStack: ["React", "IndexedDB", "RxJS", "TypeScript"],
      architecture: "Indexes database models locally, executing complex intersection queries. A reactive pipeline monitors the active EMR formulary and highlights safety checks in real-time.",
      codeSnippet: `import { DrugInteractionDB, SafetyFlag } from "./db/cdss";

export interface CDSSPayload {
  patientAgeMonths: number;
  activeDiagnoses: string[];
  proposedMedications: string[];
}

export async function runCDSSSafetyCheck(payload: CDSSPayload): Promise<SafetyFlag[]> {
  const alerts: SafetyFlag[] = [];
  
  // 1. Check for severe drug-to-drug interactions locally
  for (let i = 0; i < payload.proposedMedications.length; i++) {
    for (let j = i + 1; j < payload.proposedMedications.length; j++) {
      const medA = payload.proposedMedications[i];
      const medB = payload.proposedMedications[j];
      
      const severeInteraction = await DrugInteractionDB.check(medA, medB);
      if (severeInteraction) {
        alerts.push({
          severity: "Critical",
          mechanism: severeInteraction.mechanism,
          recommendation: \`Do not prescribe \${medA} and \${medB} concurrently.\`
        });
      }
    }
  }

  // 2. Alert pediatric dose guidelines
  if (payload.patientAgeMonths < 24) {
    const contraindicated = payload.proposedMedications.filter(med => 
      DrugInteractionDB.isAgeContraindicated(med, payload.patientAgeMonths)
    );
    contraindicated.forEach(med => {
      alerts.push({
        severity: "Critical",
        mechanism: "Pediatric Age Contraindication",
        recommendation: \`Medication \${med} is contraindicated for children under 4 years.\`
      });
    });
  }

  return alerts;
}`
    },
    {
      id: "hipaa-audit",
      title: "Secure HIPAA Ledger & Log Aggregator",
      category: "HIPAA",
      description: "A highly-secure logging microservice middleware that intercept logs containing Protected Health Info (PHI), anonymizes demographics, and commits audit logs complying with HIPAA §164.312 requirements.",
      clinicalImpact: "Protects clinics and tech companies from multimillion-dollar HIPAA leaks by verifying that zero plaintext names, medical numbers, or IP addresses escape local routers.",
      techStack: ["Node.js", "TypeScript", "Crypto", "Winston"],
      architecture: "Utilizes military-grade SHA-256 HMAC encryption keys stored solely in server RAM to token-hash names and Social Security keys, reporting structural payloads safely to remote loggers.",
      codeSnippet: `import crypto from "crypto";

const HMAC_SECRET = process.env.HIPAA_HMAC_SECRET_KEY || "fallback_local_secret";

// Anonymizes HIPAA-specified Patient Identifiers
export function cleanHIPAAPayload(logBody: Record<string, any>): Record<string, any> {
  const clean = { ...logBody };
  
  // Hard HIPAA Safe-Harbor requirements (18 identifiers list)
  const identifyingFields = ["patient_name", "ssn", "phone", "email", "mrn", "ip_address"];
  
  identifyingFields.forEach(field => {
    if (clean[field]) {
      // Hash identifier with server secret key to produce consistent mock key
      clean[field] = crypto
        .createHmac("sha256", HMAC_SECRET)
        .update(clean[field].toString())
        .digest("hex")
        .substring(0, 16);
    }
  });

  return {
    ...clean,
    anonymizedAt: new Date().toISOString(),
    compliance_token: "HIPAA_164_312_COMPLIANT"
  };
}`
    }
  ];

  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];

  return (
    <div id="projects-view" className="space-y-10 py-4 animate-fade-in">
      <div id="projects-header" className="max-w-3xl space-y-4">
        <span className="inline-block text-[10px] font-mono tracking-widest text-sky-600 uppercase font-semibold">
          LAB CASE STUDIES // REGISTER
        </span>
        <h1 className="serif-display text-4xl sm:text-5xl font-light text-slate-900 tracking-tight">
          Clinical <span className="italic font-normal">Engineering</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Robust healthcare systems built with absolute precision. Select any case module below to explore clinical rationales, code blueprints, and raw schemas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Project side menu */}
        <div id="projects-selector" className="lg:col-span-4 space-y-4">
          {projects.map((p, idx) => {
            const isSelected = p.id === selectedProject;
            return (
              <button
                key={p.id}
                id={`project-btn-${p.id}`}
                onClick={() => {
                  setSelectedProject(p.id);
                  setDetailTab("motivation");
                }}
                className={`w-full text-left p-6 border rounded-none transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white border-slate-900 shadow-xs"
                    : "bg-slate-55/60 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="mono-code text-[10px] uppercase text-sky-600 font-bold">
                    Case Study 0{idx + 1} // {p.category}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">2026</div>
                </div>
                <h3 className="serif-display text-2xl font-light italic text-slate-800 mt-2 leading-tight">{p.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[9px] bg-slate-100 text-slate-600 font-mono uppercase px-2 py-0.5 border border-slate-200/50">
                      {tech}
                    </span>
                  ))}
                  {p.techStack.length > 3 && (
                    <span className="text-[9px] text-slate-400 font-mono self-center">+{p.techStack.length - 3}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Project detail container */}
        <div id="project-detail" className="lg:col-span-8 bg-white border border-slate-200 rounded-none p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-5">
              <span className="mono-code text-[10px] uppercase text-sky-600 font-bold">Core Investigation Module</span>
              <h2 className="serif-display text-4xl italic text-slate-900 mt-1">{currentProject.title}</h2>
              <div className="flex flex-wrap gap-1.5 mt-4 items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-2">TECH STACK:</span>
                {currentProject.techStack.map((tech, i) => (
                  <span key={i} className="text-[9px] bg-slate-100 text-slate-600 font-mono uppercase px-2.5 py-1 border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive sub-tabs - Sharp artistic style */}
            <div className="flex border-b border-slate-200">
              <button
                id="tab-btn-motivation"
                onClick={() => setDetailTab("motivation")}
                className={`text-xs font-bold uppercase tracking-widest pb-3 mr-6 transition-all duration-150 border-b-2 cursor-pointer ${
                  detailTab === "motivation" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-800"
                }`}
              >
                Clinical Rationale
              </button>
              <button
                id="tab-btn-specs"
                onClick={() => setDetailTab("specs")}
                className={`text-xs font-bold uppercase tracking-widest pb-3 mr-6 transition-all duration-150 border-b-2 cursor-pointer ${
                  detailTab === "specs" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-800"
                }`}
              >
                System Architecture
              </button>
              <button
                id="tab-btn-snippet"
                onClick={() => setDetailTab("snippet")}
                className={`text-xs font-bold uppercase tracking-widest pb-3 transition-all duration-150 border-b-2 cursor-pointer ${
                  detailTab === "snippet" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-800"
                }`}
              >
                Inspection Code
              </button>
            </div>

            {/* Sub-tab view contents */}
            <div className="min-h-[220px]">
              {detailTab === "motivation" && (
                <div id="motivation-tab-content" className="space-y-6 animate-fade-in">
                  <div className="bg-sky-50/60 p-5 border border-sky-100">
                    <h4 className="text-[10px] font-mono text-sky-800 uppercase tracking-widest flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 mr-2 flex-shrink-0" />
                      Patient & Caregiver Impact
                    </h4>
                    <p className="text-sm text-slate-700 mt-2 leading-relaxed font-sans">
                      {currentProject.clinicalImpact}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">General Description</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {currentProject.description}
                    </p>
                  </div>
                </div>
              )}

              {detailTab === "specs" && (
                <div id="specs-tab-content" className="space-y-6 animate-fade-in">
                  <div className="bg-slate-50 p-5 border border-slate-200">
                    <h4 className="text-[10px] font-mono text-slate-700 uppercase tracking-widest flex items-center space-x-1">
                      <Laptop className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                      Runtime Architecture
                    </h4>
                    <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                      {currentProject.architecture}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Compliance Controls</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">
                      Fully auditable ledger design matching absolute regulatory logic. Employs tokenized masking of demographic details at local levels so that raw names are never submitted into external streams.
                    </p>
                  </div>
                </div>
              )}

              {detailTab === "snippet" && (
                <div id="snippet-tab-content" className="animate-fade-in relative">
                  <div className="absolute top-2 right-2 text-[9px] text-sky-400 font-mono px-2 py-0.5 border border-sky-400/20 bg-slate-900 uppercase font-semibold">
                    TypeScript Source
                  </div>
                  <pre className="text-xs text-slate-300 bg-slate-950 p-5 rounded-none font-mono overflow-x-auto leading-relaxed max-h-[320px] scrollbar-thin">
                    <code>{currentProject.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-55 p-5">
            <div className="flex items-center space-x-2">
              <FileCode2 className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">HIPAA / HL7 AUDITED BLUEPRINT</span>
            </div>
            <span className="text-[10px] bg-sky-500/10 text-sky-700 border border-sky-500/20 font-mono font-bold px-3 py-1.5 uppercase tracking-widest">
              Ready for Integration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

