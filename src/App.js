import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import FriendsPage from './pages/FriendsPage';
import DropForm from './components/DropForm';
import sampleDrops from './data/sampleDrops';
import { initViewportFix } from './utils/viewportFix';
import './styles/responsive.css';

function App() {
  // Local state to store drops
  const [drops, setDrops] = useState([]);
  // Active tab state
  const [activeTab, setActiveTab] = useState('home');

  // Load drops from localStorage on initial render
  useEffect(() => {
    // Initialize the viewport fix for mobile
    initViewportFix();
    
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
  const handleRsvpChange = (dropId, status, note, photoLink, keepExpanded = false) => {
    setDrops(prevDrops => {
      return prevDrops.map(drop => {
        if (drop.id === dropId) {
          // Get current user name (hardcoded as 'You' for this demo)
          const userName = 'You';
          
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
          
          // Also update or add the current user's RSVP in the friendsRsvp array
          // so other attendees can see your note
          let updatedFriendsRsvp = [...(drop.friendsRsvp || [])];
          
          // Check if current user already has an entry
          const userIndex = updatedFriendsRsvp.findIndex(friend => friend.name === userName);
          
          if (userIndex >= 0) {
            // Update existing entry
            updatedFriendsRsvp[userIndex] = {
              ...updatedFriendsRsvp[userIndex],
              status,
              note,
              photoLink: photoLink !== undefined ? photoLink : updatedFriendsRsvp[userIndex].photoLink
            };
          } else if (status !== 'no_response' || note) {
            // Add new entry only if there's a response or note
            updatedFriendsRsvp.push({
              name: userName,
              status,
              note,
              photoLink: photoLink
            });
          }
          
          updates.friendsRsvp = updatedFriendsRsvp;
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
      width: '100%',
      margin: '0 auto',
      padding: '16px',
      paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      maxWidth: '600px',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    modalHeading: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      padding: '16px',
      borderBottom: '1px solid #e5e7eb',
      margin: 0
    },
    closeButton: {
      position: 'absolute',
      top: '12px',
      right: '16px',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '24px',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '4px 8px',
      borderRadius: '4px'
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
    tabs: {
      display: 'flex',
      marginBottom: '20px',
      borderBottom: '1px solid #e2e8f0',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none', /* Firefox */
      msOverflowStyle: 'none', /* Internet Explorer/Edge */
    },
    tabButton: {
      background: 'none',
      border: 'none',
      padding: '12px 20px',
      fontSize: '16px',
      fontWeight: '500',
      color: '#64748b',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      borderBottom: '2px solid transparent',
      marginRight: '8px',
      minHeight: '44px', /* Touch-friendly size */
      whiteSpace: 'nowrap',
      WebkitTapHighlightColor: 'transparent', /* Remove tap highlight on iOS */
    },
    activeTab: {
      borderBottom: '2px solid #2563eb',
      color: '#2563eb',
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

  // State to control create form visibility from App level
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Updated approach: Create tab opens the DropForm for proper creation
  const handleCreateClick = () => {
    // Set state to force the HomePage to open the create form
    setShowCreateForm(true);
    
    // Switch to home tab where the form will be displayed
    setActiveTab('home');
  };
  
  // Handle when the create form is closed
  const handleCreateFormClose = () => {
    setShowCreateForm(false);
  };

  // Handle closing the create form - no longer needed as HomePage will handle this

  // Render the current tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
      case 'past':
      case 'create': // Create tab shows the home page in the background
        return (
          <HomePage 
            drops={drops} 
            onSaveDrop={handleSaveDrop} 
            onRsvpChange={handleRsvpChange}
            activeTabProp={activeTab}
            onTogglePastView={setActiveTab}
            forceOpenCreateForm={showCreateForm}
            onCreateFormClose={handleCreateFormClose}
          />
        );
      // Photos tab removed
      case 'friends':
        return <FriendsPage />;
      default:
        return <HomePage drops={drops} onSaveDrop={handleSaveDrop} />;
    }
  };

  return (
    <div style={styles.container} className="has-bottom-nav">
      <div style={styles.tabs}>
        <button 
          style={{...styles.tabButton, ...(activeTab === 'home' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('home')}
          className="touch-button"
        >
          Home
        </button>
        <button 
          style={{...styles.tabButton, ...(activeTab === 'past' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('past')}
          className="touch-button"
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Past
          </div>
        </button>
      </div>
      <div style={styles.content}>
        {renderTabContent()}
        
        {/* No need for a global DropForm - we're redirecting to Home */}
      </div>

      {/* Desktop Navigation (hidden on mobile) */}
      <div style={styles.navigation} className="desktop-only">
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
      
      {/* Mobile bottom navigation */}
      <div className="mobile-nav mobile-only">
        <button 
          onClick={() => setActiveTab('home')} 
          style={{
            color: activeTab === 'home' ? '#2563eb' : '#64748b',
            background: 'none',
            border: 'none',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0',
            width: '33%',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={activeTab === 'home' ? '#2563eb' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12h6v10" stroke={activeTab === 'home' ? '#2563eb' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Home</span>
        </button>
        <button 
          onClick={handleCreateClick} 
          style={{
            color: activeTab === 'create' ? '#2563eb' : '#64748b',
            background: 'none',
            border: 'none',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0',
            width: '33%',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke={activeTab === 'create' ? '#2563eb' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8v8M8 12h8" stroke={activeTab === 'create' ? '#2563eb' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Create</span>
        </button>
        <button 
          onClick={() => setActiveTab('friends')} 
          style={{
            color: activeTab === 'friends' ? '#2563eb' : '#64748b',
            background: 'none',
            border: 'none',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0',
            width: '33%',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={activeTab === 'friends' ? '#2563eb' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke={activeTab === 'friends' ? '#2563eb' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={activeTab === 'friends' ? '#2563eb' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Friends</span>
        </button>
      </div>
    </div>
  );
}

export default App;
