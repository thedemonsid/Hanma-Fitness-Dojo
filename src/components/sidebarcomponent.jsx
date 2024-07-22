"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Dumbbell,
  Apple,
  Settings,
  TrendingUp,
  User,
  ChevronRight,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const QuickActionDialog = ({ title, children, trigger }) => (
  <Dialog>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

const LogWorkoutDialog = () => {
  const { toast } = useToast();
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Workout Logged",
      description: `${workoutName} for ${duration} minutes has been logged.`,
    });
    setWorkoutName('');
    setDuration('');
  };
//  Fetch user's meal data and update it in the database
  return (
    <QuickActionDialog
      title="Log Workout"
      trigger={<Button variant="outline" size="sm">Log Workout</Button>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="workoutName">Workout Name</Label>
          <Input
            id="workoutName"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Log Workout</Button>
      </form>
    </QuickActionDialog>
  );
};

const AddMealDialog = () => {
  const { toast } = useToast();
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Meal Added",
      description: `${mealName} (${calories} calories) has been added to your plan.`,
    });
    setMealName('');
    setCalories('');
  };
  // Fetch user's meal data and update it in the database

  return (
    <QuickActionDialog
      title="Add Meal"
      trigger={<Button variant="outline" size="sm">Add Meal</Button>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="mealName">Meal Name</Label>
          <Input
            id="mealName"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="calories">Calories</Label>
          <Input
            id="calories"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Add Meal</Button>
      </form>
    </QuickActionDialog>
  );
};
// calaiore whatever.

const WaterIntakeDialog = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Water Intake Logged",
      description: `${amount} ml of water intake has been logged.`,
    });
    setAmount('');
  };
  // Fetch user's water intake data and update it in the database

  return (
    <QuickActionDialog
      title="Log Water Intake"
      trigger={<Button variant="outline" size="sm">Water Intake</Button>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount (ml)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Log Water Intake</Button>
      </form>
    </QuickActionDialog>
  );
};

const WeighInDialog = () => {
  const { toast } = useToast();
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Weight Logged",
      description: `Your weight of ${weight} kg has been logged.`,
    });
    setWeight('');
  };
  // Fetch user's weight data and update it in the database

  return (
    <QuickActionDialog
      title="Log Weight"
      trigger={<Button variant="outline" size="sm">Weigh In</Button>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Log Weight</Button>
      </form>
    </QuickActionDialog>
  );
};
//

const SidebarContent = ({ onClose }) => (
  <>
    <div className="p-4 border-b sm:p-6">
      <h1 className="text-xl font-bold sm:text-2xl">HFD&apos;s tracker 📝</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back, daddy!</p>
    </div>

    <ScrollArea className="flex-grow">
      <div className="p-4 space-y-6 sm:p-6">
        <div className="space-y-2">
          <h2 className="text-base font-semibold sm:text-lg">
            Today&apos;s Progress
          </h2>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Steps</span>
              <span>6,540 / 10,000</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Calories</span>
              <span>1,200 / 2,000</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
        </div>

        <nav className="space-y-1">
          {[
            { href: "/Dashboard", icon: Activity, label: "Dashboard" },
            { href: "/Dashboard/workouts", icon: Dumbbell, label: "Workouts" },
            { href: "/Dashboard/meals", icon: Apple, label: "Meals" },
            { href: "/Dashboard/progress", icon: TrendingUp, label: "Progress" },
          ].map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <Button variant="ghost" className="justify-start w-full">
                <item.icon className="mr-2" size={20} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="space-y-2">
          <h2 className="text-base font-semibold sm:text-lg">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            <LogWorkoutDialog />
            <AddMealDialog />
            <WaterIntakeDialog />
            <WeighInDialog />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold sm:text-lg">
            Recent Activity
          </h2>
          <ul className="space-y-1 text-sm">
            <li className="text-muted-foreground">Today: Upper body workout</li>
            <li className="text-muted-foreground">Yesterday: 10k steps</li>
            <li className="text-muted-foreground">Jul 19: Rest day</li>
          </ul>
          <Link
            href="/Dashboard/history"
            className="inline-flex items-center text-sm text-primary"
            onClick={onClose}
          >
            View full history
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </ScrollArea>

    <div className="p-4 border-t sm:p-6">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
          <User size={20} />
        </div>
        <div>
          <p className="font-medium">The_saint_sid</p>
          <p className="text-sm text-muted-foreground">
            App ke one of the fourfather&apos;s
          </p>
        </div>
      </div>
      <Link href="/dashboard/settings" className="block mt-4" onClick={onClose}>
        <Button variant="ghost" className="justify-start w-full">
          <Settings className="mr-2" size={20} />
          Settings
        </Button>
      </Link>
    </div>
  </>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed z-50 top-4 left-4 md:hidden"
          >
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          <SidebarContent onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      <aside className="flex-col hidden h-screen shadow-md md:flex w-80 bg-card text-card-foreground">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;