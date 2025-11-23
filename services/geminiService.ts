import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ThreatLevel } from "../types";

// In a real production scenario, this would call your Java Spring Boot API.
// For this frontend demo, we are using Gemini to simulate the "Brain" of SafeNet.

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: [ThreatLevel.SAFE, ThreatLevel.SUSPICIOUS, ThreatLevel.PHISHING],
      description: "The classification of the URL."
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score between 0 and 100."
    },
    threatLevelLabel: {
      type: Type.STRING,
      description: "Human readable threat level (Low, Medium, High, Critical)."
    },
    reasons: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of technical reasons for the classification (e.g., lexical analysis, typosquatting)."
    },
    ipAddress: {
      type: Type.STRING,
      description: "Simulated resolved IP address of the host."
    },
    serverLocation: {
      type: Type.STRING,
      description: "Simulated geographic location of the server."
    }
  },
  required: ["status", "confidence", "threatLevelLabel", "reasons"]
};

export const scanUrl = async (url: string): Promise<AnalysisResult> => {
  try {
    const prompt = `Analyze this URL: ${url}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.1,
        systemInstruction: `
        You are the AI engine for SafeNet, a cybersecurity ecosystem. 
        Your job is to analyze URLs for phishing characteristics based on lexical features and host-based heuristics.
        
        Analyze the provided URL for:
        1. URL Length and depth.
        2. Presence of suspicious characters (@, -, multiple dots).
        3. Typosquatting (imitating popular brands).
        4. TLD reputation.
        
        If the URL looks like a legitimate major brand (google.com, amazon.com), mark it SAFE.
        If it looks random or malicious (e.g., secure-login-bank-update.xyz), mark it PHISHING.
        
        Simulate an IP address and Server Location for the report.
      `
      }
    });

    const text = result.text;
    
    if (!text) {
        throw new Error("No response from AI");
    }

    const data = JSON.parse(text);

    return {
      url,
      status: data.status as ThreatLevel,
      confidence: data.confidence,
      threatLevelLabel: data.threatLevelLabel,
      reasons: data.reasons,
      timestamp: new Date().toISOString(),
      ipAddress: data.ipAddress || "192.168.1.1", // Fallback
      serverLocation: data.serverLocation || "Unknown" // Fallback
    };

  } catch (error) {
    console.error("Scan failed:", error);
    return {
      url,
      status: ThreatLevel.UNKNOWN,
      confidence: 0,
      threatLevelLabel: "Unknown",
      reasons: ["System error or timeout during scan."],
      timestamp: new Date().toISOString()
    };
  }
};

export const chatWithAssistant = async (message: string): Promise<string> => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: `You are 'SafeNet AI', a specialized cybersecurity assistant inside a Phishing Detection Dashboard. 
        Keep answers concise, professional, and helpful. 
        If asked about the app, explain that you scan URLs for threats using Machine Learning.
        Do not answer questions unrelated to security, technology, or the app functions.`
      }
    });
    return result.text || "I apologize, I couldn't process that request.";
  } catch (error) {
    console.error("Chat error:", error);
    return "System connection error. Please try again later.";
  }
};
