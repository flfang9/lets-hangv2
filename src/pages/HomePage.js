import React, { useState } from 'react';
import DropCard from '../components/DropCard';
import CreateButton from '../components/CreateButton';
import DropForm from '../components/DropForm';

const HomePage = ({ drops, onSaveDrop }) => {
  const [isDropFormOpen, setIsDropFormOpen] = useState(false);
  const [editingDrop, setEditingDrop] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleOpenCreateForm = () => {
    setEditingDrop(null);
    setIsDropFormOpen(true);
  };

  const handleEditDrop = (drop) => {
    setEditingDrop(drop);
    setIsDropFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsDropFormOpen(false);
    setEditingDrop(null);
  };

  // Format drops by date
  const sortedDrops = [...drops].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Get upcoming and past drops
  const now = new Date();
  const upcomingDrops = sortedDrops.filter(drop => new Date(drop.date) >= now);
  const pastDrops = sortedDrops.filter(drop => new Date(drop.date) < now);

  // Determine which drops to display based on active tab
  const dropsToDisplay = activeTab === 'home' ? upcomingDrops : pastDrops;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 10,
      paddingTop: '8px',
      paddingBottom: '12px',
      borderBottom: '1px solid #e5e7eb'
    },
    title: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#1f2937',
      textAlign: 'center',
      paddingBottom: '16px'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    tabButton: (isActive) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      padding: '8px 24px',
      borderRadius: '8px',
      color: isActive ? '#2563eb' : '#4b5563',
      backgroundColor: isActive ? '#eff6ff' : 'transparent',
      fontWeight: isActive ? 500 : 400,
      border: 'none',
      cursor: 'pointer'
    }),
    icon: {
      width: '20px',
      height: '20px'
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      paddingTop: '8px',
      paddingBottom: '8px',
      marginBottom: '80px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1f2937',
      padding: '0 4px'
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      padding: '16px',
      textAlign: 'center'
    },
    emptyText: {
      fontSize: '14px',
      color: '#6b7280'
    },
    dropsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  };
  
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Let's Hang</h1>
        <nav style={styles.nav}>
          <button 
            style={styles.tabButton(activeTab === 'home')}
            onClick={() => setActiveTab('home')}
          >
            <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </button>
          <button 
            style={styles.tabButton(activeTab === 'past')}
            onClick={() => setActiveTab('past')}
          >
            <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Past</span>
          </button>
          <button style={styles.tabButton(false)}>
            <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Photos</span>
          </button>
          <button style={styles.tabButton(false)}>
            <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Friends</span>
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        <CreateButton onClick={handleOpenCreateForm} isInline={true} />
        <h2 style={styles.sectionTitle}>
          {activeTab === 'home' ? 'Upcoming Drops' : 'Past Drops'}
        </h2>
        {dropsToDisplay.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>
              {activeTab === 'home' ? 'No upcoming drops. Create one!' : 'No past drops.'}
            </p>
          </div>
        ) : (
          <div style={styles.dropsList}>
            {dropsToDisplay.map((drop) => (
              <DropCard 
                key={drop.id} 
                drop={drop} 
                onClick={() => handleEditDrop(drop)} 
              />
            ))}
          </div>
        )}
      </main>
      
      <DropForm 
        isOpen={isDropFormOpen}
        onClose={handleCloseForm}
        onSave={onSaveDrop}
        initialDrop={editingDrop}
      />
    </div>
  );
};

export default HomePage;
