export interface Step {
  step: string;
  description: string;
  estimated_time_minutes: number;
}

export interface RecipeData {
  title: string;
  ingredients: string[];
  steps: Step[];
  total_estimated_time_minutes: number;
}

export interface RecipeTodoUIProps {
  recipe: RecipeData;
  onClose: () => void;
}