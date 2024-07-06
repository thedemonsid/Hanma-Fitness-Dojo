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
import { useRouter } from "next/navigation";
const basicQuestions = [
  { id: 1, question: "What is your Name", type: "text" },
  { id: 2, question: "What is your Age", type: "text" },
  { id: 3, question: "What is your Height (in centimeters)", type: "text" },
  {
    id: 4,
    question: "What is your fitness goal?",
    type: "select",
    options: ["Weight Loss", "Muscle Gain", "General Fitness"],
  },
  {
    id: 5,
    question: "How many days a week can you commit to exercising?",
    type: "select",
    options: ["1-2", "3-4", "5+"],
  },
  {
    id: 6,
    question: "Do you have any injuries or health conditions?",
    type: "text",
    placeholder: "If yes, please specify",
  },
];

const midQuestions = [
  ...basicQuestions,
  {
    id: 7,
    question: "What's your current workout routine?",
    type: "text",
    placeholder: "Describe briefly",
  },
  {
    id: 8,
    question: "What's your preferred type of exercise?",
    type: "select",
    options: ["Cardio", "Strength Training", "Flexibility", "Yoga"],
  },
];

const proQuestions = [
  ...midQuestions,
  {
    id: 9,
    question: "What's your daily calorie intake?",
    type: "text",
    placeholder: "Approximate number",
  },
  {
    id: 10,
    question: "Do you follow any specific diet?",
    type: "select",
    options: ["None", "Vegetarian", "Non-vegetarian", "Vegan", "Other"],
  },
  {
    id: 11,
    question: "What's your body fat percentage?",
    type: "text",
    placeholder: "If known",
  },
];

function GymQuestionnaireCarousel({ plan = "basic" }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
 
  const getQuestions = () => {
    switch (plan) {
      case "pro":
        return proQuestions;
      case "mid":
        return midQuestions;
      default:
        return basicQuestions;
    }
  };

  const questions = getQuestions();

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
    const userData = Object.values(answers).join(" ");
    console.log("userdata:", userData);

  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isInputFilled =
    answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== "";

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <Card className="w-full h-full  mx-auto overflow-hidden">
        <CardHeader className="h-1/6">
          <CardTitle className="text-2xl font-bold text-center">
            Tell us about yourself
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

export default GymQuestionnaireCarousel;
