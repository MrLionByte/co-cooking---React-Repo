import { useNavigate } from 'react-router-dom';
import type { FeatureCardProps } from '../types/cardTypes';


const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, color, mode, toRelease = false }) => {
    const navigate = useNavigate();

    const baseClasses = "p-6 border border-gray-100 bg-gray-200 hover:bg-gray-400 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    
    const releaseClasses = toRelease 
    ? "cursor-not-allowed border-gray-700 opacity-50" 
    : "cursor-pointer ";
    
    const iconType = () =>{
        if (mode==="cwwih") {
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="lucide lucide-chef-hat-icon lucide-chef-hat"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>
        } else if (mode === 'erfu'){
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="lucide lucide-salad-icon lucide-salad"><path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"/><path d="m13 12 4-4"/><path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"/></svg>
        } else {
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>
        }
    }

    const handleCardRoutes =()=> {
        if (mode === 'cwwih' && !toRelease) return navigate('/cook');
        else if (mode === 'erfu' && !toRelease) return navigate('/extract')
        else if (!toRelease) return navigate('/plan')
    }

  return (
    <div className={`${baseClasses} ${releaseClasses}`} onClick={handleCardRoutes}>
        <div className={`h-10 w-10 mb-4 rounded-full bg-gray-100 flex items-center justify-center ${color}`}>
            {iconType()}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {toRelease && <p className='text-blue-700'>(Coming Soon)</p>}
        <p className="mt-2 text-gray-500 text-sm">{description}</p>
    </div>
  )
};

export default FeatureCard;
