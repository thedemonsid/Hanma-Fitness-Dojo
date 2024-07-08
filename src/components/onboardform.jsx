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
    id: 'name',
    question: 'What is your name?',
    type: 'text',
    description: 'Please enter your full name',
  },
  {
    id: 'age',
    question: 'What is your age?',
    type: 'number',
    description: 'Enter your age in years',
  },
  {
    id: 'height',
    question: 'What is your height?',
    type: 'number',
    description: 'Enter your height in centimeters',
  },
  {
    id: 'fitnessGoal',
    question: 'What is your fitness goal?',
    type: 'select',
    options: ['Weight Loss', 'Muscle Gain', 'General Fitness'],
    description: 'Choose the primary goal for your fitness journey',
  },
  {
    id: 'exerciseFrequency',
    question: 'How many days a week can you exercise?',
    type: 'select',
    options: ['1-2', '3-4', '5+'],
    description: 'Select the number of days you can dedicate to working out',
  },
  {
    id: 'healthConditions',
    question: 'Any injuries or health conditions?',
    type: 'text',
    description: 'Mention any health concerns that may affect your workout',
    placeholder: 'If yes, please specify',
  },
];

const GymQuestionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();
  const [answers, setAnswers] = useState({
    name: '',
    age: '',
    height: '',
    fitnessGoal: '',
    exerciseFrequency: '',
    healthConditions: '',
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
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-indigo-100 ">
      <div className="flex-grow flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md ">
          <h1 className="text-3xl font-extrabold text-primary text-center mb-8 font-bona">
            Tell us about yourself
          </h1>
        </div>

        <div className="w-9/12 mx-auto  bg-white shadow-2xl overflow-hidden sm:rounded-lg border-border border-2">
          <div className="px-4 py-8 sm:p-10">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-600 text-center mb-4 font-bona">
                {currentQuestion.question}
              </h2>
              {currentQuestion.type === 'select' ? (
                <Select
                  onValueChange={(value) => handleInputChange(currentQuestion.id, value)}
                  value={answers[currentQuestion.id] || ''}
                >
                  <SelectTrigger className="w-full text-lg p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mb-6 ">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQuestion.options && currentQuestion.options.map((option) => (
                      <SelectItem key={option} value={option} className="text-lg">
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
                  className="w-full text-lg p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              )}
              <p className="text-sm text-gray-500 text-center mt-2">{currentQuestion.description}</p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-6 sm:px-10">
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
                  className="w-32 text-sm bg-green-500 hover:bg-green-600"
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

export default GymQuestionnaire;