import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex flex-row h-screen w-screen">
        < Navbar />
        
        < Routes>

          < Route path="/" element={< Home />} />
          < Route path="/about" element={<About />} />

        </ Routes>
      </div>  
    </Router>
  );
}

export default App;
