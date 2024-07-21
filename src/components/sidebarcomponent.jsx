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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SidebarContent = ({ onClose }) => (
  <>
    <div className="p-4 sm:p-6 border-b">
      <h1 className="text-xl sm:text-2xl font-bold">HFD&apos;s tracker 📝</h1>
      <p className="text-sm text-muted-foreground mt-1">Welcome back, daddy!</p>
    </div>

    <ScrollArea className="flex-grow">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-semibold">
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
            { href: "/dashboard", icon: Activity, label: "Dashboard" },
            { href: "/dashboard/workouts", icon: Dumbbell, label: "Workouts" },
            { href: "/dashboard/nutrition", icon: Apple, label: "Nutrition" },
            {
              href: "/dashboard/progress",
              icon: TrendingUp,
              label: "Progress",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className="mr-2" size={20} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {["Log Workout", "Add Meal", "Water Intake", "Weigh In"].map(
              (action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  {action}
                </Button>
              ),
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-semibold">
            Recent Activity
          </h2>
          <ul className="space-y-1 text-sm">
            <li className="text-muted-foreground">Today: Upper body workout</li>
            <li className="text-muted-foreground">Yesterday: 10k steps</li>
            <li className="text-muted-foreground">Jul 19: Rest day</li>
          </ul>
          <Link
            href="/dashboard/history"
            className="inline-flex items-center text-sm text-primary"
            onClick={onClose}
          >
            View full history
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </ScrollArea>

    <div className="p-4 sm:p-6 border-t">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <User size={20} />
        </div>
        <div>
          <p className="font-medium">The_saint_sid</p>
          <p className="text-sm text-muted-foreground">
            App ke one of the fourfather&apos;s
          </p>
        </div>
      </div>
      <Link href="/dashboard/settings" className="mt-4 block" onClick={onClose}>
        <Button variant="ghost" className="w-full justify-start">
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
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          <SidebarContent onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      <aside className="hidden md:flex w-80 h-screen bg-card text-card-foreground flex-col shadow-md">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
