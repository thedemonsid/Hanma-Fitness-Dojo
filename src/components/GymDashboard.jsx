import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target } from 'lucide-react'

const GymGoalCard = () => (
  <div className="animate-fade-in">
    <Card className="bg-slate-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Gym Goal</CardTitle>
        <div className="hover:scale-110 transition-transform duration-200">
          <Target className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="animate-scale-in">
          <div className="text-2xl font-bold">60%</div>
        </div>
        <p className="text-xs text-muted-foreground">
          +20% from last month
        </p>
        <div className="animate-width-in">
          <Progress value={60} className="mt-2 bg-zinc-500" />
        </div>
      </CardContent>
    </Card>
  </div>
)

export default GymGoalCard;