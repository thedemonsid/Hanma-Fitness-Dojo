import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// Fetch all users
export async function GET() {
  try {
    
    const users = await prisma.user.findMany();
    if (users.length == 0) {
      return NextResponse.error({
        status: 404,
        statusText: "No users found",
      });
    }
    return NextResponse.json({
      message: "Users fetched successfully",
      numberOfUsers: users.length,
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Create a new user
export async function POST(request) {
  try {
    const body = await request.json();
    const user = await prisma.user.create({
      data: body,
    });
    if (!user) {
      return NextResponse.error({
        status: 500,
        statusText: "User not created",
      });
    }
    return NextResponse.json({
      message: "User added successfully",
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Update a user
export async function PUT(request) {
  const body = await request.json();
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!existingUser) {
      return NextResponse.error({
        status: 404,
        statusText: "User not found",
      });
    }
    const user = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: body,
    });
    return NextResponse.json({
      message: "User updated successfully",
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

// Delete a user
export async function DELETE(request) {
  const body = await request.json();
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existingUser) {
      return NextResponse.error({
        status: 404,
        statusText: "User not found",
      });
    }
    const user = await prisma.user.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({
      message: "User deleted successfully",
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
