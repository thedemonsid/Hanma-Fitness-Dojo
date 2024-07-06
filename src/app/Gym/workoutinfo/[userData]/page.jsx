"use client";
import Markdown from "@/components/markdownrenderer";
import React, { useState, useEffect } from "react";
import getExercise from "@/utils/getExercise";
import Loading from "@/app/loading";

function PersonalWorkoutPage({ params }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetching meal data by user ID
    getExercise(params.userData).then((data) => {
      console.log(data); // Logging the fetched data for debugging
      setContent(data); // Setting the fetched data to state
    });
  }, [params.userData]); // Dependency array to re-run effect when userId changes

  if (!content) {
    // Display loading component if content is not yet fetched
    return <Loading />;
  }

  // Rendering the Markdown content if available
  return (
    <div>
      <Markdown markdownText={content.data} />
    </div>
  );
}

export default PersonalWorkoutPage;
