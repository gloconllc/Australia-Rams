import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { TripData } from "../types";

// Helper to check for API key availability
const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateBudgetSummary = async (tripState: TripData) => {
  const ai = getAiClient();

  const prompt = `
    Given the current trip state JSON below, provide:
    1. Per-person total (flights + hotels + activities)
    2. Comparison to target ($3,000–3,500)
    3. Status: under-target / at-target / over-target
    4. One suggestion to get closer to target if over

    Answer in 2–3 sentences, plain English.

    Current trip state:
    ${JSON.stringify(tripState)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate the budget summary right now.";
  }
};

export const pivotDayPlan = async (
  tripState: TripData,
  dayId: string,
  reason: string,
  budgetRemaining: number
) => {
  const ai = getAiClient();
  const day = tripState.itinerary.find((d) => d.id === dayId);
  const dayItems = day?.linkedItems.map(itemId => {
    // Find item across all categories
    return (
        tripState.items.flights.find(f => f.id === itemId) ||
        tripState.items.hotels.find(h => h.id === itemId) ||
        tripState.items.activities.find(a => a.id === itemId)
    );
  });

  const prompt = `
    The group is currently on Day ${day?.dayNumber} in ${day?.city} on ${day?.date}.

    Current plan for this day:
    ${JSON.stringify(day)}
    Linked Items Details:
    ${JSON.stringify(dayItems)}

    Change reason: ${reason}

    Budget remaining for optional activities: $${budgetRemaining} per person.

    Suggest 2 alternative plans for this day that:
    - Keep any booked items fixed
    - Match the reason for change
    - Stay within budget
    - Are in the same city

    Format as:
    **Alternative 1:** [brief description]
    **Alternative 2:** [brief description]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate alternatives right now.";
  }
};

export const askGeneralQuestion = async (tripState: TripData, question: string) => {
    const ai = getAiClient();
    const prompt = `
    Current trip state:
    ${JSON.stringify(tripState)}

    User question: "${question}"

    Answer clearly in 2–4 sentences. Reference the data in the trip state. If the question involves costs, show per-person amounts.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I'm having trouble connecting to the travel database.";
    }
}
