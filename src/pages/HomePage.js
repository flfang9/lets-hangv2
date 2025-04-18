import React, { useState } from 'react';
import DropCard from '../components/DropCard';
import CreateButton from '../components/CreateButton';
import DropForm from '../components/DropForm';

const HomePage = ({ drops, onSaveDrop, onRsvpChange, activeTabProp = 'home' }) => {
  const [isDropFormOpen, setIsDropFormOpen] = useState(false);
  const [editingDrop, setEditingDrop] = useState(null);
  // Use the prop from parent if provided
  const activeTab = activeTabProp;

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
                onRsvpChange={(status, note, photoLink) => onRsvpChange && onRsvpChange(drop.id, status, note, photoLink)}
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
