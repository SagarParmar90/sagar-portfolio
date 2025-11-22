import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Project, Experience } from '../types';
import { PROFILE, EXPERIENCES, SKILLS } from '../constants';

// Initialize Gemini API
// NOTE: In a real production app, requests should go through a backend proxy to hide the API key.
// For this client-side demo as per instructions, we access process.env.API_KEY.
const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const isGeminiConfigured = (): boolean => {
  return !!ai;
};

export const generateProjectDescription = async (project: Project): Promise<string> => {
  if (!ai) return "Gemini API Key not configured. Please add API_KEY to your environment.";

  try {
    const prompt = `
      You are a professional copywriter for a creative portfolio.
      Write a compelling, YouTube-description style summary for the following project.
      
      Project Title: ${project.title}
      Key Skills Used: ${project.skills.join(', ')}
      Tags: ${project.tags.join(', ')}
      Original Description: ${project.description}
      
      Tone: Professional, exciting, creator-focused. Use emojis sparingly.
      Max length: 150 words.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate description using AI. Please check console for details.";
  }
};

export const createChatSession = (projectContext?: Project) => {
  if (!ai) return null;

  const contextData = projectContext 
    ? `Current Project Context: ${projectContext.title}. Description: ${projectContext.description}`
    : "User is viewing the main portfolio page.";

  const systemInstruction = `
    You are an AI Assistant representing Sagar Parmar on his portfolio website.
    
    Sagar's Profile:
    - Role: ${PROFILE.role}
    - Bio: ${PROFILE.bio}
    - Location: ${PROFILE.location}
    - Top Skills: ${SKILLS.join(', ')}
    
    Experience Highlights:
    ${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period})`).join('\n')}
    
    Your Goal:
    Answer questions about Sagar's skills, experience, and the specific project being viewed.
    Be helpful, professional, but casual like a YouTube creator.
    If asked about contact info, direct them to: ${PROFILE.email}.
    
    ${contextData}
  `;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
};
