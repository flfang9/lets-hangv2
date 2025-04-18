import React from 'react';

const DropCard = ({ drop, onClick }) => {
  const { emoji, title, date, location, friendsCount, isHost, vibe = 'chill', friends = [] } = drop;
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Format time relative to now
  const getRelativeTime = (dateString) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffDays = Math.round((eventDate - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;
    
    return formatDate(dateString).split(',')[0]; // Just the day name
  };

  // Get border color based on vibe
  const getBorderColor = (vibe) => {
    const vibeColors = {
      chill: '#facc15', // yellow-400
      silly: '#4ade80', // green-400
      sweaty: '#f87171', // red-400
      talky: '#60a5fa', // blue-400
      spontaneous: '#c084fc' // purple-400
    };
    return vibeColors[vibe] || '#d1d5db'; // gray-300 default
  };

  const getTextColor = (vibe) => {
    const textColors = {
      chill: '#854d0e', // yellow-800
      silly: '#166534', // green-800
      sweaty: '#991b1b', // red-800
      talky: '#1e40af', // blue-800
      spontaneous: '#6b21a8' // purple-800
    };
    return textColors[vibe] || '#1f2937'; // gray-800 default
  };

  const getBackgroundColor = (vibe) => {
    const bgColors = {
      chill: '#fef9c3', // yellow-100
      silly: '#dcfce7', // green-100
      sweaty: '#fee2e2', // red-100
      talky: '#dbeafe', // blue-100
      spontaneous: '#f3e8ff' // purple-100
    };
    return bgColors[vibe] || '#f3f4f6'; // gray-100 default
  };
  
  // Format time for display (e.g., "7:30 PM")
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const styles = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      borderLeft: `4px solid ${getBorderColor(vibe)}`,
      padding: '16px',
      paddingLeft: '20px',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s ease',
    },
    cardHover: {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    topRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    },
    emoji: {
      fontSize: '24px',
      marginRight: '4px'
    },
    contentContainer: {
      flex: 1
    },
    titleRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    title: {
      fontWeight: 600,
      fontSize: '18px',
      color: '#1f2937',
      lineHeight: 1.25
    },
    vibeTag: {
      fontSize: '12px',
      fontWeight: 500,
      color: getTextColor(vibe),
      backgroundColor: getBackgroundColor(vibe),
      padding: '2px 8px',
      borderRadius: '9999px'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      marginTop: '4px'
    },
    icon: {
      width: '14px',
      height: '14px',
      color: '#9ca3af'
    },
    infoText: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: 1.25
    },
    bold: {
      fontWeight: 500
    },
    metaRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '4px',
      paddingTop: '8px',
      borderTop: '1px solid #f3f4f6'
    },
    friendsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    friendsText: {
      fontSize: '12px'
    },
    friendsList: {
      color: '#9ca3af',
      marginLeft: '4px'
    },
    hostBadge: {
      fontSize: '12px',
      fontWeight: 500,
      backgroundColor: '#eff6ff',
      color: '#2563eb',
      padding: '2px 8px',
      borderRadius: '9999px'
    }
  };
  
  return (
    <div 
      style={styles.card} 
      onClick={onClick}
      onMouseOver={(e) => e.currentTarget.style.boxShadow = styles.cardHover.boxShadow}
      onMouseOut={(e) => e.currentTarget.style.boxShadow = styles.card.boxShadow}
    >
      <div style={styles.topRow}>
        <div style={styles.emoji}>
          <span role="img" aria-label={`Event emoji: ${emoji}`}>{emoji}</span>
        </div>
        <div style={styles.contentContainer}>
          <div style={styles.titleRow}>
            <h3 style={styles.title}>{title}</h3>
            <div style={styles.vibeTag}>
              {vibe.charAt(0).toUpperCase() + vibe.slice(1)}
            </div>
          </div>
          <div style={styles.infoRow}>
            <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p style={styles.infoText}>
              <span style={styles.bold}>{getRelativeTime(date)}</span> at {formatTime(date)}
            </p>
          </div>
          <div style={styles.infoRow}>
            <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p style={styles.infoText}>{location || 'Location TBD'}</p>
          </div>
        </div>
      </div>
      
      <div style={styles.metaRow}>
        <div style={styles.friendsContainer}>
          <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span style={styles.friendsText}>
            {friendsCount} {friendsCount === 1 ? 'friend' : 'friends'} going
            {friends.length > 0 && friends.length <= 3 && (
              <span style={styles.friendsList}>{friends.slice(0, 3).join(', ')}</span>
            )}
          </span>
        </div>
        {isHost && (
          <span style={styles.hostBadge}>Host</span>
        )}
      </div>
    </div>
  );
};

export default DropCard;
