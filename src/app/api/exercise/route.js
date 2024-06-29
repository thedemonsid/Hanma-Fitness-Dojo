import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// Fetch all exercises
export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany();
    if (exercises.length == 0) {
      return NextResponse.error({
        status: 404,
        statusText: "No exercises found",
      });
    }
    return NextResponse.json({
      message: "Exercises fetched successfully",
      numberOfExercises: exercises.length,
      statusCode: 200,
      data: exercises,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Create a new exercise
export async function POST(request) {
  try {
    const body = await request.json();
    const exercise = await prisma.exercise.create({
      data: body,
    });
    if (!exercise) {
      return NextResponse.error({
        status: 500,
        statusText: "Exercise not created",
      });
    }
    return NextResponse.json({
      message: "Exercise added successfully",
      statusCode: 200,
      data: exercise,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Update an exercise
export async function PUT(request) {
  const body = await request.json();
  try {
    const existingExercise = await prisma.exercise.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingExercise) {
      return NextResponse.error({
        status: 404,
        statusText: "Exercise not found",
      });
    }
    const exercise = await prisma.exercise.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    return NextResponse.json({
      message: "Exercise updated successfully",
      statusCode: 200,
      data: exercise,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Delete an exercise
export async function DELETE(request) {
  const body = await request.json();
  try {
    const existingExercise = await prisma.exercise.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingExercise) {
      return NextResponse.error({
        status: 404,
        statusText: "Exercise not found",
      });
    }
    const exercise = await prisma.exercise.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({
      message: "Exercise deleted successfully",
      statusCode: 200,
      data: exercise,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
