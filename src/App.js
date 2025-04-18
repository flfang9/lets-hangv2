import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import sampleDrops from './data/sampleDrops';

function App() {
  // Local state to store drops
  const [drops, setDrops] = useState([]);
  // Active tab state
  const [activeTab, setActiveTab] = useState('home');

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

  // Handle RSVP changes and photo links
  const handleRsvpChange = (dropId, status, note, photoLink) => {
    setDrops(prevDrops => {
      return prevDrops.map(drop => {
        if (drop.id === dropId) {
          // Update the main drop RSVP data
          const updates = {
            ...drop,
            yourRsvp: status,
            rsvpNote: note
          };
          
          // If photoLink is provided, update it
          if (photoLink !== undefined) {
            updates.photoLink = photoLink;
          }
          
          return updates;
        }
        return drop;
      });
    });
  };

  // Handle photo link update
  const handlePhotoLinkUpdate = (dropId, photoLink, userName) => {
    setDrops(prevDrops => {
      return prevDrops.map(drop => {
        if (drop.id === dropId) {
          // Update or add the photo link to the RSVP
          const updatedFriendsRsvp = drop.friendsRsvp?.map(friend => {
            if (friend.name === userName) {
              return { ...friend, photoLink };
            }
            return friend;
          }) || [];
          
          return {
            ...drop,
            friendsRsvp: updatedFriendsRsvp
          };
        }
        return drop;
      });
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '16px',
      maxWidth: '500px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column'
    },
    content: {
      flex: 1,
      paddingBottom: '70px' // Space for bottom navigation
    },
    navigation: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0',
      zIndex: 50,
      maxWidth: '500px',
      margin: '0 auto'
    },
    navButton: (isActive) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      color: isActive ? '#2563eb' : '#64748b',
      fontWeight: isActive ? '600' : '500',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }),
    navIcon: {
      width: '24px',
      height: '24px',
      marginBottom: '4px',
      color: 'currentColor'
    }
  };

  // Render the current tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
      case 'past':
        return (
          <HomePage 
            drops={drops} 
            onSaveDrop={handleSaveDrop} 
            onRsvpChange={handleRsvpChange}
            activeTabProp={activeTab}
          />
        );
      // Photos tab removed
      case 'friends':
        return (
          <div style={{ textAlign: 'center', padding: '40px 16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Friends</h2>
            <p style={{ color: '#64748b' }}>Friends feature coming soon!</p>
          </div>
        );
      default:
        return <HomePage drops={drops} onSaveDrop={handleSaveDrop} />;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {renderTabContent()}
      </div>

      {/* Bottom Navigation */}
      <div style={styles.navigation}>
        <button 
          style={styles.navButton(activeTab === 'home')} 
          onClick={() => setActiveTab('home')}
        >
          <svg style={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </button>
        <button 
          style={styles.navButton(activeTab === 'past')} 
          onClick={() => setActiveTab('past')}
        >
          <svg style={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Past</span>
        </button>
        {/* Photos tab removed */}
        <button 
          style={styles.navButton(activeTab === 'friends')} 
          onClick={() => setActiveTab('friends')}
        >
          <svg style={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Friends</span>
        </button>
      </div>
    </div>
  );
}

export default App;
