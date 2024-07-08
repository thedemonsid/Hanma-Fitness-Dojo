"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const dummyMeals = [
  { id: 1, name: "Grilled Chicken Salad", calories: 350, description: "A healthy and delicious salad", mainIngredients: ["chicken", "lettuce", "tomatoes"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8fDA%3D" },
  { id: 2, name: "Vegetarian Pizza", calories: 800, description: "Loaded with veggies and cheese", mainIngredients: ["dough", "cheese", "vegetables"], image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
  { id: 3, name: "Salmon with Quinoa", calories: 450, description: "Omega-3 rich meal", mainIngredients: ["salmon", "quinoa", "vegetables"], image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2FsbW9ufGVufDB8fDB8fHww" },
  { id: 4, name: "Beef Stir Fry", calories: 550, description: "Quick and tasty Asian-inspired dish", mainIngredients: ["beef", "mixed vegetables", "soy sauce"], image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RpciUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 5, name: "Vegetable Soup", calories: 200, description: "Comforting and low-calorie", mainIngredients: ["mixed vegetables", "broth", "herbs"], image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291cHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 6, name: "Greek Yogurt Parfait", calories: 300, description: "Perfect for breakfast or snack", mainIngredients: ["yogurt", "granola", "berries"], image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9ndXJ0JTIwcGFyZmFpdHxlbnwwfHwwfHx8MA%3D%3D" },
];

const MealPokedex = () => {
  const [meals, setMeals] = useState(dummyMeals);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filteredMeals = dummyMeals.filter(meal => 
        meal.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMeals(filteredMeals);
    } else {
      setMeals(dummyMeals);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-800">Meal Pokedex</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <div className="relative h-48">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">{meal.name}</p>
                </div>
              </div>
              <CardHeader className="bg-green-200 text-emerald-300">
                <CardTitle>{meal.name}</CardTitle>
                <CardDescription className="text-teal-100">Calories: {meal.calories}</CardDescription>
              </CardHeader>
              <CardContent className="bg-white">
                <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                <p className="text-xs text-gray-500">Main ingredients: {meal.mainIngredients.join(', ')}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex space-x-2 max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Search for a meal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white"
        />
        <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-700 transition-colors duration-300">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  );
};

export default MealPokedex;