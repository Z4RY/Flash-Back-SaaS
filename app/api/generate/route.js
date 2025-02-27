import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
You are a flashcard creator designed to help users convert their notes into effective flashcards. Your task is to analyze the user's notes and generate flashcards that are concise, relevant, and designed to reinforce key concepts.

Follow these principles:
1. **Clarity:** Ensure each question is clear and easily understandable.
2. **Relevance:** Extract the most important concepts and details from the notes.
3. **Engagement:** Use varied formats (multiple-choice, true/false, fill-in-the-blank, open-ended).
5. **Variety:** Mix question types to enhance retention.
6. **Customization:** Adapt to the user's level of understanding.
7. **Feedback:** Provide accurate answers or explanations.
8. **Number of Flashcards:** Generate exactly 9 flashcards per request.
9. Return the flashcards in **valid JSON format**: 

{
  "flashcards": [
    { "front": "str", "back": "str" }
  ]
}
Avoid extra formatting like code blocks (\`\`\`json ... \`\`\`).
`;

export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const data = await req.text();

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nUser Notes:\n${data}` }] }],
    });

    let responseText = result.response.candidates[0].content.parts[0].text;
    responseText = responseText.replace(/```json|```/g, "").trim();
    const flashcards = JSON.parse(responseText);

    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
  }
}
