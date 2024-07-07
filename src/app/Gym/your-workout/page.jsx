"use client";
import Markdown from "@/components/markdownrenderer";
import React, { useState, useEffect } from "react";
import getExercise from "@/utils/getExercise";
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
    if (session?.user?.filledForms.diet) {
      getExercise(session?.user?.id).then((data) => {
        console.log(data);
        setContent(data); // Setting the fetched data to state
      });
    } else {
      redirect("/Gym/workoutinfo");
    }
  }, [session?.user?.id]);

  if (!content) {
    return <Loading />;
  }

  return (
    <div>
      <Markdown markdownText={content.data} />
    </div>
  );
}

export default PersonalWorkoutPage;