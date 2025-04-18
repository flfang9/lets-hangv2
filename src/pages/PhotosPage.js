import React, { useState } from 'react';

const PhotosPage = ({ drops }) => {
  const [selectedDrop, setSelectedDrop] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // Collect all photos from all drops
  const allPhotos = drops.flatMap(drop => 
    (drop.photos || []).map(photo => ({
      ...photo,
      dropId: drop.id,
      dropTitle: drop.title,
      dropEmoji: drop.emoji
    }))
  );
  
  // Sort photos by date (newest first)
  const sortedPhotos = [...allPhotos].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  
  // Group photos by drop
  const photosByDrop = drops.reduce((acc, drop) => {
    if (drop.photos && drop.photos.length > 0) {
      acc[drop.id] = {
        dropInfo: {
          id: drop.id,
          title: drop.title,
          emoji: drop.emoji,
          date: drop.date,
          vibe: drop.vibe
        },
        photos: drop.photos
      };
    }
    return acc;
  }, {});
  
  // Handle selecting a specific drop for filtering
  const handleSelectDrop = (dropId) => {
    setSelectedDrop(dropId === selectedDrop ? null : dropId);
    setSelectedPhoto(null);
  };
  
  // Handle selecting a photo to view in detail
  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
  };
  
  // Handle closing the photo detail view
  const handleClosePhotoDetail = () => {
    setSelectedPhoto(null);
  };
  
  // Get the photos to display based on current filters
  const getPhotosToDisplay = () => {
    if (selectedDrop) {
      return photosByDrop[selectedDrop]?.photos || [];
    }
    return sortedPhotos;
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
      fontSize: '24px',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '16px',
      textAlign: 'center'
    },
    dropFilter: {
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      padding: '8px 4px',
      marginBottom: '16px',
      WebkitOverflowScrolling: 'touch',
      msOverflowStyle: '-ms-autohiding-scrollbar',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    dropFilterButton: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 12px',
      backgroundColor: isSelected ? '#dbeafe' : '#f8fafc',
      border: `1px solid ${isSelected ? '#93c5fd' : '#e2e8f0'}`,
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: isSelected ? '600' : '500',
      color: isSelected ? '#2563eb' : '#64748b',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      flexShrink: 0
    }),
    dropEmoji: {
      fontSize: '18px',
      marginRight: '2px'
    },
    photoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '12px',
      padding: '0 4px'
    },
    photoCard: {
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      aspectRatio: '1/1',
      cursor: 'pointer',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-out',
      '&:hover': {
        transform: 'scale(1.02)'
      }
    },
    photoImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    photoInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '8px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
      color: 'white',
      fontSize: '12px',
      fontWeight: '500'
    },
    photoCaption: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    dropHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 8px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      marginBottom: '12px'
    },
    dropTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1e293b'
    },
    dropDate: {
      fontSize: '14px',
      color: '#64748b',
      marginLeft: 'auto'
    },
    emptyState: {
      textAlign: 'center',
      padding: '32px 16px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      color: '#64748b',
      marginTop: '16px'
    },
    photoDetail: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      animation: 'fadeIn 0.2s ease-out'
    },
    photoDetailHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      color: 'white'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      cursor: 'pointer'
    },
    photoDetailContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px'
    },
    photoDetailImg: {
      maxWidth: '100%',
      maxHeight: '70vh',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    photoDetailInfo: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      padding: '16px',
      borderRadius: '12px',
      marginTop: '16px',
      color: 'white',
      maxWidth: '600px',
      width: '100%'
    },
    photoDetailCaption: {
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '8px'
    },
    photoDetailMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.7)'
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Photos</h1>
        
        {/* Filter by drop */}
        <div style={styles.dropFilter}>
          <button 
            style={{
              ...styles.dropFilterButton(selectedDrop === null),
              backgroundColor: selectedDrop === null ? '#e0f2fe' : '#f8fafc',
              fontWeight: selectedDrop === null ? '600' : '500',
              color: selectedDrop === null ? '#0284c7' : '#64748b'
            }}
            onClick={() => setSelectedDrop(null)}
          >
            All Photos
          </button>
          
          {Object.values(photosByDrop).map(({ dropInfo }) => (
            <button
              key={dropInfo.id}
              style={{
                ...styles.dropFilterButton(selectedDrop === dropInfo.id)
              }}
              onClick={() => handleSelectDrop(dropInfo.id)}
            >
              <span style={styles.dropEmoji} role="img" aria-label={`Event emoji: ${dropInfo.emoji}`}>
                {dropInfo.emoji}
              </span>
              {dropInfo.title}
            </button>
          ))}
        </div>
      </header>
      
      <main>
        {selectedDrop && photosByDrop[selectedDrop] && (
          <div style={styles.dropHeader}>
            <span style={styles.dropEmoji} role="img" aria-label={`Event emoji: ${photosByDrop[selectedDrop].dropInfo.emoji}`}>
              {photosByDrop[selectedDrop].dropInfo.emoji}
            </span>
            <h2 style={styles.dropTitle}>{photosByDrop[selectedDrop].dropInfo.title}</h2>
            <span style={styles.dropDate}>{formatDate(photosByDrop[selectedDrop].dropInfo.date)}</span>
          </div>
        )}
        
        {getPhotosToDisplay().length > 0 ? (
          <div style={styles.photoGrid}>
            {getPhotosToDisplay().map((photo) => (
              <div 
                key={photo.id} 
                style={{
                  ...styles.photoCard,
                  transform: 'scale(1)',
                  ':hover': { transform: 'scale(1.02)' }
                }}
                onClick={() => handleSelectPhoto(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption || 'Event photo'} 
                  style={styles.photoImg} 
                  loading="lazy"
                />
                <div style={styles.photoInfo}>
                  <div style={styles.photoCaption}>{photo.caption}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p>No photos found for this event yet.</p>
            <p style={{ marginTop: '8px', fontSize: '14px' }}>Photos will appear here once shared by event attendees.</p>
          </div>
        )}
      </main>
      
      {/* Photo Detail View */}
      {selectedPhoto && (
        <div style={styles.photoDetail}>
          <div style={styles.photoDetailHeader}>
            <div>
              <span role="img" aria-label="Back">←</span> Back to gallery
            </div>
            <button style={styles.closeButton} onClick={handleClosePhotoDetail}>×</button>
          </div>
          <div style={styles.photoDetailContent}>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption || 'Event photo'} 
              style={styles.photoDetailImg} 
            />
            <div style={styles.photoDetailInfo}>
              <div style={styles.photoDetailCaption}>{selectedPhoto.caption}</div>
              <div style={styles.photoDetailMeta}>
                <div>By {selectedPhoto.uploadedBy}</div>
                <div>{formatDate(selectedPhoto.timestamp)} at {formatTime(selectedPhoto.timestamp)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosPage;
