
import { GoogleGenAI, Type } from "@google/genai";
import { Course } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCourseOutline = async (topic: string, audience: string): Promise<Partial<Course> | null> => {
  if (!apiKey) {
    console.warn("API Key is missing. AI features disabled.");
    return null;
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `Crie uma estrutura de curso online sobre "${topic}" focado em "${audience}".
    O curso deve ter um título cativante, uma descrição curta e 2 módulos, cada um com 2 aulas.
    Para cada aula, forneça um título, uma duração estimada (ex: "10 min") e um breve conteúdo em markdown.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  lessons: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        duration: { type: Type.STRING, description: "Estimated duration string e.g. '15 min'" },
                        content: { type: Type.STRING, description: "Educational content in markdown format" }
                      },
                      required: ["title", "duration", "content"]
                    }
                  }
                },
                required: ["title", "lessons"]
              }
            }
          },
          required: ["title", "description", "modules"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      // Transform to match our internal ID structure
      const courseData: Partial<Course> = {
        title: data.title,
        description: data.description,
        price: 0,
        thumbnail: `https://picsum.photos/seed/${encodeURIComponent(topic)}/800/600`,
        modules: data.modules.map((mod: any, idx: number) => ({
          id: `mod-${Date.now()}-${idx}`,
          title: mod.title,
          lessons: mod.lessons.map((les: any, lIdx: number) => ({
            id: `les-${Date.now()}-${idx}-${lIdx}`,
            title: les.title,
            duration: les.duration,
            content: les.content,
            releaseDate: undefined // Available immediately by default
          }))
        }))
      };
      return courseData;
    }
    return null;
  } catch (error) {
    console.error("Error generating course:", error);
    throw error;
  }
};
