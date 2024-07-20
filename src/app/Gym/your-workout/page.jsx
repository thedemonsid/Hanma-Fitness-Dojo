import MarkdownRenderer from "@/components/workers/MarkdownRenderer";
import fetchGeminiResponse from "@/utils/fetchGeminiResponse";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function PersonalWorkoutPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  if (!isUserAuthenticated) {
    redirect("/api/auth/login");
  }
  try {
    let content = await fetchGeminiResponse(user?.email, "exercise");
    if (!content.data) {
      return (
        <div className="text-red-600 flex justify-center items-center m-2 p-2">
          Server Side Error
        </div>
      );
    }
    return (
      <div>
        <MarkdownRenderer markdownText={content.data} />
      </div>
    );
  } catch (error) {
    console.error("Fetching error:", error);
    return (
      <div className="text-red-600 flex justify-center items-center m-2 p-2">
        An error occurred while fetching data.
      </div>
    );
  }
}

export default PersonalWorkoutPage;
