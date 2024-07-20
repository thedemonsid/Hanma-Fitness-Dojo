"use client";
import MarkdownRenderer from "@/components/workers/MarkdownRenderer";
import React, { useState, useEffect, use } from "react";
import fetchGeminiResponse from "@/utils/fetchGemniResponse";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
function PersonalWorkoutPage() {
  const [content, setContent] = useState("");
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/");
    }
    if (isAuthenticated && !isLoading && content === "") {
      fetchGeminiResponse(user?.email, "exercise").then((data) => {
        setContent(data); // Setting the fetched data to state
      });
    }
  }, [user, isAuthenticated, isLoading]);

  if (isLoading) {
    return <Loading />;
  }
  if (content === "") {
    return <Loading />;
  }

  return (
    <div>
      <MarkdownRenderer markdownText={content.data} />
    </div>
  );
}

export default PersonalWorkoutPage;
