"use client";

import {Link} from "react-router-dom";
import { signInWithGoogle, signOut } from "@/hooks/useTokens";
import { useTokens } from "@/contexts/TokensContext";


export default function Header() {
  
  const { userState } = useTokens();
  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };
  const handleSignOutWithGoogle = () => {
    signOut();
  };


  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3 sm:px-8 md:px-12">
        
        <Link to="/" className="flex items-center gap-3">          
          <span className="text-2xl font-extrabold tracking-tight font-sans">
            <span className="text-white">Co</span>
            <span className="text-lime-400">Cooking</span> 
          </span>

        </Link>
        
        <nav className="ml-auto flex items-center gap-4 text-sm">
          {/* <Link to="/extract" className="text-zinc-100 hover:underline">Extract</Link> */}
          {/* <Link to="/cook" className="text-zinc-100 hover:underline">Cook</Link> */}
          {/* <Link to="/plan" className="text-zinc-100 hover:underline">Plan</Link> */}
        </nav>
        
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-zinc-100">
            Tokens: {userState?.loading ? "…" : userState?.balance === null ? "0" : userState?.balance}
          </span>
          {userState?.isGuest ? (
            <button onClick={handleSignInWithGoogle} className="rounded-full bg-accent px-4 py-2 text-xs font-medium text-zinc-900 shadow cursor-pointer hover:bg-lime-400">
              Sign in
            </button>
          ) : (
            <button onClick={handleSignOutWithGoogle} className="rounded-full bg-white/15 px-4 py-2 text-xs text-zinc-100 cursor-pointer">
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
