import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/services/protectedRoute';
import './App.css';

import Home from "@/pages/Home";
import About from "@/pages/About";
import Extract from "@/pages/Extract";
import Cook from '@/pages/CookWithWhatIHave';
import NotFound from '@/pages/NotFound';

function App() {  
  return (
      <Router>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cook" element={<Cook />} />

          <Route element={ <ProtectedRoute/> }>
            <Route path="/extract" element={<Extract />} />
          </Route>
          
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <Toaster 
          position="top-center"  
          reverseOrder={false} 
          gutter={8}
          toastOptions={{
            duration: 1500,
            removeDelay: 500,
          }}
        />
      </Router >
  );
}

export default App;
