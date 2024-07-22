"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Utensils, Scale, Plus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

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

export default MealCard;
