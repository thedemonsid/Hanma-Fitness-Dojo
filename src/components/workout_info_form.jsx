"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What is your primary fitness goal?",
    type: "select",
    options: [
      "Lose Weight",
      "Build Muscle",
      "Improve Endurance",
      "Overall Health",
    ],
  },
  {
    id: 2,
    question: "How often do you currently exercise?",
    type: "select",
    options: ["Never", "1-2 times/week", "3-4 times/week", "5+ times/week"],
  },
  {
    id: 3,
    question: "Do you have any physical limitations or injuries?",
    type: "text",
    placeholder: "If yes, please specify",
  },
  {
    id: 4,
    question: "What type of workouts do you prefer?",
    type: "select",
    options: [
      "Cardio",
      "Strength Training",
      "HIIT",
      "Yoga",
      "Mixed",
      "Muscle-Building",
    ],
  },
  {
    id: 5,
    question: "How would you rate your current fitness level?",
    type: "select",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: 6,
    question: "Do you have access to a gym or home equipment?",
    type: "select",
    options: ["Gym", "Home Equipment", "Both", "Neither"],
  },
];

import { useRouter } from "next/navigation";
function WorkoutQuestionnaireCarousel({ plan = "basic" }) {
  let router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
  });

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleSubmit = () => {
    const userData = Object.entries(answers)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    console.log("userdata of Workout:", userData);
    router.push(`/Gym/your-workout`);
  };
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isInputFilled =
    answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== "";

  return (
    <div className="flex items-center justify-center w-screen h-svh p-4 shadow-md shadow-green-300">
      <Card className="w-full h-full mx-auto overflow-hidden rounded-sm p-3">
        <CardHeader className="h-1/6">
          <CardTitle className="text-2xl font-bold text-center mt-2">
            Build Your Perfect Workout Plan 💪
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-5/6">
          <div className="flex flex-col items-center justify-center flex-grow w-full p-6">
            <h2 className="mb-6 text-2xl font-semibold text-center">
              {currentQuestion.question}
            </h2>
            {currentQuestion.type === "select" ? (
              <Select
                onValueChange={(value) =>
                  handleInputChange(currentQuestion.id, value)
                }
                className="w-full max-w-md"
                value={answers[currentQuestion.id] || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestion.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="text"
                placeholder={currentQuestion.placeholder}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                value={answers[currentQuestion.id] || ""}
                className="w-full max-w-md"
              />
            )}
          </div>
          <div className="flex justify-between w-full p-6">
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="w-24"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={!isInputFilled}
                className="w-24"
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={goToNextQuestion}
                disabled={!isInputFilled}
                className="w-24"
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WorkoutQuestionnaireCarousel;
