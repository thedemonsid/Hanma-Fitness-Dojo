"use client"
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import MealCard from '@/components/cards/Mealcard';

const categories = ['All', 'Weightloss', 'MuscleBuilding', 'Maintenance'];

const meals = [
  { id: 1, name: 'Tandoori Chicken', category: 'Weightloss', description: 'High protein, low calorie meal for weight loss', calories: 350, protein: 30, carbs: 15, fat: 12 },
  { id: 2, name: 'Paneer Tikka', category: 'MuscleBuilding', description: 'High protein dish for muscle recovery and growth', calories: 400, protein: 40, carbs: 30, fat: 10 },
  { id: 3, name: 'Vegetable Biryani', category: 'Maintenance', description: 'Balanced meal with rice, veggies, and spices', calories: 550, protein: 25, carbs: 65, fat: 20 },
  { id: 4, name: 'Chickpea Curry', category: 'Vegan', description: 'Plant-based protein-rich meal', calories: 450, protein: 20, carbs: 60, fat: 15 },
  { id: 5, name: 'Egg Bhurji', category: 'Keto', description: 'High fat, low carb meal for ketogenic diet', calories: 500, protein: 25, carbs: 5, fat: 45 },
];

const NutritionPage = ({ onAddMeal }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const filteredMeals = selectedCategory === 'All'
    ? meals
    : meals.filter(meal => meal.category === selectedCategory);

  const addToPlan = (meal) => {
    onAddMeal({
      id: `m${Date.now()}`,
      text: `${meal.name} (${meal.calories} cal)`,
      completed: false
    });
    toast({
      title: "Meal Added",
      description: `${meal.name} has been added to your plan.`,
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-[calc(100vw-80px)] md:max-w-full">
      <h1 className="mb-4 text-2xl font-bold md:text-3xl md:mb-6">Nutrition Guide</h1>
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="flex flex-wrap mb-4">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="flex-grow md:flex-grow-0">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredMeals.filter(m => category === 'All' || m.category === category).map(meal => (
                  <MealCard key={meal.id} meal={meal} onAdd={addToPlan} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default NutritionPage;
