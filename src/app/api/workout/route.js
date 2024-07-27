import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import workoutSchema from "@/lib/schemaValidators/workoutSchema";
const partialWorkoutSchema = workoutSchema.partial();
// Fetch all workouts
export async function GET() {
  try {
    const workouts = await prisma.workout.findMany();
    if (workouts.length == 0) {
      return NextResponse.json({
        status: 404,
        message: "No workouts found",
        success: true,
      });
    }
    return NextResponse.json({
      message: "Workouts fetched successfully",
      numberOfWorkouts: workouts.length,
      status: 200,
      data: workouts,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
}

// Create a new workout
export async function POST(request) {
  try {
    const body = await request.json();
    // Validate the request body against the schema
    const parsedBody = workoutSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({
        status: 400,
        message: "Invalid workout data",
        success: false,
        errors: parsedBody.error.errors,
      });
    }

    const workout = await prisma.workout.create({
      data: parsedBody.data,
    });
    if (!workout) {
      return NextResponse.json({
        status: 500,
        message: "Workout not created",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Workout added successfully",
      status: 200,
      data: workout,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
}

// Update a workout
export async function PUT(request) {
  try {
    const body = await request.json();
    const parsedBody = partialWorkoutSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({
        status: 400,
        message: "Invalid workout data",
        success: false,
        errors: parsedBody.error.errors,
      });
    }
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingWorkout) {
      return NextResponse.json({
        status: 404,
        message: "Workout not found",
        success: false,
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
      status: 200,
      data: workout,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
}

// Delete a workout
export async function DELETE(request) {
  try {
    const body = await request.json();
    const parsedBody = partialWorkoutSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({
        status: 400,
        message: "Invalid workout data",
        success: false,
        errors: parsedBody.error.errors,
      });
    }
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingWorkout) {
      return NextResponse.json({
        status: 404,
        message: "Workout not found",
        success: false,
      });
    }
    const workout = await prisma.workout.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({
      message: "Workout deleted successfully",
      status: 200,
      data: workout,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
}
