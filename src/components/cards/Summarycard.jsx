"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PerformanceSummary = ({ meals, workouts }) => {
  const totalTasks = meals.length + workouts.length;
  const completedTasks =
    meals.filter((m) => m.completed).length +
    workouts.filter((w) => w.completed).length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Today&apos;s Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="h-2 mb-2" />
        <p className="text-sm text-muted-foreground">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </CardContent>
    </Card>
  );
};

export default PerformanceSummary;
