import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const userEmail = body.userEmail;

    // Fetch user details from the database
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      return NextResponse.error({
        status: 404,
        statusText: "User not found",
      });
    }

    // Create a detailed prompt for the AI using user information
    const userPrompt = `You are a helpful fitness planning system.
Generate a markdown list containing the name of the exercise, description, target muscle groups,
recommended sets and reps, and any necessary equipment.(5-6 Exercises) Use links for exercises, fenced code blocks, 
and other appropriate markdown features(Do Not Use Tables)(Use horizontal line after every important Content).
Here are the user details for reference
:\n\n
    - Name: ${user?.name || "Not specified"}
    - Age: ${user?.age || "Not specified"}, 
    - Weight: ${user?.weight || "Not specified"}, 
    - Height: ${user?.height || "Not specified"}, 
    - Fitness Goal: ${user?.fitnessGoal || "Not specified"}, 
    - Activity Level: ${user?.intensityLevel || "Not specified"}, 
    - Exercise Type: ${user?.ExerciseType || "Not specified"}, 
    - Health Conditions: ${user?.healthConditions || "None"}, 
    - Gender: ${user?.gender || "Not specified"},
    - Region: ${user?.region || "Not specified"}.\n\n
    `;

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content based on the user's prompt
    const result = await model.generateContent(userPrompt);
    const response = await result.response.text();

    return NextResponse.json({
      message: "AI generated workout plan successfully generated",
      statusCode: 200,
      data: response,
      user: user,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
