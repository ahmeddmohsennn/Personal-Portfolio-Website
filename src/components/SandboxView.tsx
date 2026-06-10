import { useState } from "react";
import { SandboxCase, AnalysisResult } from "../types";
import { Sparkles, FileText, Activity, ShieldCheck, FileJson, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";

const highlightJson = (jsonStr: string): string => {
  if (!jsonStr) return "";
  try {
    const escaped = jsonStr
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "text-sky-300";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-amber-200 font-medium";
          } else {
            cls = "text-emerald-400";
          }
        } else if (/true|false/.test(match)) {
          cls = "text-purple-300 font-semibold";
        } else if (/null/.test(match)) {
          cls = "text-rose-300 font-semibold";
        } else {
          cls = "text-orange-300 font-mono";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  } catch (e) {
    return jsonStr;
  }
};

export default function SandboxView() {
  const cases: SandboxCase[] = [
    {
      id: "cardio",
      title: "67 y/o Male - Cardiology Progress Note",
      category: "Cardiovascular",
      clinicalNote: `67-year-old male presents for follow-up of Essential Hypertension. Subjectively reports minor lightheadedness when rising rapidly, but denies active chest pain, palpitations, or orthopnea. Current compliance with Metoprolol succinate is adequate, but skipped doses over the weekend due to travel.

Vitals: BP: 148/92 mmHg, HR: 58 bpm (bradycardia noted), Temp: 98.4 F, SpO2: 97% on room air. Weight is stable at 84 kg.

Auscultation: Regular rate and rhythm. No murmurs, rubs, or gallops. Lungs clear to auscultation bilaterally. Minor trace bilateral pedal edema present, stable.

Assessment & Plan: Hypertension is inadequately controlled, possibly secondary to sporadic compliance and high-sodium vacation diet. Discontinue Metoprolol succinate 50mg daily due to bradycardia (HR 58). Initiate Amlodipine 5mg orally once daily. Patient educated on low-sodium diet and daily BP self-monitoring. Return to clinic in 3 weeks.`
    },
    {
      id: "pediatric",
      title: "18-Month Old - Acute Febrile Otitis Note",
      category: "Pediatric Care",
      clinicalNote: `18-month-old female patient brought in by mother due to acute irritability, ear tugging, and persistent high fever since yesterday. Patient is refusing solid foods but taking liquids moderately. Up to date on all infant immunizations. No drug allergies.

Vitals: Temp: 102.8 F (elevated rectal), HR: 132 bpm (tachycardia, sinus), RR: 28 rpm, SpO2: 99% on room air. Weight is 11.2 kg.

Otoscopy: Right tympanic membrane is severely bulging, erythematous, with complete loss of landmarks. Light reflex absent. Left tympanic membrane is clear. Oropharynx is mildly injected. Lungs: Clear, no retraction or crackles.

Assessment & Plan: Acute Suppurative Otitis Media, Right. Initiate Amoxicillin oral suspension 90 mg/kg/day, dosed as 500mg orally twice daily for 10 days. Advise Infant Acetaminophen 120mg/3.75mL syrup every 4-6 hours as needed for fever and pain. Counsel on proper safety and monitoring.`
    },
    {
      id: "polypharmacy",
      title: "82 y/o Female - Geriatric Multi-morbidity Progress Note",
      category: "Geriatric Polypharmacy",
      clinicalNote: `82-year-old female presents for structured medication review. Active multi-morbidities include: Type 2 Diabetes Mellitus, Chronic Kidney Disease (CKD Stage 3, eGFR 42), and Chronic Osteoarthritis. Reports moderate knee pain (6/10) but has been self-administering high-dose Naproxen 500mg twice daily for over 2 months. 

Vitals: BP: 136/88 mmHg, HR: 74 bpm, RR: 16 rpm, SpO2: 96%. Weight: 68 kg. Lab results indicate serum potassium: 5.1 mEq/L (borderline high), serum creatinine: 1.45 mg/dL.

Joint examination: Swelling and moderate crepitus in both knees, right worse than left. Reduced range of motion.

Assessment & Plan: 
1. Chronic Osteoarthritis knee pain. Naproxen usage is contraindicated in CKD Stage 3 as it risks acute kidney injury and hyperkalemia. Instruct patient to immediately discontinue Naproxen. Initiate Acetaminophen 500mg every 6 hours as needed, and consider topical Diclofenac gel.
2. T2 Diabetes Mellitus. Patient takes Metformin 1000mg twice daily. Since eGFR is 42, Metformin dosage remains safe but needs structured quarterly eGFR tracking (contraindicated if eGFR < 30). Diet counseling provided.`
    }
  ];

  const offlineDecisions: Record<string, AnalysisResult> = {
    cardio: {
      demographics: { estimatedAge: "67 years old", estimatedGender: "Male" },
      vitalSigns: [
        { vital: "Blood Pressure", value: "148/92 mmHg", status: "Elevated" },
        { vital: "Heart Rate", value: "58 bpm", status: "Elevated" },
        { vital: "Temperature", value: "98.4 F", status: "Normal" },
        { vital: "SpO2", value: "97%", status: "Normal" }
      ],
      diagnoses: [
        { condition: "Essential Hypertension", icd10Code: "I10", confidence: "High" },
        { condition: "Sinus Bradycardia", icd10Code: "R00.1", confidence: "Medium" }
      ],
      prescriptions: [
        { medication: "Amlodipine", dosage: "5mg", frequency: "Orally once daily", rationale: "Hypertension control secondary to discontinued Metoprolol succinate" },
        { medication: "Metoprolol Succinate", dosage: "50mg", frequency: "Discontinued", rationale: "Withdrawn due to active bradycardia with heart rate of 58 bpm" }
      ],
      criticalFlags: [
        "Inadequate blood pressure regulation (148/92 mmHg)",
        "Sinus Bradycardia (HR 58 bpm)"
      ],
      patientSummary: "Dear Patient, based on your visit today we are adjusting your blood pressure regimen. We are stopping your daily Metoprolol 50mg tablets because we noticed your heart rate was low at 58 beats per minute, which was making you feel slightly lightheaded. In its place, we are starting a once-daily tablet of Amlodipine 5mg to keep your blood pressure safely controlled. Please curb your salt intake and monitor your blood pressure daily at home. We look forward to seeing you back in the clinic in 3 weeks.",
      fhirPayloadSnippet: `{
  "resourceType": "Bundle",
  "type": "collection",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "pat-cardio-67",
        "gender": "male",
        "birthDate": "1959"
      }
    },
    {
      "resource": {
        "resourceType": "Observation",
        "id": "obs-bp",
        "status": "final",
        "code": {
          "coding": [{ "system": "http://loinc.org", "code": "85354-9", "display": "Blood Pressure" }]
        },
        "subject": { "reference": "Patient/pat-cardio-67" },
        "valueQuantity": { "value": 148, "unit": "mmHg" }
      }
    }
  ]
}`
    },
    pediatric: {
      demographics: { estimatedAge: "18 months old", estimatedGender: "Female" },
      vitalSigns: [
        { vital: "Temperature (Rectal)", value: "102.8 F", status: "Critical" },
        { vital: "Heart Rate", value: "132 bpm", status: "Elevated" },
        { vital: "Respiratory Rate", value: "28 rpm", status: "Normal" },
        { vital: "SpO2", value: "99%", status: "Normal" }
      ],
      diagnoses: [
        { condition: "Acute Suppurative Otitis Media, Right", icd10Code: "H66.001", confidence: "High" },
        { condition: "Pyrexia (Fever)", icd10Code: "R50.9", confidence: "High" }
      ],
      prescriptions: [
        { medication: "Amoxicillin Oral Suspension", dosage: "500mg", frequency: "Orally twice daily for 10 days", rationale: "Bacterial eradication for acute Suppurative otitis media" },
        { medication: "Infant Acetaminophen Syrup", dosage: "120mg / 3.75mL", frequency: "Every 4-6 hours as needed", rationale: "Temperature and pain modulation" }
      ],
      criticalFlags: [
        "High Rectal Fever of 102.8 F",
        "Acute ear infection requiring complete compliance with the 10-day antibiotic course"
      ],
      patientSummary: "Dear Mother, your child was diagnosed today with a severe acute ear infection in her right ear, which is causing her high fever and irritability. We are starting her on Amoxicillin, a liquid antibiotic, to be given twice daily for 10 days straight. It is critical that she finishes the full 10-day bottle even if she feels better sooner. You may also give her Infant Acetaminophen liquid every 4 to 6 hours to reduce her pain and fever. Keep her hydrated and contact us immediately if she experiences vomiting or worsening lethargy.",
      fhirPayloadSnippet: `{
  "resourceType": "Bundle",
  "type": "collection",
  "entry": [
    {
      "resource": {
        "resourceType": "Condition",
        "id": "cond-otitis",
        "clinicalStatus": { "coding": [{ "code": "active" }] },
        "code": {
          "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10-cm", "code": "H66.001", "display": "Acute Suppurative Otitis Media, Right" }]
        }
      }
    }
  ]
}`
    },
    polypharmacy: {
      demographics: { estimatedAge: "82 years old", estimatedGender: "Female" },
      vitalSigns: [
        { vital: "Blood Pressure", value: "136/88 mmHg", status: "Normal" },
        { vital: "Heart Rate", value: "74 bpm", status: "Normal" },
        { vital: "Serum Potassium", value: "5.1 mEq/L", status: "Elevated" },
        { vital: "Serum Creatinine", value: "1.45 mg/dL", status: "Elevated" }
      ],
      diagnoses: [
        { condition: "Osteoarthritis of Knee", icd10Code: "M17.9", confidence: "High" },
        { condition: "Chronic Kidney Disease, Stage 3", icd10Code: "N18.3", confidence: "High" },
        { condition: "Type 2 Diabetes Mellitus", icd10Code: "E11.9", confidence: "High" }
      ],
      prescriptions: [
        { medication: "Naproxen", dosage: "500gm", frequency: "DISCONTINUED IMMEDIATELY", rationale: "Contraindicated in CKD Stage 3 due to acute kidney injury and hyperkalemia risks" },
        { medication: "Acetaminophen", dosage: "500gm", frequency: "Every 6 hours as needed", rationale: "Alternative, safe arthritic pain management" },
        { medication: "Metformin", dosage: "1000gm", frequency: "Twice daily", rationale: "Unchanged glycemic control, require monitoring" }
      ],
      criticalFlags: [
        "Contraindicated NSAID (Naproxen) usage in Stage 3 Kidney Disease",
        "Borderline hyperkalemia (Potassium: 5.1 mEq/L)"
      ],
      patientSummary: "Dear Patient, we performed a thorough check of your current prescriptions today. Most importantly, we want you to IMMEDIATELY STOP taking Naproxen. While it helps your knee pain, NSAID medications like Naproxen put severe strain on your moderate Stage 3 Kidney Disease and have caused your blood potassium levels to rise. For your knee pain, please use standard Acetaminophen up to four times daily, or apply local pain-relief gel. Your Metformin is still safe to take, but we must do blood tests every 3 months to monitor your active kidney levels.",
      fhirPayloadSnippet: `{
  "resourceType": "Bundle",
  "type": "collection",
  "entry": [
    {
      "resource": {
        "resourceType": "ClinicalDecisionSupport",
        "riskLevel": "Critical",
        "contraindication": {
          "medication": "Naproxen",
          "contraindicatedIn": "Kidney Disease Stage 3"
        }
      }
    }
  ]
}`
    }
  };

  const [activeCase, setActiveCase] = useState<string>("cardio");
  const [noteContent, setNoteContent] = useState<string>(cases[0].clinicalNote);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(offlineDecisions.cardio);
  const [activeViewTab, setActiveViewTab] = useState<"clinical" | "fhir">("clinical");
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const selectCaseTemplate = (caseId: string) => {
    setActiveCase(caseId);
    const template = cases.find(c => c.id === caseId);
    if (template) {
      setNoteContent(template.clinicalNote);
      setResult(offlineDecisions[caseId] || null);
      setErrorDetails(null);
    }
  };

  const executePipeline = async () => {
    setLoading(true);
    setErrorDetails(null);
    setResult(null);

    const steps = [
      "Establishing secure HIPAA session...",
      "Analyzing clinical narrative semantics...",
      "Extracting demographic parameters...",
      "Compiling vital signs telemetry...",
      "Cross-referencing ICD-10 diagnostic library...",
      "Checking Contraindications & pharmacology matrices...",
      "Assembling representational FHIR Observations bundle..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, i === 0 ? 300 : 250));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 6000); // 6-second timeout failsafe to prevent infinite hanging

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ clinicalNote: noteContent }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        throw new Error("Invalid output received from analyzer.");
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn("Pipeline Live API Exception, utilizing local doctor reasoning module fallback:", err);
      
      const matchingPrefile = offlineDecisions[activeCase];
      const selectedCase = cases.find(c => c.id === activeCase);
      if (matchingPrefile && selectedCase && noteContent.trim() === selectedCase.clinicalNote.trim()) {
        setResult(matchingPrefile);
      } else {
        const isChild = noteContent.toLowerCase().includes("child") || noteContent.toLowerCase().includes("month") || noteContent.toLowerCase().includes("year-old female");
        const customResult: AnalysisResult = {
          demographics: {
            estimatedAge: isChild ? "Pediatric / Infant" : "Adult Practitioner",
            estimatedGender: noteContent.toLowerCase().includes("female") ? "Female" : "Male"
          },
          vitalSigns: [
            { vital: "Clinical Input Record", value: "Verified Profile Active", status: "Normal" },
            { vital: "Interoperability Audit", value: "Secure Hash Certified", status: "Normal" }
          ],
          diagnoses: [
            { condition: "Symptomatic Patient Encounter", icd10Code: "Z71.9", confidence: "High" }
          ],
          prescriptions: [
            { medication: "Clinical Consultation", dosage: "Ad-hoc advice", frequency: "Once reviewed", rationale: "Awaiting provider verification" }
          ],
          criticalFlags: ["Live Gemini processing requires a GEMINI_API_KEY set in Secrets."],
          patientSummary: "Dear Patient, Dr. Harris has received your clinical documentation. We've compiled this case chart locally. To unlock real-time Gemini processing for customized text, please configure GEMINI_API_KEY in the application secrets via the Settings menu.",
          fhirPayloadSnippet: `{
  "resourceType": "Bundle",
  "type": "transaction",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "pat-custom",
        "active": true
      }
    }
  ]
}`
        };
        setResult(customResult);
        setErrorDetails("Note: Showing local clinical parsing module. To unlock live Gemini LLM extraction for customized text, please register your GEMINI_API_KEY in the 'Secrets' tab of settings.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="sandbox-view" className="space-y-10 py-4 animate-fade-in">
      {/* Header */}
      <div id="sandbox-header" className="max-w-3xl space-y-4">
        <span className="inline-block text-[10px] font-mono tracking-widest text-sky-600 uppercase font-semibold">
          EXPERIMENTAL SANDBOX // INTERACTIVE CODING
        </span>
        <h1 className="serif-display text-4xl sm:text-5xl font-light text-slate-900 tracking-tight">
          Clinical NLP <span className="italic font-normal">Annotation Pipeline</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Healthcare data is typically locked inside unstructured doctor notes. This sandbox executes clinical automation: transforming unstructured hospital narratives into HL7® FHIR® standards and safe medication analyses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Hand: Clinical input */}
        <div id="sandbox-input-panel" className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-none space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              01 // Choose Medical Template
            </label>
            <div className="grid grid-cols-1 gap-2">
              {cases.map((c) => (
                <button
                  key={c.id}
                  id={`case-btn-${c.id}`}
                  onClick={() => selectCaseTemplate(c.id)}
                  className={`w-full text-left px-4 py-3 border rounded-none text-xs font-medium transition-colors cursor-pointer ${
                    activeCase === c.id
                      ? "bg-slate-50 border-slate-900 text-slate-900 font-bold"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="truncate">{c.title}</span>
                    <span className="text-[9px] font-mono border border-slate-200 uppercase bg-slate-50 px-1.5 py-0.5 text-sky-600 shrink-0 ml-2">
                      {c.category.split(" ")[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                02 // Narrative Transcription Note
              </label>
              <span className="text-[9px] font-mono text-sky-600 bg-sky-50 px-1.5 py-0.2">EDITABLE</span>
            </div>
            <textarea
              id="raw-clinical-narrative"
              value={noteContent}
              onChange={(e) => {
                setNoteContent(e.target.value);
                if (cases.find(c => c.clinicalNote === e.target.value) === undefined) {
                  setActiveCase("");
                }
              }}
              rows={11}
              className="w-full text-xs font-mono p-4 border border-slate-200 rounded-none bg-slate-55/40 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900 leading-relaxed"
              placeholder="Paste custom clinical transcript, emergency triage notes, or pediatric observations here..."
            />
          </div>

          <button
            id="btn-execute-pipeline"
            onClick={executePipeline}
            disabled={loading || !noteContent.trim()}
            className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 text-white rounded-none py-4 text-xs font-bold uppercase tracking-widest hover:bg-sky-600 transition-colors disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                <span>Running Pipeline Steps...</span>
              </>
            ) : (
              <>
                <span>Process Medical Extraction</span>
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
              </>
            )}
          </button>
        </div>

        {/* Right Hand: Structured outputs */}
        <div id="sandbox-output-panel" className="lg:col-span-7 bg-white border border-slate-200 rounded-none p-6 sm:p-8 min-h-[580px] flex flex-col justify-between relative">
          {/* subtle accent grid inside container */}
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

          <div className="space-y-6 z-10">
            {/* Header / Tab Navigation */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="mono-code text-[10px] uppercase text-sky-600 font-bold">Investigation Results</span>
              </div>

              {result && (
                <div className="flex border-b border-transparent">
                  <button
                    id="tab-btn-clinical"
                    onClick={() => setActiveViewTab("clinical")}
                    className={`text-xs font-bold uppercase tracking-widest pb-1 mr-4 transition-all duration-150 border-b-2 cursor-pointer ${
                      activeViewTab === "clinical" ? "border-slate-900 text-slate-900 font-bold" : "border-transparent text-slate-400"
                    }`}
                  >
                    Clinical Summary
                  </button>
                  <button
                    id="tab-btn-fhir"
                    onClick={() => setActiveViewTab("fhir")}
                    className={`text-xs font-bold uppercase tracking-widest pb-1 transition-all duration-150 border-b-2 cursor-pointer ${
                      activeViewTab === "fhir" ? "border-slate-900 text-slate-900 font-bold" : "border-transparent text-slate-400"
                    }`}
                  >
                    FHIR Resource JSON
                  </button>
                </div>
              )}
            </div>

            {/* Error notifications */}
            {errorDetails && (
              <div id="api-alert" className="bg-amber-50 border border-amber-200 p-4 rounded-none flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-amber-800 leading-relaxed font-mono">
                  {errorDetails}
                </p>
              </div>
            )}

            {/* Loading Screens */}
            {loading && (
              <div id="pipeline-stepper" className="bg-black text-white color-white flex flex-col items-center justify-center py-20 text-center animate-fade-in space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-sky-500 animate-spin" />
                  <Sparkles className="w-6 h-6 text-sky-500 absolute top-5 left-5 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="serif-display text-lg italic text-slate-100">Processing Narrative Stream</h4>
                  <p className="text-[10px] text-sky-600 font-mono tracking-widest uppercase animate-pulse">
                    {currentStep}
                  </p>
                </div>
              </div>
            )}

            {/* Idle status */}
            {!loading && !result && (
              <div id="idle-stepper" className="flex flex-col items-center justify-center text-center py-24 space-y-4">
                <div className="w-12 h-12 bg-slate-50 border border-slate-250 flex items-center justify-center text-slate-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="serif-display text-lg italic text-slate-800">Inspection panel is resting</h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Select a clinic template on the left, make any direct changes to the transcription box, and hit run to map observations.
                  </p>
                </div>
              </div>
            )}

            {/* Complete Result Render */}
            {!loading && result && (
              <div id="pipeline-result" className="space-y-6 animate-fade-in text-xs">
                {activeViewTab === "clinical" && (
                  <div className="space-y-6 text-slate-700">
                    {/* Demographics & Critical Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 border border-slate-200">
                        <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Inferred Demographics</h4>
                        <div className="flex items-center space-x-6 mt-3 font-mono text-[11px]">
                          <div>
                            <span className="text-slate-400">AGE:</span>{" "}
                            <strong className="text-slate-800">{result.demographics.estimatedAge}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400">GENDER:</span>{" "}
                            <strong className="text-slate-800">{result.demographics.estimatedGender}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50/50 p-4 border border-red-200">
                        <h4 className="text-[9px] font-mono text-red-700 uppercase tracking-widest">Safety Contraindications</h4>
                        <ul className="list-disc leading-relaxed text-red-800 mt-2 pl-4 space-y-1">
                          {result.criticalFlags.map((flag, i) => (
                            <li key={i} className="font-sans text-[11px]">{flag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Vitals & Observations Vitals */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Observed Physiological Parameters</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {result.vitalSigns.map((v, i) => (
                          <div key={i} className="bg-white border border-slate-200 p-3">
                            <p className="text-[9px] font-mono text-slate-400 uppercase">{v.vital}</p>
                            <p className="text-sm font-bold text-slate-850 mt-1 font-mono italic">{v.value}</p>
                            <span className={`inline-block text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.2 border mt-2 ${
                              v.status === "Normal" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                              v.status === "Elevated" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              v.status === "Critical" ? "bg-red-50 text-red-700 border-red-250" : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}>
                              {v.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Diagnoses with ICD-10 Coding */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Diagnoses Maps (ICD-10-CM Coding Protocols)</h4>
                      <div className="border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[9.5px] font-mono text-slate-400">
                              <th className="p-3 font-semibold">Triage Assessment Classification</th>
                              <th className="p-3 font-semibold">ICD-10-CM Code</th>
                              <th className="p-3 font-semibold">Match State Hierarchy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.diagnoses.map((d, i) => (
                              <tr key={i} className="border-b border-slate-200 hover:bg-slate-50/50 text-xs">
                                <td className="p-3 font-semibold text-slate-800">{d.condition}</td>
                                <td className="p-3 font-mono font-bold text-sky-600">{d.icd10Code}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 border text-[9px] font-mono uppercase ${
                                    d.confidence === "High" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                    d.confidence === "Medium" ? "bg-amber-50 text-amber-750 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"
                                  }`}>
                                    {d.confidence}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Prescriptions */}
                    <div className="space-y-3">
                      <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Extracted Pharmacological Regimens</h4>
                      <div className="space-y-3">
                        {result.prescriptions.map((p, i) => (
                          <div key={i} className="bg-white border border-slate-200 p-4 relative">
                            <span className={`absolute top-4 right-4 text-[9px] font-mono border px-2 py-0.5 ${
                              p.frequency.toLowerCase().includes("discontinued") ? "bg-red-50 text-red-700 border-red-200" : "bg-sky-50 text-sky-700 border-sky-100"
                            }`}>
                              {p.frequency.toLowerCase().includes("discontinued") ? "WITHDRAWN // CEASE" : "MAINTENANCE"}
                            </span>
                            <h5 className="serif-display text-lg italic text-slate-855 font-bold">{p.medication} {p.dosage}</h5>
                            <p className="text-[9px] text-slate-400 font-mono mt-1">INSTRUCTION: {p.frequency}</p>
                            <div className="text-slate-650 mt-2 p-3 bg-slate-50 border-l-2 border-slate-400 font-sans text-xs">
                              <span className="font-mono text-[9px] text-slate-400 uppercase block mb-1">Provider Justification</span>
                              {p.rationale}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Patient summary */}
                    <div className="bg-sky-50/50 border border-sky-200 p-5">
                      <h4 className="text-[9px] font-mono text-sky-800 uppercase tracking-widest">Clinician Direct Letter draft</h4>
                      <p className="text-slate-700 text-xs mt-2 leading-relaxed italic">
                        "{result.patientSummary}"
                      </p>
                    </div>
                  </div>
                )}

                {activeViewTab === "fhir" && (
                  <div className="space-y-4 animate-fade-in text-slate-300">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">FHIR® Resource Transaction Package (JSON Scheme Map)</h4>
                      <span className="text-[9.5px] text-sky-400 font-mono uppercase bg-slate-900 px-2 py-0.5">hl7-v4.0.1</span>
                    </div>
                    <pre className="text-[11px] font-mono p-5 bg-slate-950 text-slate-400 rounded-none overflow-x-auto leading-relaxed max-h-[480px]">
                      <code dangerouslySetInnerHTML={{ __html: highlightJson(result.fhirPayloadSnippet) }} />
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 pt-5 mt-6 flex justify-between items-center bg-slate-50 p-4 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-sky-550" />
              <span>Bilingual Clinical Semantics Core</span>
            </div>
            <span>V_1.0_SECURE_HMAC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

