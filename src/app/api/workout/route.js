import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// Fetch all workouts
export async function GET() {
  try {
    const workouts = await prisma.workout.findMany();
    if (workouts.length == 0) {
      return NextResponse.error({
        status: 404,
        statusText: "No workouts found",
      });
    }
    return NextResponse.json({
      message: "Workouts fetched successfully",
      numberOfWorkouts: workouts.length,
      statusCode: 200,
      data: workouts,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Create a new workout
export async function POST(request) {
  try {
    const body = await request.json();
    const workout = await prisma.workout.create({
      data: body,
    });
    if (!workout) {
      return NextResponse.error({
        status: 500,
        statusText: "Workout not created",
      });
    }
    return NextResponse.json({
      message: "Workout added successfully",
      statusCode: 200,
      data: workout,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Update a workout
export async function PUT(request) {
  const body = await request.json();
  try {
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingWorkout) {
      return NextResponse.error({
        status: 404,
        statusText: "Workout not found",
      });
    }
    const workout = await prisma.workout.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    return NextResponse.json({
      message: "Workout updated successfully",
      statusCode: 200,
      data: workout,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Delete a workout
export async function DELETE(request) {
  const body = await request.json();
  try {
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingWorkout) {
      return NextResponse.error({
        status: 404,
        statusText: "Workout not found",
      });
    }
    const workout = await prisma.workout.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({
      message: "Workout deleted successfully",
      statusCode: 200,
      data: workout,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
