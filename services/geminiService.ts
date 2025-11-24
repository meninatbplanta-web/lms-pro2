
import { Course } from "../types";

const apiKey = process.env.API_KEY || '';

export const generateCourseOutline = async (topic: string, audience: string): Promise<Partial<Course> | null> => {
  if (!apiKey) {
    console.warn("API Key is missing. AI features disabled.");
    return null;
  }

  try {
    const model = "gemini-2.0-flash";
    const prompt = `Crie uma estrutura de curso online sobre "${topic}" focado em "${audience}".
    O curso deve ter um título cativante, uma descrição curta e 2 módulos, cada um com 2 aulas.
    Para cada aula, forneça um título, uma duração estimada (ex: "10 min") e um breve conteúdo em markdown.
    `;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            description: { type: "STRING" },
            modules: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  title: { type: "STRING" },
                  lessons: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        title: { type: "STRING" },
                        duration: { type: "STRING", description: "Estimated duration string e.g. '15 min'" },
                        content: { type: "STRING", description: "Educational content in markdown format" }
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
    } as const;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Failed to generate course outline", await response.text());
      return null;
    }

    const result = await response.json();
    const output = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (output) {
      const data = JSON.parse(output);
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
