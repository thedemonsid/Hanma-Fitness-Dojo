"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const questions = [
  {
    id: 'fitnessgoal',
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
    id: 'workoutfrequency',
    question: "How often do you currently exercise?",
    type: "select",
    options: ["Never", "1-2 times/week", "3-4 times/week", "5+ times/week"],
  },
  {
    id: 'physicallimitations',
    question: "Do you have any physical limitations or injuries?",
    type: "text",
    placeholder: "If yes, please specify",
  },
  {
    id: 'workouttype',
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
    id: 'fitnesslevel',
    question: "How would you rate your current fitness level?",
    type: "select",
    options: ["Skinny","Fit","Fat", "Obese"],
  },
  {
    id: 'equipmentaccess',
    question: "Do you have access to a gym or home equipment?",
    type: "select",
    options: ["Gym", "Home Equipment", "Both", "Neither"],
  },
];
const WorkoutQuestionnaireCarousel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();
  const [answers, setAnswers] = useState({
fitnessGoal: "",
workoutFrequency: '', 
physicalLimitations: '',
workoutType: '',
fitnessLevel: '',
equipmentAccess: '',
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
    console.log('User data:', answers);
    router.push('/Diet/Dietinfoform');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isInputFilled = answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== '';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-indigo-100 justify-center">
      <div className="flex-grow flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md justify-center">
          <h1 className="text-3xl font-extrabold text-primary text-center mb-8 font-bona">
            Let&apos;s get started with your Workout Plan
          </h1>
        </div>

        <div className="w-9/12 mx-auto  bg-white shadow-2xl overflow-hidden sm:rounded-lg border-border border-2 justify-center px-auto">
          <div className="px-4 py-8 sm:p-10">
            <div className="space-y-6 font-bona">
              <h2 className="text-2xl font-bold text-gray-600 text-center mb-4 font-bona">
                {currentQuestion.question}
              </h2>
              {currentQuestion.type === 'select' ? (
                <Select
                  onValueChange={(value) => handleInputChange(currentQuestion.id, value)}
                  value={answers[currentQuestion.id] || ''}
                >
                  <SelectTrigger className="w-full text-md p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mb-6 font-bona">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQuestion.options && currentQuestion.options.map((option) => (
                      <SelectItem key={option} value={option} className="text-sm font-bona">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={currentQuestion.type}
                  placeholder={currentQuestion.placeholder || 'Enter your answer'}
                  onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                  value={answers[currentQuestion.id] || ''}
                  className="w-full text-md p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              )}
              <p className="text-sm text-gray-500 text-center mt-2 font-bona">{currentQuestion.description}</p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-6 sm:px-10 font-bona">
            <div className="flex justify-between items-center">
              <Button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="w-32 text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isInputFilled}
                  className="w-32 text-sm bg-primary hover:bg-secondary  hover:text-white"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={goToNextQuestion}
                  disabled={!isInputFilled}
                  className="w-32 text-sm"
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutQuestionnaireCarousel;