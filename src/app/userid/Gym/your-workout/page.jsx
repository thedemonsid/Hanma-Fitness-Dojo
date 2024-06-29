import Markdown from '@/components/ui/markdownrenderer'
import React from 'react'
let content=
`# 7-Day Full Body Workout Plan

Welcome to your personalized 7-day workout plan! This plan is designed to target all major muscle groups throughout the week, with a mix of strength training, cardio, and recovery.

## Monday: Upper Body Strength

Start your week strong with an upper body focus:

1. **Warm-up**: 5-10 minutes of light cardio (jogging, jumping jacks)
2. **Bench Press**: 3 sets of 8-10 reps
3. **Dumbbell Rows**: 3 sets of 10-12 reps per arm
4. **Overhead Press**: 3 sets of 8-10 reps
5. **Tricep Dips**: 3 sets of 10-15 reps
6. **Bicep Curls**: 3 sets of 10-12 reps
7. **Cool-down**: 5-10 minutes of stretching

> Remember to start with a weight that challenges you but allows you to maintain proper form throughout all sets.

## Tuesday: Lower Body Strength

Focus on building those leg muscles:

1. **Warm-up**: 5-10 minutes of light cardio (stationary bike, bodyweight squats)
2. **Squats**: 3 sets of 8-10 reps
3. **Deadlifts**: 3 sets of 8-10 reps
4. **Lunges**: 3 sets of 10-12 reps per leg
5. **Leg Press**: 3 sets of 10-12 reps
6. **Calf Raises**: 3 sets of 15-20 reps
7. **Cool-down**: 5-10 minutes of stretching

## Wednesday: Cardio and Core

Give your muscles a break from weights and focus on heart health and core strength:

1. **Cardio**: 30 minutes of your choice (running, cycling, swimming)
2. **Plank**: 3 sets, hold for 30-60 seconds
3. **Russian Twists**: 3 sets of 20 reps
4. **Mountain Climbers**: 3 sets of 20 reps
5. **Leg Raises**: 3 sets of 15 reps
6. **Cool-down**: 5-10 minutes of yoga-inspired stretches

## Thursday: Upper Body Hypertrophy

Today we focus on muscle growth with higher rep ranges:

1. **Warm-up**: 5-10 minutes of light cardio
2. **Incline Dumbbell Press**: 4 sets of 12-15 reps
3. **Lat Pulldowns**: 4 sets of 12-15 reps
4. **Lateral Raises**: 4 sets of 15-20 reps
5. **Face Pulls**: 4 sets of 15-20 reps
6. **Tricep Pushdowns**: 4 sets of 12-15 reps
7. **Hammer Curls**: 4 sets of 12-15 reps
8. **Cool-down**: 5-10 minutes of stretching

## Friday: Lower Body Hypertrophy

Let's grow those legs:

1. **Warm-up**: 5-10 minutes of light cardio
2. **Leg Extensions**: 4 sets of 12-15 reps
3. **Leg Curls**: 4 sets of 12-15 reps
4. **Bulgarian Split Squats**: 3 sets of 10-12 reps per leg
5. **Hip Thrusts**: 4 sets of 12-15 reps
6. **Standing Calf Raises**: 4 sets of 15-20 reps
7. **Cool-down**: 5-10 minutes of stretching

## Saturday: HIIT and Core

Time for some high-intensity interval training:

1. **Warm-up**: 5 minutes of light cardio
2. **HIIT Circuit** (4 rounds, 40 seconds work, 20 seconds rest):
   - Burpees
   - Mountain Climbers
   - High Knees
   - Jump Squats
3. **Core Circuit** (3 rounds, 30 seconds each exercise):
   - Crunches
   - Bicycle Crunches
   - Plank
   - Side Plank (each side)
4. **Cool-down**: 5-10 minutes of stretching

## Sunday: Active Recovery

Give your body a chance to recover:

1. **Light Cardio**: 20-30 minutes of walking, swimming, or cycling at a leisurely pace
2. **Yoga**: 20-30 minutes of gentle yoga flows
3. **Foam Rolling**: 10-15 minutes, focus on any tight areas

---

Remember to listen to your body and adjust the workout as needed. Stay hydrated and maintain a balanced diet to support your fitness goals. Happy training!

![Workout Motivation](https://via.placeholder.com/600x300.png?text=Stay+Strong,+Stay+Committed)`




function page() {
  return (
    <div>
        <Markdown markdownText={content}></Markdown>
    </div>
  )
}

export default page