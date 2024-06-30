"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const basicQuestions = [

    { id: 1, question: "What is your primary diet goal?", type: "select", options: ["Weight Loss", "Weight Gain", "Maintain Weight", "Improve Health"] },
    { id: 2, question: "Do you have any dietary restrictions?", type: "select", options: ["None", "Vegetarian", "Vegan", "Gluten-free", "Lactose-free", "Other"] },
    { id: 3, question: "How many meals do you typically eat per day?", type: "select", options: ["1-2", "3-4", "5+"] },
    { id: 4, question: "Do you have any food allergies?", type: "text", placeholder: "If yes, please specify" },
    { id: 5, question: "How would you rate your cooking skills?", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
    { id: 6, question: "Are you interested in meal prep?", type: "select", options: ["Yes", "No", "Maybe"] },
];

const proQuestions = [
    ...basicQuestions,
    { id: 7, question: "What's your daily calorie intake goal?", type: "text", placeholder: "Approximate number" },
    { id: 8, question: "What's your preferred macronutrient split?", type: "select", options: ["High-carb", "High-protein", "High-fat", "Balanced", "Not sure"] },
    { id: 9, question: "Do you track your food intake?", type: "select", options: ["Yes, regularly", "Sometimes", "No, but interested", "No, not interested"] },
    { id: 10, question: "Are you following any specific diet?", type: "select", options: ["None", "Keto", "Paleo", "Mediterranean", "Intermittent Fasting", "Other"] },
    { id: 11, question: "How often do you eat out or order takeaway?", type: "select", options: ["Rarely", "1-2 times a week", "3-5 times a week", "Almost daily"] },
    { id: 12, question: "Do you consume supplements?", type: "select", options: ["Yes", "No", "Sometimes"] },
    { id: 13, question: "How much water do you drink daily (in liters)?", type: "text" },
    { id: 14, question: "Do you have any specific foods you want to include more in your diet?", type: "text", placeholder: "E.g., leafy greens, lean proteins" },
    { id: 15, question: "Are there any foods you're trying to avoid or reduce?", type: "text", placeholder: "E.g., processed foods, sugary drinks" },
    { id: 16, question: "How does your diet change on weekends vs. weekdays?", type: "text", placeholder: "Briefly describe any differences" },
];

function DietQuestionnaireCarousel({ plan = "basic" }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = plan === "pro" ? proQuestions : basicQuestions;

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
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
    const userData = Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join(", ");
    console.log("userdata:", userData);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isInputFilled = answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== "";

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Card className="w-full h-full mx-auto overflow-hidden rounded-none">
        <CardHeader className="h-1/6">
          <CardTitle className="text-2xl font-bold text-center">
          what do you wanna eat this week 🍪
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-5/6">
          <div className="flex flex-col items-center justify-center flex-grow w-full p-6">
            <h2 className="mb-6 text-2xl font-semibold text-center">{currentQuestion.question}</h2>
            {currentQuestion.type === "select" ? (
              <Select 
                onValueChange={(value) => handleInputChange(currentQuestion.id, value)} 
                className="w-full max-w-md"
                value={answers[currentQuestion.id] || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestion.options.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="text"
                placeholder={currentQuestion.placeholder}
                onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
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

export default DietQuestionnaireCarousel;