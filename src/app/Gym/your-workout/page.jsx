"use client";
import MarkdownRenderer from "@/components/workers/MarkdownRenderer";
import React, { useState, useEffect } from "react";
import fetchGeminiResponse from "@/utils/fetchGemniResponse";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function PersonalWorkoutPage() {
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect if not signed in and session status is "unauthenticated"
    if (status === "unauthenticated") {
      redirect("/api/auth/signin");
    }
  }, [status]);
  useEffect(() => {
    // Fetching Exercise data by user ID
    if (session) {
      if (session?.user?.filledForms.workout) {
        fetchGeminiResponse(session?.user?.id,"exercise").then((data) => {
          //console.log(data);
          setContent(data); // Setting the fetched data to state
        });
      } else {
        redirect("/Gym/workout-info-form");
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

export default PersonalWorkoutPage;
