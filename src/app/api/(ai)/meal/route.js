import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    // Parse the request body to get the user's prompt
    const body = await request.json();
    const userPrompt = body.prompt;

    // Ensure there's a prompt provided
    if (!userPrompt) {
      return NextResponse.error({
        status: 400,
        statusText: "Bad Request: No prompt provided.",
      });
    }

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content based on the user's prompt
    const result = await model.generateContent(userPrompt);
    const response = result.response;
    const text = response.text();

    // console.log(text);

    return NextResponse.json({
      message: "AI generated text successfully",
      statusCode: 200,
      data: text,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
