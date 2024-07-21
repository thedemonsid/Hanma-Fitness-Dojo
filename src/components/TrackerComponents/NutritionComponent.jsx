"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Utensils, Flame, Scale } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const categories = ['All', 'Weightloss', 'MuscleBuilding', 'Maintenance'];

const meals = [
  { id: 1, name: 'Grilled Chicken Salad', category: 'Weightloss', description: 'High protein, low calorie meal for weight loss', calories: 350, protein: 30, carbs: 15, fat: 12 },
  { id: 2, name: 'Protein Smoothie', category: 'MuscleBuilding', description: 'High protein shake for muscle recovery and growth', calories: 400, protein: 40, carbs: 30, fat: 10 },
  { id: 3, name: 'Mediterranean Bowl', category: 'Maintenance', description: 'Balanced meal with whole grains, veggies, and lean protein', calories: 550, protein: 25, carbs: 65, fat: 20 },
  { id: 4, name: 'Lentil and Vegetable Curry', category: 'Vegan', description: 'Plant-based protein-rich meal', calories: 450, protein: 20, carbs: 60, fat: 15 },
  { id: 5, name: 'Avocado and Bacon Omelette', category: 'Keto', description: 'High fat, low carb meal for ketogenic diet', calories: 500, protein: 25, carbs: 5, fat: 45 },
];

const MealCard = ({ meal, onAdd }) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="mb-2 sm:mb-0">{meal.name}</span>
        <Badge variant="secondary">{meal.category}</Badge>
      </CardTitle>
      <CardDescription>{meal.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col justify-between flex-grow">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center">
          <Flame className="mr-2 text-orange-500" size={18} />
          <span className="text-sm">{meal.calories} cal</span>
        </div>
        <div className="flex items-center">
          <Utensils className="mr-2 text-blue-500" size={18} />
          <span className="text-sm">{meal.protein}g protein</span>
        </div>
        <div className="flex items-center">
          <Scale className="mr-2 text-green-500" size={18} />
          <span className="text-sm">{meal.carbs}g carbs</span>
        </div>
        <div className="flex items-center">
          <Scale className="mr-2 text-yellow-500" size={18} />
          <span className="text-sm">{meal.fat}g fat</span>
        </div>
      </div>
      <Button onClick={() => onAdd(meal)} size="sm" className="w-full">
        <Plus className="w-4 h-4 mr-2" /> Add to Plan
      </Button>
    </CardContent>
  </Card>
);

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