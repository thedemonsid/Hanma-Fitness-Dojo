"use client";
import MarkdownRenderer from "@/components/workers/MarkdownRenderer";
import React, { useState, useEffect } from "react";
import fetchGeminiResponse from "@/utils/fetchGemniResponse";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
function PersonalDietPage() {
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect if not signed in and session status is "unauthenticated"
    if (status === "unauthenticated") {
      redirect("/api/auth/signin");
    }
  }, [status]);
  useEffect(() => {
    // Fetching meal data by user ID
    if (session) {
      if (session?.user?.flagfilled) {
        fetchGeminiResponse(session?.user?.id, "meal").then((data) => {
          //console.log(data);
          setContent(data); // Setting the fetched data to state
        });
      } else {
        redirect("/OnBoardForm");
      }
    }
  }, [session?.user?.id]);

  if (!content) {
    return <Loading />;
  }

  return (
    <div>
      <MarkdownRenderer markdownText={content.data} />
    </div>
  );
}

export default PersonalDietPage;
