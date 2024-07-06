import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const userId = body.userId;

    // Fetch user details from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return NextResponse.error({
        status: 404,
        statusText: "User not found",
      });
    }

    // Create a detailed prompt for the AI using user information
    const userPrompt = `You are a helpful meal prep recommendation system, 
    Generate a markdown list containing the name of the meal, ingredients, recipe, and calorie per serving.
    Keep in mind the preferences of the user which are mentioned below.THERE SHOULD BE THE 4-6 MEALS IN A DAY.[USE LINKS for meals ,FENCED CODE ETC IN MARKDOWN]. OUTPUT FORMAT FOR YOUR ANSWER: 
    LIST OF NAMES, THEIR CALORIE PER SERVE, PROTIEN,FATS,CARBS AND OTHER CONTITUTES IN GRAMS , AND RECIPES OF MEALS FOR A DAY WITH THE TIME IN MARKDOWN FORMAT (Mention the User info at Top IN PARA FORMAT WITH MAIN INFO BEING HIGHLIGHTED , AFTER EACH SUB PART HAVE A HORIZONTAL LNE):\n\n
    - Name : ${user?.name || "Not specified"}
    - Age: ${user?.age || "Not specified"}, 
    - Weight: ${user?.weight || "Not specified"}, 
    - Height: ${user?.height || "Not specified"}, 
    - Fitness Goal: ${user?.fitnessGoal || "Not specified"}, 
    - Activity Level: ${user?.intensityLevel || "Not specified"}, 
    - Dietary Preferences: ${user?.dietPreference || "Not specified"}, 
    - Health Conditions: ${user?.healthConditions || "None"}, 
    - Gender: ${user?.gender || "Not specified"},
    - Region: ${user?.region || "Not specified"}.\n\n
    `;

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content based on the user's prompt
    const result = await model.generateContent(userPrompt);
    const response = await result.response.text(); // Assuming response.text() is a promise

    return NextResponse.json({
      message: "AI generated meal plan successfully",
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
