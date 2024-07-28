import prisma from "@/utils/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) {
    console.log("User not found", "\n User : ", user);
    return NextResponse.redirect(process.env.KINDE_SITE_URL);
  }

  let dbUser = await prisma.user.findUnique({
    where: { kindeId: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        kindeId: user.id,
        name: user.given_name ?? "" + user.family_name ?? "",
        email: user.email ?? "", //* Using nullish coalescing operator to provide a default empty string value
        imageUrl: user.picture ?? "",
      },
    });
  }

  return NextResponse.redirect(process.env.KINDE_SITE_URL);
}
