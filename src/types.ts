export interface Project {
  id: string;
  title: string;
  category: "EMR" | "AI" | "HIPAA" | "Integration";
  description: string;
  clinicalImpact: string;
  techStack: string[];
  architecture: string;
  githubUrl?: string;
  liveUrl?: string;
  codeSnippet?: string;
}

export interface SandboxCase {
  id: string;
  title: string;
  category: string;
  clinicalNote: string;
}

export interface AnalysisResult {
  demographics: {
    estimatedAge: string;
    estimatedGender: string;
  };
  vitalSigns: Array<{
    vital: string;
    value: string;
    status: string;
  }>;
  diagnoses: Array<{
    condition: string;
    icd10Code: string;
    confidence: string;
  }>;
  prescriptions: Array<{
    medication: string;
    dosage: string;
    frequency: string;
    rationale: string;
  }>;
  criticalFlags: string[];
  patientSummary: string;
  fhirPayloadSnippet: string;
}

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}
