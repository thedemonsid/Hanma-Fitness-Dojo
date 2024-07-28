import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import userSchema from "@/lib/schemaValidators/userSchema";
const partialUserSchema = userSchema.partial({ email: true }); //* Partial schema for updating user data without email

//* Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      return NextResponse.json(
        {
          message: "No users found",
          success: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Users fetched successfully",
        numberOfUsers: users.length,
        data: users,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

//* Create a new user
export async function POST(request) {
  try {
    const body = await request.json();
    //* Input validation
    const parsedBody = userSchema.safeParse(body);
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
    const user = await prisma.user.create({
      data: body,
    });
    return NextResponse.json(
      {
        message: "User added successfully",
        data: user,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
//* Update a user
export async function PUT(request) {
  try {
    const body = await request.json();
    const parsedBody = partialUserSchema.safeParse(body);
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
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }
    const user = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: body,
    });
    return NextResponse.json(
      {
        message: "User updated successfully",
        data: user,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

//! Delete a user
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
    //* Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }
    //* Check if adminSecret matches
    if (body.adminSecret === process.env.ADMIN_SECRET) {
      const user = await prisma.user.delete({
        where: {
          id: body.id,
        },
      });
      return NextResponse.json(
        {
          message: "User deleted successfully",
          data: user,
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
