import React, { useState } from 'react';
import { ChefHat, Clock, CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import type{ RecipeTodoUIProps } from '@/types/cookCardTypes';
import Stopwatch from './StopWatch';


const RecipeTodoUI: React.FC<RecipeTodoUIProps> = ({ recipe, onClose }) => {
  const ingredients = recipe?.ingredients ?? [];
  const steps = recipe?.steps ?? [];

  const [completedIngredients, setCompletedIngredients] = useState<boolean[]>(new Array(ingredients.length).fill(false));
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [isStopwatchVisible, setIsStopwatchVisible] = useState(false);
  const handleBackToHome = () => {
    onClose();
  }

  const toggleIngredient = (i: number) => setCompletedIngredients((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const toggleStep = (i: number) => setCompletedSteps((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <>
      <AnimatePresence>{isStopwatchVisible && <Stopwatch onClose={() => setIsStopwatchVisible(false)} />}</AnimatePresence>

      {/* Floating Stopwatch Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsStopwatchVisible(!isStopwatchVisible)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-r-2xl 
                   bg-lime-500 text-gray-900 shadow-lg hover:bg-emerald-400 cursor-pointer"
        aria-label="Toggle Stopwatch"
      >
        {isStopwatchVisible ? <ArrowLeft size={20} /> : <Clock size={20} />}
      </motion.button>

      {/* Recipe Container */}
      <div className="max-w-4xl mx-auto py-12 px-6 sm:px-8 bg-[#0e1818] rounded-3xl shadow-xl text-white border border-gray-800/50">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 border-b border-gray-800 pb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <ChefHat className="text-lime-400" size={42} />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400">
              {recipe.title}
            </h1>
          </div>
          <div >
            <a
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-blue-400 hover:text-sky-600 cursor-pointer p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left-to-line"
              >
                <path d="M3 19V5" />
                <path d="m13 6-6 6 6 6" />
                <path d="M7 12h14" />
              </svg>
              <span>Back to prompt</span>
            </a>
          </div>

          <p className="text-gray-400 text-lg flex items-center gap-2 mt-1">
            <Clock size={18} className="text-indigo-300" />
            Total Time: {recipe.total_estimated_time_minutes} mins
          </p>

        </motion.div>

        {/* Ingredients Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-emerald-400">🧂 Ingredients</h2>
          <ul className="space-y-3">
            {ingredients.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleIngredient(index)}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer backdrop-blur-md border transition-all duration-200 ${
                  completedIngredients[index]
                    ? 'bg-gray-800/40 border-gray-700 text-gray-400 line-through'
                    : 'bg-gray-900/40 border-gray-700 hover:bg-gray-800/60'
                }`}
              >
                {completedIngredients[index] ? (
                  <CheckCircle size={22} className="text-indigo-400 shrink-0" />
                ) : (
                  <Circle size={22} className="text-gray-500 shrink-0" />
                )}
                <span className="text-lg font-medium tracking-wide">{item}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Steps Section */}
        <section>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-emerald-300">🍲 Steps</h2>
          <ol className="space-y-8">
            {steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className={`relative pl-6 border-l-4 rounded-sm ${
                  completedSteps[index] ? 'border-indigo-400' : 'border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className={`text-xl font-semibold ${
                      completedSteps[index] ? 'text-indigo-400 line-through' : 'text-white'
                    }`}
                  >
                    {index + 1}. {step.step}
                  </h3>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock size={14} /> {step.estimated_time_minutes} min
                  </span>
                </div>
                <p
                  className={`text-gray-300 text-base leading-relaxed ${
                    completedSteps[index] ? 'text-gray-500 italic' : ''
                  }`}
                >
                  {step.description}
                </p>

                <Button
                  size="sm"
                  onClick={() => toggleStep(index)}
                  className={`mt-3 px-4 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all ${
                    completedSteps[index]
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-emerald-500 hover:bg-emerald-200 text-gray-900 cursor-pointer'
                  }`}
                >
                  {completedSteps[index] ? 'Undo' : 'Mark Complete'}
                </Button>
              </motion.li>
            ))}
          </ol>
        </section>
        <div className="mt-12 text-center">
          <button onClick={handleBackToHome}
            className='rounded-2xl bg-blue-600 hover:bg-sky-600 cursor-pointer p-2'>
            Back to prompt
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeTodoUI;
