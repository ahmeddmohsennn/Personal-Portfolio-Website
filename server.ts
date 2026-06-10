import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parsers
  app.use(express.json());

  // Clinical Analyzer API Endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { clinicalNote } = req.body;
      if (!clinicalNote || typeof clinicalNote !== "string") {
        return res.status(400).json({ error: "clinicalNote is required as a string." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: "Gemini API key is not configured. Please register yours in the 'Settings > Secrets' panel as GEMINI_API_KEY to test the live analyzer sandbox."
        });
      }

      // Initialize Gemini AI client
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          demographics: {
            type: Type.OBJECT,
            properties: {
              estimatedAge: { type: Type.STRING, description: "Physician deduction of age or birth year (e.g., '45y/o' or 'Elderly')" },
              estimatedGender: { type: Type.STRING, description: "Physician deduction of gender (e.g., 'Male', 'Female', 'Non-binary')" }
            },
            required: ["estimatedAge", "estimatedGender"]
          },
          vitalSigns: {
            type: Type.ARRAY,
            description: "List of extracted clinical vitals (e.g., BP, HR, Temp, SpO2)",
            items: {
              type: Type.OBJECT,
              properties: {
                vital: { type: Type.STRING, description: "Name of the vital sign (e.g., 'Blood Pressure')" },
                value: { type: Type.STRING, description: "Value with standard medical units (e.g., '136/88 mmHg')" },
                status: { type: Type.STRING, description: "Status: must be one of: 'Normal', 'Elevated', 'Critical', 'Unknown'" }
              },
              required: ["vital", "value", "status"]
            }
          },
          diagnoses: {
            type: Type.ARRAY,
            description: "Deducted clinical diagnoses with estimated standard ICD-10 code and confidence level",
            items: {
              type: Type.OBJECT,
              properties: {
                condition: { type: Type.STRING, description: "Full diagnostic title (e.g., 'Type 2 Diabetes Mellitus')" },
                icd10Code: { type: Type.STRING, description: "Most accurate standard ICD-10-CM alphanumeric code (e.g., 'E11.9')" },
                confidence: { type: Type.STRING, description: "Confidence criteria from 'High', 'Medium', 'Review Required'" }
              },
              required: ["condition", "icd10Code", "confidence"]
            }
          },
          prescriptions: {
            type: Type.ARRAY,
            description: "Pharmacological modifications extracted or recommended directly from the note",
            items: {
              type: Type.OBJECT,
              properties: {
                medication: { type: Type.STRING, description: "Drug name, active ingredient or therapy name (e.g., 'Metformin')" },
                dosage: { type: Type.STRING, description: "Therapeutic dose (e.g., '500mg')" },
                frequency: { type: Type.STRING, description: "Dosage intervals/instructions (e.g., 'twice daily with meals')" },
                rationale: { type: Type.STRING, description: "Physiological/pharmacological justification (e.g., 'Glycemic index regulation')" }
              },
              required: ["medication", "dosage", "frequency", "rationale"]
            }
          },
          criticalFlags: {
            type: Type.ARRAY,
            description: "Synthesized clinical safety concerns, adverse interactions, urgent red-flags or allergy alerts",
            items: { type: Type.STRING }
          },
          patientSummary: {
            type: Type.STRING,
            description: "A highly compassionate, simple, layperson-friendly synthesis of the clinical results and next instructions."
          },
          fhirPayloadSnippet: {
            type: Type.STRING,
            description: "A valid minified JSON representation of an HL7 FHIR Broad Resource (such as Bundle or Observation) capturing this clinical state as clean code."
          }
        },
        required: [
          "demographics",
          "vitalSigns",
          "diagnoses",
          "prescriptions",
          "criticalFlags",
          "patientSummary",
          "fhirPayloadSnippet"
        ]
      };

      const systemInstruction = 
        "You are an elite Clinical NLP Architecture Engine, operating as a co-pilot for a Physician Software Engineer. " +
        "Analyze the provided clinical intake narrative, SOAP note, or patient progress summary meticulously. " +
        "Extract raw information, structure clinical vitals, formulate appropriate ICD-10 codes based on medical knowledge, " +
        "transcribe pharmacology instructions, identify red-flags (criticalFlags), design a FHIR JSON structure representational payload, " +
        "and draft a compassionate patient summary. Render the results strictly complying to the requested JSON responseSchema.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Analyze the following clinical document:\n\n${clinicalNote}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.2
        }
      });

      const text = response.text || "{}";
      const parsedData = JSON.parse(text.trim());

      return res.json({ result: parsedData });
    } catch (error: any) {
      console.error("Clinical Analyzer Error: ", error);
      return res.status(500).json({
        error: "Failed to process clinical analysis.",
        details: error.message || String(error)
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Hot module reloading and bundler integration via Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Physician-Coder Portfolio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
