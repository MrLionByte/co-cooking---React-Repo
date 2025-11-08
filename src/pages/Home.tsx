import { useState } from 'react';
import axios from 'axios';
import FeatureCard from "../components/FeatureCard";
import Logo from "../assets/ccai-logo.png";
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { LocalStorageManager } from '@/services/storage';

const GOOGLE_SHEET_WEBHOOK = import.meta.env.VITE_APP_GOOGLE_SHEET_WEBHOOK || '';

interface FeedbackParams {
  user_id: string;
  feedback: string;
  rating: number;
}

async function getIP() {
  const res = await axios.get("https://api.ipify.org?format=json");
  return res.data.ip;
}

async function sendFeedback({ 
  user_id, 
  feedback, 
  rating 
}: FeedbackParams) {
  const user_ip = await getIP();

  await fetch(GOOGLE_SHEET_WEBHOOK, {
    method: 'POST',
    mode: "no-cors",
    body: JSON.stringify({
      user_ip,
      user_id,
      feedback,
      rating,
    }),
  });
}

const FeedbackModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (params: FeedbackParams) => Promise<void> }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || rating === 0) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({ feedback, rating, user_id: LocalStorageManager.get('user')?.user_id || 'guest_user'?.guest_id || '' });
      toast.success('Thank you for your feedback!');
      setTimeout(() => {
        onClose();
        setFeedback('');
        setRating(0)
      }, 1500);
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Share Your Feedback</h3>
        
          <>
            <p className="text-gray-600 mb-4">We'd love to hear your thoughts to improve our service!</p>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                How would you rate your experience?
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Share your thoughts, suggestions, or report any issues..."
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!feedback.trim() || rating === 0 || isSubmitting}
                className="px-4 py-2 text-white bg-lime-500 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </>
        
      </div>
    </div>
  );
};

const MainContent = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [user, setUser] = useState(
    LocalStorageManager.get('user') || ('guest_user'));

  const handleFeedbackSubmit = async ({ feedback, rating }) => {
    try {
      await sendFeedback({
        user_id: user?.user_id || user?.guest_id || '',
        feedback,
        rating,
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };

  return (
    <main className="relative">
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
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
          
          <div className="mt-12 text-center">
            <p className="text-white/80 mb-4">Have feedback or suggestions? We'd love to hear from you!</p>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Share Feedback
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
