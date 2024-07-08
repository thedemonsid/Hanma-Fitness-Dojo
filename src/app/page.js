"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
const Home = () => {
  let router = useRouter();
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
        💪 Hanma-Fitness-Dojo 💪
        </h1>
        <p className="text-xl md:text-3xl mb-10">
          Your AI-Powered Fitness Management Assistant 🤖
        </p>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3"
          onClick={() => {
            console.log("Get Started Clicked");
            router.push("/Gym/your-workout");
          }}
        >
          Get Started
        </Button>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-blend-darken">
        <h2 className="text-4xl font-bold text-center mb-16">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <Card className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl overflow-hidden">
            <CardHeader className="bg-primary/10 pb-6">
              <CardTitle className="flex items-center text-2xl">
                <span className="text-4xl mr-4">🏋️‍♂️</span>
                Personalized Workouts
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg pt-6">
              Tailored workout routines based on your goals and preferences.
            </CardContent>
          </Card>
          <Card className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl overflow-hidden">
            <CardHeader className="bg-primary/10 pb-6">
              <CardTitle className="flex items-center text-2xl">
                <span className="text-4xl mr-4">🥗</span>
                Custom Diet Plans
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg pt-6">
              AI-generated diet plans to complement your fitness journey.
            </CardContent>
          </Card>
          <Card className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl overflow-hidden">
            <CardHeader className="bg-primary/10 pb-6">
              <CardTitle className="flex items-center text-2xl">
                <span className="text-4xl mr-4">🧠</span>
                AI-Powered Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg pt-6">
              Get expert fitness advice powered by cutting-edge AI technology.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Fitness Journey? 🚀
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join Hanma-Fitness-Dojo today and experience the power of AI-driven
            fitness management.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => {
              console.log("Sign Up Now Clicked");
              router.push("api/auth/signin");
            }}
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Hanma-Fitness-Dojo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
