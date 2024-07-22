"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BarChart, Plus, Play } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const WorkoutCard = ({ workout, onAdd, onStart }) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="mb-2 sm:mb-0">{workout.name}</span>
        <Badge variant="secondary">{workout.category}</Badge>
      </CardTitle>
      <CardDescription>{workout.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col justify-between flex-grow">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center">
          <Clock className="mr-2 text-blue-500" size={18} />
          <span className="text-sm">{workout.duration}</span>
        </div>
        <div className="flex items-center">
          <BarChart className="mr-2 text-green-500" size={18} />
          <span className="text-sm">{workout.difficulty}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={() => onAdd(workout)} size="sm" variant="outline" className="flex-grow">
          <Plus className="w-4 h-4 mr-2" /> Add to Plan
        </Button>
        <Button onClick={() => onStart(workout)} size="sm" className="flex-grow">
          <Play className="w-4 h-4 mr-2" /> Start
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default WorkoutCard;
