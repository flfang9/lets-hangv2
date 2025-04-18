import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import sampleDrops from './data/sampleDrops';

function App() {
  // Local state to store drops
  const [drops, setDrops] = useState([]);

  // Load drops from localStorage on initial render
  useEffect(() => {
    // Force load sample data (comment this out later if you want to keep user data)
    setDrops(sampleDrops);
    localStorage.setItem('drops', JSON.stringify(sampleDrops));
    
    // Uncomment this section later when you want to persist user data
    /*
    const savedDrops = localStorage.getItem('drops');
    if (savedDrops) {
      setDrops(JSON.parse(savedDrops));
    } else {
      // Use our sample drops data
      setDrops(sampleDrops);
      localStorage.setItem('drops', JSON.stringify(sampleDrops));
    }
    */
  }, []);

  // Save drops to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('drops', JSON.stringify(drops));
  }, [drops]);

  const handleSaveDrop = (newDrop) => {
    setDrops(prevDrops => {
      // Check if it's an edit or a new drop
      const existingDropIndex = prevDrops.findIndex(drop => drop.id === newDrop.id);
      
      if (existingDropIndex >= 0) {
        // Edit existing drop
        const updatedDrops = [...prevDrops];
        updatedDrops[existingDropIndex] = newDrop;
        return updatedDrops;
      } else {
        // Add new drop
        return [...prevDrops, newDrop];
      }
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', padding: '16px' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto', width: '100%' }}>
        <HomePage drops={drops} onSaveDrop={handleSaveDrop} />
      </div>
    </div>
  );
}

export default App;
