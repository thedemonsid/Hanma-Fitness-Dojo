import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import workoutSchema from "@/lib/schemaValidators/workoutSchema";
const partialWorkoutSchema = workoutSchema.partial();

//* Fetch all workouts
export async function GET() {
  try {
    const workouts = await prisma.workout.findMany();
    if (workouts.length === 0) {
      return NextResponse.json(
        {
          message: "No workouts found",
          success: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Workouts fetched successfully",
        numberOfWorkouts: workouts.length,
        data: workouts,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

//* Create a new workout
export async function POST(request) {
  try {
    const body = await request.json();
    //* Input validation
    const parsedBody = workoutSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          success: false,
          error: parsedBody.error,
        },
        { status: 400 }
      );
    }
    const workout = await prisma.workout.create({
      data: body,
    });
    return NextResponse.json(
      {
        message: "Workout added successfully",
        data: workout,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

//* Update a workout
export async function PUT(request) {
  try {
    const body = await request.json();
    const parsedBody = partialWorkoutSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          success: false,
          error: parsedBody.error,
        },
        { status: 400 }
      );
    }
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingWorkout) {
      return NextResponse.json(
        {
          message: "Workout not found",
          success: false,
        },
        { status: 404 }
      );
    }
    const workout = await prisma.workout.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    return NextResponse.json(
      {
        message: "Workout updated successfully",
        data: workout,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

//! Delete a workout
export async function DELETE(request) {
  try {
    const body = await request.json();
    //* Input validation
    if (!body.id || !body.adminSecret) {
      return NextResponse.json(
        {
          message: "ID and adminSecret are required",
          success: false,
        },
        { status: 400 }
      );
    }
    //* Check if workout exists
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingWorkout) {
      return NextResponse.json(
        {
          message: "Workout not found",
          success: false,
        },
        { status: 404 }
      );
    }
    //* Check if adminSecret matches
    if (body.adminSecret === process.env.ADMIN_SECRET) {
      const workout = await prisma.workout.delete({
        where: {
          id: body.id,
        },
      });
      return NextResponse.json(
        {
          message: "Workout deleted successfully",
          data: workout,
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Unauthorized access",
          success: false,
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return handleError(error);
  }
}

//! Utility function to handle errors
const handleError = (error) => {
  return NextResponse.json(
    {
      message: "Internal Server Error",
      success: false,
      error: error.message,
    },
    { status: 500 }
  );
};
