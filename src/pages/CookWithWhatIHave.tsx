import { useEffect, useState } from "react"
import RecipePromptCard from "@/components/RecipePromptCard"
import CookWithIngredientsUI from "@/components/CookWithIngredientsUI";
import { LocalStorageManager } from "@/services/storage";
import { getOrCreateGuest } from '@/lib/registerGuest';
import { cookWithIngredients } from '@/api/api';
import toast from "react-hot-toast";
import { useTokens } from "@/contexts/TokensContext";


interface User {
  access_token?: string;
  [key: string]: any;
}

export default function Extract() {
    const [recipe, setRecipe] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const { updateGuestTokens } = useTokens();

    const getUserData = async () => {
        try {
            let user: User | null = LocalStorageManager.get("user");

            if (!user?.access_token) {
                user = await getOrCreateGuest();
                }
            return user;
        } catch (error) {
            toast.error("Faced an error while getting recipe, please refresh and try again.");
        }
    }

    const cacheRecipeToStorage = (recipeData: any) => {
        try {
            LocalStorageManager.set("cook_with_recipe", recipeData);
        } catch (error) {
            return null;
        }
    }

    const handleRecipeSubmit = async (data: any) => {
        setIsLoading(true)

        const user = await getUserData();
        if ((!user?.access_token && !user?.guest_secret) || user?.tokens_left === 0) {
            toast.error("You have reached your token limit. Please sign in to continue.");
            setIsLoading(false)
            return;
        }
        const isGuest = !user?.access_token || false;
        try {
            const response = await cookWithIngredients(
                isGuest,
                data.ingredients,
                data.preferences,
                data.language
            );
            cacheRecipeToStorage(response?.data?.recipe);
            setRecipe(response?.data?.recipe);
            updateGuestTokens(response?.data?.tokens_left);
        } catch (error : any) {
            toast.error(error?.message ?? "Something went wrong");
        } finally{
            setIsLoading(false)
        }
    };

    const handleOnClose = () => {
        LocalStorageManager.delete("cook_with_recipe");
        setRecipe(null);
    };

    useEffect(() => {
        if (!recipe) {
            setIsLoading(true)
            const data = LocalStorageManager.get("cook_with_recipe");
            setRecipe(data);
            setIsLoading(false)
        }
    }, [recipe]);

    return (
        <>
            {recipe ? (
                <CookWithIngredientsUI recipe={recipe} onClose={handleOnClose}/>
            ) : (
                <RecipePromptCard onSubmit={handleRecipeSubmit} isLoading={isLoading} />
            )}
        </>
    )
}