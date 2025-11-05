import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LocalStorageManager } from "@/services/storage";
import type { UserState } from "@/types/hookTypes";

interface TokensContextType {
  userState: UserState;
  updateGuestTokens: (newBalance: number) => void;
}

const TokensContext = createContext<TokensContextType | null>(null);

export const TokensProvider = ({ children }: { children: React.ReactNode }) => {
  const [userState, setUserState] = useState<UserState>({
    balance: null,
    isGuest: true,
    loading: true,
  });

  const loadTokenState = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const { data: profile } = await supabase
        .from("users")
        .select("tokens_left")
        .eq("id", session.user.id)
        .single();

      LocalStorageManager.set("user", session);

      setUserState({
        balance: profile?.tokens_left ?? 0,
        isGuest: false,
        loading: false,
      });

    } else {
      const guest = LocalStorageManager.get<{
        guest_id: string;
        guest_secret: string;
        tokens_left: number;
      }>("guest_user");

      setUserState({
        balance: guest?.tokens_left ?? 0,
        isGuest: true,
        loading: false,
      });
    }
  };

  const updateGuestTokens = (newBalance: number) => {
    LocalStorageManager.edit("guest_user", { tokens_left: newBalance });

    setUserState((prev) => ({
      ...prev,
      balance: newBalance,
    }));
  };

  useEffect(() => {
    loadTokenState();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadTokenState();
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <TokensContext.Provider value={{ userState, updateGuestTokens }}>
      {children}
    </TokensContext.Provider>
  );
};

export const useTokens = () => {
  const ctx = useContext(TokensContext);
  if (!ctx) throw new Error("useTokens must be used inside <TokensProvider>");
  return ctx;
};
