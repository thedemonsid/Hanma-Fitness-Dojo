import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    // Assuming userInfo is a string containing user information
    console.log(body);
    // Parse the userInfoString to extract user details
    const decodedWorkoutInfo = decodeURIComponent(body.workoutInfo);

    // Convert the decoded string into a more structured format or a readable string
    // For simplicity, we'll convert it into a readable string here
    const workoutDetails = decodedWorkoutInfo
      .split("&")
      .map((item) => {
        const [key, value] = item.split("=");
        return `${key}: ${value}`;
      })
      .join(", ");

    // Append the workout details to the userPrompt

    // Modify the prompt for generating an exercise plan
    let userPrompt = `You are a helpful exercise recommendation system, 
    Generate a markdown list containing the name of the exercise, description, duration, and intensity level.
    Keep in mind the preferences of the user which are mentioned below. OUTPUT FORMAT FOR YOUR ANSWER: 
    LIST OF NAMES, THEIR DURATION, INTENSITY, AND DESCRIPTION OF 2-4 EXERCISES FOR A DAY IN MARKDOWN FORMAT:\n\n
    `;
    userPrompt += `Workout Information: ${workoutDetails}`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userPrompt);
    const response = await result.response.text();

    return NextResponse.json({
      message: "AI generated exercise plan successfully",
      statusCode: 200,
      data: response,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
