import FeatureCard from "../components/FeatureCard";
import Logo from "../assets/ccai-logo.png";

const MainContent = () => {
  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">    
        <div className="text-center">
          
          <img
            src={Logo}
            alt="CoCookingAi"
            width={100}
            height={100}
            className="mx-auto mb-4" 
          />

          <h2 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            Make Every Food <span className="text-lime-400">An Experience</span>
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-xl text-white/80">
            Your personal cooking assistant for delicious recipes, with what you got.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <FeatureCard
              title="Cook with what i have"
              description="Get instant recipe ideas based on the ingredients you already have in your kitchen."
              color="text-yellow-600"
              mode="cwwih"
              toRelease={false}
            />
            
            <FeatureCard
              title="Extract Recipe"
              description="Paste a recipe URL and convert it into a simple, step-by-step cooking checklist."
              color="text-green-600"
              mode="erfu"
              toRelease={false}
            />
            
            <FeatureCard
              title="Plan Your Meal"
              description="AI-powered meal suggestions tailored to your mood, preferences, and diet."
              color="text-red-600"
              mode="pmm"
              toRelease={true}
            />
          </div>

        </div>
      </div>
    </main>
  );
};

export default MainContent;
