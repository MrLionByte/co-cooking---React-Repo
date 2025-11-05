export const mockCookRecipe = {
      title: "Savory Tomato, Onion, and Egg Scramble",
      ingredients: [
        "3 large eggs",
        "1 medium tomato",
        "1/2 small onion",
        "1 tablespoon cooking oil (e.g., olive oil, butter)",
        "Salt to taste",
        "Black pepper to taste"
      ],
      steps: [
        {
          step: "Prepare Vegetables",
          description: "Finely chop the onion and dice the tomato into small, uniform pieces. Set aside.",
          estimated_time_minutes: 4
        },
        {
          step: "Sauté Onion",
          description: "Heat the cooking oil in a non-stick pan or skillet over medium heat. Add the chopped onion and cook for 3-4 minutes until softened and translucent, stirring occasionally.",
          estimated_time_minutes: 4
        },
        {
          step: "Add Tomato",
          description: "Add the diced tomato to the pan with the softened onion. Cook for another 2-3 minutes, stirring, until the tomato begins to soften slightly and release its juices.",
          estimated_time_minutes: 3
        },
        {
          step: "Whisk Eggs",
          description: "While the vegetables are cooking, crack the eggs into a bowl. Add a pinch of salt and black pepper. Whisk vigorously with a fork or whisk until the yolks and whites are fully combined and slightly frothy.",
          estimated_time_minutes: 2
        },
        {
          step: "Scramble Eggs",
          description: "Pour the whisked eggs over the sautéed vegetables in the pan. Let the eggs set for about 30 seconds without stirring. Then, using a spatula, gently push the cooked egg from the edges towards the center, allowing uncooked egg to flow underneath. Continue this process for 2-4 minutes until the eggs are cooked to your desired consistency (soft and creamy or more firm).",
          estimated_time_minutes: 4
        },
        {
          step: "Season and Serve",
          description: "Taste the scramble and adjust seasoning if needed. Serve immediately, perhaps with a sprinkle of fresh herbs if available, as a light meal or breakfast.",
          estimated_time_minutes: 1
        }
      ],
      total_estimated_time_minutes: 18
    };

    
export const mockExtractedRecipe = {
  ok: true,
  recipe: {
    title: "Egg Roll in a Bowl Recipe",
    ingredients: [
      "1 to 2 tablespoons olive or vegetable oil",
      "1 pound ground pork, lean ground beef, or ground turkey",
      "1 medium yellow onion, diced (about 1 1/2 cups)",
      "1 1/2 teaspoons kosher salt, divided, plus more as needed",
      "Freshly ground black pepper",
      "3 cloves garlic, minced",
      "1 tablespoon minced peeled ginger, from 1 (1-inch) piece",
      "1 (14-ounce) bag coleslaw mix (about 6 1/2 cups)",
      "2 tablespoons soy sauce or tamari",
      "2 medium scallions, thinly sliced (about 1/4 cup)",
      "2 teaspoons rice vinegar",
      "1 teaspoon toasted sesame oil",
      "Sriracha, chili crisp, or sweet chile sauce (optional)",
    ],
    steps: [
      {
        step: "Cook the meat and onion",
        description:
          "Heat oil in a large skillet. Add pork and onion, season with salt and pepper. Cook, breaking up the meat, until cooked through and onion is tender, about 8 minutes.",
        estimated_time_minutes: 8,
      },
      {
        step: "Cook the aromatics and vegetables",
        description:
          "Stir in garlic and ginger for 30 seconds, then add coleslaw mix, soy sauce, and salt. Cook 2–3 minutes until crisp-tender.",
        estimated_time_minutes: 3,
      },
      {
        step: "Finish with the seasonings",
        description:
          "Remove from heat. Add scallions, rice vinegar, and sesame oil. Adjust salt and pepper to taste. Serve with hot sauce if desired.",
        estimated_time_minutes: 1,
      },
    ],
    total_estimated_time_minutes: 12,
  },
};