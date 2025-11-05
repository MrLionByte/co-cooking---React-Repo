import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import LanguageSelector from "./LanguageSelector";

interface RecipePrompt {
  ingredients: string[];
  preferences: string;
  language: string;
}

interface RecipePromptUIProps {
  onSubmit: (data: RecipePrompt) => void;
  isLoading: boolean;
}

const CookWithIngredientsUI: React.FC<RecipePromptUIProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState("");
  const [language, setLanguage] = useState("");

  const addIngredient = () => {
    if (ingredientInput.trim() && !ingredients.includes(ingredientInput.trim())) {
      setIngredients((prev) => [...prev, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (ingredients.length === 0) return;
    onSubmit({
      ingredients,
      preferences,
      language,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1f20] text-white px-4 py-1 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#182f30] rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-lime-400">
            Cook With What I Have
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Add your ingredients, describe what you’d like, and choose a language.
          </p>
        </div>

        {/* Ingredients */}
        <div>
          <label className="text-lg font-medium text-gray-300 mb-2 block">
            Ingredients
          </label>
          <div className="flex gap-2">
            <Input
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., tomato, onion, rice..."
              className="flex-1 text-base bg-gray-800 border-gray-700 text-white rounded-xl focus:border-lime-400 focus:ring-lime-400"
            />
            <Button
              type="button"
              onClick={addIngredient}
              className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold rounded-xl px-4"
            >
              Add
            </Button>
          </div>

          {ingredients.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {ingredients.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-700/50 text-white px-3 py-1 rounded-full text-sm"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => removeIngredient(index)}
                    className="text-gray-300 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preferences */}
        <div>
          <label className="text-lg font-medium text-gray-300 mb-2 block">
            Preferences
          </label>
          <Textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g., A comforting Italian meal under 45 minutes"
            rows={3}
            className="w-full text-base bg-gray-800 border-gray-700 text-white rounded-xl focus:border-lime-400 focus:ring-lime-400 resize-none"
          />
        </div>

        {/* Language */}
        <div>
        <div className="flex items-center justify-between mb-2">
            <label className="text-lg font-medium text-gray-300">
            Select Language
            </label>
            <Checkbox
            checked={!!language}
            onCheckedChange={(checked) => setLanguage(checked ? "en" : "")}
            className="border-gray-500 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
            />
        </div>

        <AnimatePresence>
        {language && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            >
            <LanguageSelector value={language} onChange={setLanguage} />
            </motion.div>
        )}
        </AnimatePresence>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-center">
            <Button
                onClick={handleSubmit}
                disabled={isLoading || ingredients.length === 0}
                className={`px-8 py-3 bg-lime-400 hover:bg-lime-500 text-gray-900 text-base font-bold transition-all duration-300 rounded-full shadow-lg h-auto w-full sm:w-auto ${
                isLoading ? "cursor-wait opacity-70" : "cursor-pointer"
                }`}
            >
                {isLoading ? "Generating..." : "Generate"}
            </Button>
        </div>

      </div>
    </div>
  );
};

export default CookWithIngredientsUI;
