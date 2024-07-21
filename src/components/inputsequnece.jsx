"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import  Slider  from '@/components/ui/slider';
import { Button } from "@/components/ui/button";
import { Person, Scale, Apple, Star } from 'lucide-react';

const questions = [
  {
    title: "Set Your Age",
    field: "age",
    min: 18,
    max: 80,
    icon: <Person className="w-24 h-24 text-blue-500" />,
    description: "Drag the slider to set your age. The younger you are, the more stars you'll earn!",
  },
  {
    title: "Reach Your Height",
    field: "height",
    min: 140,
    max: 220,
    icon: (height) => (
      <div className="relative">
        <Person className="w-24 h-24 text-green-500" style={{ height: `${height / 1.5}px` }} />
        <div
          className="absolute bottom-0 left-0 right-0 bg-green-200"
          style={{ height: `${(height - 140) / (220 - 140) * 100}%`, transition: 'height 0.3s' }}
        />
      </div>
    ),
    unit: "cm",
    description: "Stretch the person to match your height. Taller people get more power-ups!",
  },
  {
    title: "Balance Your Weight",
    field: "weight",
    min: 40,
    max: 150,
    icon: <Scale className="w-24 h-24 text-yellow-500" />,
    unit: "kg",
    description: "Find your perfect balance! The closer you are to your ideal weight, the more points you score.",
  },
  {
    title: "Choose Your Diet Quest",
    field: "mealPreference",
    options: ["Vegetarian", "Vegan", "Keto", "Balanced"],
    icon: <Apple className="w-24 h-24 text-red-500" />,
    description: "Pick your nutritional adventure. Each choice unlocks unique benefits!",
  },
];

const calculateScore = (field, value) => {
  switch (field) {
    case 'age':
      return Math.max(5 - Math.floor((value - 18) / 10), 1);
    case 'height':
      return Math.min(Math.max(Math.floor((value - 140) / 10), 1), 5);
    case 'weight':
      const idealWeight = 22 * Math.pow((value / 100), 2); // BMI of 22
      const difference = Math.abs(value - idealWeight);
      return Math.max(5 - Math.floor(difference / 5), 1);
    default:
      return 3;
  }
};

const InputSequence = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    age: 25,
    height: 170,
    weight: 70,
    mealPreference: '',
  });
  const [score, setScore] = useState(0);
  const sliderRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSliderChange = (value) => {
    const newValue = value[0];
    setFormData({ ...formData, [currentQuestion.field]: newValue });
    if (currentQuestion.field !== 'mealPreference') {
      const questionScore = calculateScore(currentQuestion.field, newValue);
      setScore(prevScore => prevScore + questionScore);
    }
  };

  const handleMealPreference = (preference) => {
    setFormData({ ...formData, mealPreference: preference });
    setScore(prevScore => prevScore + 3);  // Fixed score for meal preference
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      goToNextQuestion();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.focus();
    }
  }, [currentQuestionIndex]);

  const slideVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Fitness Quest</h2>
            <div className="flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              <span className="text-xl font-bold">{score}</span>
            </div>
          </div>
          <AnimatePresence initial={false} custom={currentQuestionIndex}>
            <motion.div
              key={currentQuestionIndex}
              custom={currentQuestionIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <h3 className="mb-4 text-xl font-semibold text-center">{currentQuestion.title}</h3>
              <div className="flex justify-center mb-6">
                {typeof currentQuestion.icon === 'function'
                  ? currentQuestion.icon(formData[currentQuestion.field])
                  : currentQuestion.icon
                }
              </div>
              <p className="mb-4 text-sm text-center text-gray-600">{currentQuestion.description}</p>
              {currentQuestion.field !== 'mealPreference' ? (
                <>
                  <Slider
                    ref={sliderRef}
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    step={1}
                    value={[formData[currentQuestion.field]]}
                    onValueChange={handleSliderChange}
                    className="w-full mb-4"
                  />
                  <p className="text-4xl font-bold text-center">
                    {formData[currentQuestion.field]} {currentQuestion.unit}
                  </p>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      onClick={() => handleMealPreference(option)}
                      variant="outline"
                      className="w-full h-16 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:bg-blue-100"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="px-8 py-4 bg-gray-100">
          <p className="text-center text-gray-600">
            Press <span className="font-semibold">Enter</span> to continue your quest!
          </p>
        </div>
      </div>
    </div>
  );
}

export default InputSequence;