// ! This file is used to seed the database with workout data

const seed = [
  {
    name: "Push-up",
    howToDo:
      "Place your hands on the floor and keep your body straight. Lower your body until your chest nearly touches the floor. Push your body back to the starting position.",
    duration: 30,
    movementType: "PUSH",
    targetMuscle: ["CHEST", "TRICEPS, SHOULDERS"],
    difficulty: "BEGINNER",
    imageUrl:
      "https://media.istockphoto.com/id/1149242526/photo/determined-man-doing-push-ups-at-the-gym.jpg?s=612x612&w=0&k=20&c=QFxXGpxps01YLOfrtjhGeu_9-DbwiiLVzumDixHprj0=",
    videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
  },
  {
    name: "Pull-up",
    howToDo:
      "Hang from a bar with your hands shoulder-width apart. Pull your chest up to the bar. Lower your body back to the starting position.",
    duration: 30,
    movementType: "PULL",
    targetMuscle: ["BACK", "BICEPS"],
    difficulty: "INTERMEDIATE",
    imageUrl: "https://media.istockphoto.com/photos",
    videoUrl: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
  },
  {
    name: "Squat",
    howToDo:
      "Stand with your feet shoulder-width apart. Lower your body by bending your knees and hips. Push your body back to the starting position.",
    duration: 30,
    movementType: "LEGS",
    targetMuscle: ["QUADS", "HAMSTRINGS"],
    difficulty: "BEGINNER",
    imageUrl: "https://media.istockphoto.com/photos",
    videoUrl: "https://www.youtube.com/watch?v=aclHkVaku9U",
  },
  {
    name: "Plank",
    howToDo:
      "Place your forearms on the floor and keep your body straight. Hold this position for the duration of the exercise.",
    duration: 30,
    movementType: "CORE",
    targetMuscle: ["ABS"],
    difficulty: "BEGINNER",
    imageUrl: "https://media.istockphoto.com/photos",
    videoUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
  },
  {
    name: "Burpee",
    howToDo:
      "Stand with your feet shoulder-width apart. Lower your body into a squat position. Kick your legs back into a push-up position. Perform a push-up. Jump your feet back to the squat position. Jump up into the air.",
    duration: 30,
    movementType: "FULL_BODY",
    targetMuscle: ["CHEST", "TRICEPS", "BACK", "BICEPS", "QUADS", "HAMSTRINGS"],
    difficulty: "ADVANCED",
    imageUrl: "https://media.istockphoto.com/photos",
    videoUrl: "https://www.youtube.com/watch?v=JZQA08SlJnM",
  },
];

export default seed;
