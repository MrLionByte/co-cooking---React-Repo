import Logo from "@/assets/ccai-logo.png";


export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-white">
      <div className="flex justify-center">
        <img src={Logo} className="max-w-1/4 min-w-1/6 max-h-fit mb-5" alt="Logo-image" />
      </div>
      <h1 className="text-4xl font-extrabold mb-6 text-lime-400">
        About Co-Cooking 
      </h1>

      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        Co-Cooking was built on a simple belief 
        <span className="text-lime-400 font-semibold"> anyone can cook</span>.
        You don’t need professional training or fancy tools. If you can
        <strong> read and follow</strong>, you can make good food.
      </p>

      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        Whether you're a student living alone, someone learning to cook for the first time,
        or just tired of figuring out what to make every day —
        Co-Cooking helps you turn the ingredients you already have into meals that feel good.
      </p>

      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        Cooking isn’t just about food. 
        It can genuinely make your day better — even a little bit. 
        It can calm your mind, slow down your thoughts, and give you something real you can touch, taste, and appreciate.
      </p>

      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        It's like a quiet hobby that heals you.  
        When you cook, you are creating something for yourself.  
        That has power.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-10 mb-3">
        Built by a Cooking Enthusiast ❤️
      </h2>

      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        Co-Cooking is created by someone who fell in love with the comfort and creativity of cooking — 
        not as a chef, but as a hobbyist who just enjoyed making food for the people around him.
      </p>

      <a 
        href="https://www.linkedin.com/in/farhan-mahmood-n/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-lime-400 hover:text-lime-300 underline text-lg"
      >
        Connect on LinkedIn ↗
      </a>

    </main>
  );
}
