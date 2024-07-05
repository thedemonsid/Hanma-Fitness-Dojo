import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from 'lucide-react'

const StreakCard = () => (
  <div className="animate-fade-in">
    <Card className="bg-slate-300 w-full h-[20vh]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
        <div className="hover:scale-110 transition-transform duration-200">
          <Flame className="h-4 w-4 text-muted-foreground text-orange-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="animate-scale-in">
          <div className="text-2xl font-bold">14 days</div>
        </div>
        <p className="text-xs text-muted-foreground">
          Keep it up!
        </p>
      </CardContent>
    </Card>
  </div>
)

export default StreakCard;