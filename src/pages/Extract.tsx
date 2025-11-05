import { useState, useEffect } from "react";
import { extractRecipe } from "@/api/api";
import { LocalStorageManager } from "@/services/storage";
import { getOrCreateGuest } from "@/lib/registerGuest";
import ExtractUrlPromptCard from "@/components/ExtractUrlPromptCard"; 
import ExtractRecipeUI from "@/components/CookWithIngredientsUI";
import toast from "react-hot-toast";

interface User {
  access_token?: string;
  guest_secret?: string;
  tokens_left?: number;
  [key: string]: any;
}


export default function ExtractRecipe() {
  const [recipe, setRecipe] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async (): Promise<User | null> => {
    try {
      let user: User | null = LocalStorageManager.get("user");
      if (!user?.access_token) {
        user = await getOrCreateGuest();
      }
      return user;
    } catch (error) {
        return null;
    }
  };

  const cacheRecipeToStorage = (recipeData: any) => {
    LocalStorageManager.set("extracted_recipe", recipeData);
  };

  const handleRecipeExtract = async (data: { url: string }) => {
    setIsLoading(true);

    const user = await getUserData();
    if ((!user?.access_token && !user?.guest_secret) || user?.tokens_left === 0) {
      toast.error("You have reached your token limit. Please sign in to continue.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await extractRecipe(data.url);
      
      if (!response?.recipe) {
        toast.error("Could not extract recipe. Please check the URL.");
        return;
      }

      cacheRecipeToStorage(response.recipe);
      setRecipe(response.recipe);
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to extract recipe");
    } finally {
      setIsLoading(false);
    }
  };

    const handleOnClose = () => {
        LocalStorageManager.delete("extracted_recipe");
        setRecipe(null);
    };


  useEffect(() => {
    if (!recipe) {
      setIsLoading(true);
      const cached = LocalStorageManager.get("extracted_recipe");
      if (cached) setRecipe(cached);
      setIsLoading(false);
    }
  }, [recipe]);

  return (
    <>
      {recipe ? (
        <ExtractRecipeUI recipe={recipe} onClose={handleOnClose} />
      ) : (
        <ExtractUrlPromptCard
          title="Paste a Recipe URL 🍳"
          subtitle="We’ll automatically extract ingredients and steps from it."
          inputPlaceholder="e.g. https://www.allrecipes.com/recipe/12345/"
          buttonLabel="Extract Recipe"
          onSubmit={handleRecipeExtract}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
