import React, { useState, useEffect } from 'react';
import DropCard from '../components/DropCard';
import CreateButton from '../components/CreateButton';
import DropForm from '../components/DropForm';
import DropDetails from '../components/DropDetails';

const HomePage = ({ drops, onSaveDrop, onRsvpChange, activeTabProp = 'home', onTogglePastView, forceOpenCreateForm = false, onCreateFormClose }) => {
  const [isDropFormOpen, setIsDropFormOpen] = useState(false);
  const [editingDrop, setEditingDrop] = useState(null);
  const [viewingDrop, setViewingDrop] = useState(null);
  const [showRsvpExpanded, setShowRsvpExpanded] = useState(false);
  // Use the prop from parent if provided
  const activeTab = activeTabProp;

  useEffect(() => {
    console.log('Current activeTabProp:', activeTabProp);
  }, [activeTabProp]);

  // Handle force open form from parent (Create tab)
  useEffect(() => {
    if (forceOpenCreateForm) {
      setEditingDrop(null);
      setIsDropFormOpen(true);
    }
  }, [forceOpenCreateForm]);

  const handleOpenCreateForm = () => {
    setEditingDrop(null);
    setIsDropFormOpen(true);
  };

  const handleSaveDrop = (drop) => {
    onSaveDrop(drop);
    handleCloseForm();
  };

  const handleRsvpStatusChange = (dropId, status, note, photoLink, keepExpanded) => {
    if (onRsvpChange) {
      onRsvpChange(dropId, status, note, photoLink);
      
      // If this is coming from a card and not the details view,
      // we might need to update the viewing drop to show the expanded state
      if (viewingDrop && viewingDrop.id === dropId) {
        // Update the local viewing drop to reflect changes immediately
        setViewingDrop({
          ...viewingDrop,
          yourRsvp: status,
          rsvpNote: note,
          photoLink: photoLink !== undefined ? photoLink : viewingDrop.photoLink
        });
      }
      
      // If keepExpanded is true, make sure the RSVP expanded view stays open
      if (keepExpanded) {
        setShowRsvpExpanded(true);
      }
    }
  };

  const handleViewDrop = (drop) => {
    setViewingDrop(drop);
  };
  
  const handleEditDrop = (drop) => {
    console.log('Edit drop called with:', drop);
    // Close the details view if it's open
    setViewingDrop(null);
    // Open the edit form with the selected drop
    setEditingDrop(drop);
    setIsDropFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsDropFormOpen(false);
    setEditingDrop(null);
    // Notify parent component if this was opened via Create tab
    if (onCreateFormClose && forceOpenCreateForm) {
      onCreateFormClose();
    }
  };
  
  const handleCloseDetails = () => {
    setViewingDrop(null);
    setShowRsvpExpanded(false);
  };

  // Format drops by date
  const sortedDrops = [...drops].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Get upcoming and past drops
  const now = new Date();
  const upcomingDrops = sortedDrops.filter(drop => new Date(drop.date) >= now);
  const pastDrops = sortedDrops.filter(drop => new Date(drop.date) < now);

  // Determine which drops to display based on active tab
  const dropsToDisplay = activeTab === 'home' ? upcomingDrops : pastDrops;
  
  // Handler for toggling between upcoming and past events within HomePage
  const togglePastEvents = () => {
    // Use the parent's setter if we're working with active tab from parent
    if (onTogglePastView) {
      onTogglePastView(activeTab === 'home' ? 'past' : 'home');
    }
  };

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
    },
    pastButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      padding: '8px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer'
    }
  };
  
  return (
    <div style={styles.container}>
      {isDropFormOpen ? (
        <DropForm 
          onSave={handleSaveDrop} 
          onClose={handleCloseForm} 
          initialDrop={editingDrop}
        />
      ) : viewingDrop ? (
        <DropDetails 
          drop={viewingDrop} 
          onClose={handleCloseDetails} 
          onEdit={() => handleEditDrop(viewingDrop)}
          onRsvpChange={(status, note, photoLink) => {
            if (onRsvpChange) {
              onRsvpChange(viewingDrop.id, status, note, photoLink);
              // Update the local viewing drop to reflect changes immediately
              setViewingDrop({
                ...viewingDrop,
                yourRsvp: status,
                rsvpNote: note,
                photoLink: photoLink !== undefined ? photoLink : viewingDrop.photoLink
              });
            }
          }}
          showRsvpExpanded={showRsvpExpanded}
          onToggleRsvpExpanded={() => setShowRsvpExpanded(!showRsvpExpanded)}
        />
      ) : (
        <>
          {/* Header removed to streamline UI */}
          
          <div style={styles.main}>
            <h2 style={styles.sectionTitle}>
              {activeTab === 'home' ? 'Upcoming Hangs' : 'Past Hangs'}
            </h2>
            
            {/* CREATE HANG button removed - functionality now only in Create tab */}
            
            {dropsToDisplay.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>
                  {activeTab === 'home' ? 'No upcoming hangs. Create one!' : 'No past hangs found.'}
                </p>
              </div>
            ) : (
              <div style={styles.dropsList}>
                {dropsToDisplay.map((drop) => (
                  <DropCard 
                    key={drop.id} 
                    drop={drop} 
                    onClick={() => handleViewDrop(drop)}
                    onRsvpChange={onRsvpChange}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
