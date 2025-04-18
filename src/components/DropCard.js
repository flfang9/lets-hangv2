import React, { useState, useEffect, useRef } from 'react';

const DropCard = ({ drop, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const { emoji, title, date, location, friendsCount, isHost, vibe = 'chill', friends = [] } = drop;
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Note: formatDate is kept for future use
  // formatDate is still used for formatting in formatDateTime

  // Get border color based on vibe
  const getVibeBorderColor = (vibe) => {
    const vibeColors = {
      chill: '#4ade80', // green-500
      silly: '#f472b6', // pink-400
      sweaty: '#ef4444', // red-500
      talky: '#60a5fa', // blue-400
      spontaneous: '#f97316', // orange-500
    };
    return vibeColors[vibe] || '#cbd5e1'; // Default to slate-300
  };

  const getVibeEmoji = (vibe) => {
    const vibeEmojis = {
      chill: '😌',
      silly: '🤪',
      sweaty: '💪',
      talky: '💬',
      spontaneous: '⚡️'
    };
    return vibeEmojis[vibe] || '👀';
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Day and month formatting
    const month = date.toLocaleString('default', { month: 'short' });
    const dayNum = date.getDate();
    const dayName = date.toLocaleString('default', { weekday: 'short' });
    
    // Time formatting
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if it's today, tomorrow, or within the week
    if (date.toDateString() === today.toDateString()) {
      return (
        <>
          <span style={styles.timeHighlight}>Today</span>
          <span style={styles.timeDetail}>{time}</span>
        </>
      );
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return (
        <>
          <span style={styles.timeHighlight}>Tomorrow</span>
          <span style={styles.timeDetail}>{time}</span>
        </>
      );
    } else if (date - today < 7 * 24 * 60 * 60 * 1000) {
      // Within a week
      return (
        <>
          <span style={styles.timeHighlight}>{dayName}</span>
          <span style={styles.timeDetail}>{time}</span>
        </>
      );
    } else {
      return (
        <>
          <span style={styles.timeHighlight}>{dayName}, {month} {dayNum}</span>
          <span style={styles.timeDetail}>{time}</span>
        </>
      );
    }
  };

  const formatFriends = (friends, totalCount) => {
    if (!friends || friends.length === 0) return null;
    
    // Show up to 3 friend avatars
    const displayedFriends = friends.slice(0, 3);
    const remainingCount = totalCount - displayedFriends.length;
    
    return (
      <div style={styles.friendsContainer}>
        <div style={styles.avatarGroup}>
          {displayedFriends.map((friend, index) => (
            <div 
              key={index} 
              style={{
                ...styles.avatar,
                zIndex: displayedFriends.length - index,
                marginLeft: index > 0 ? '-8px' : '0'
              }}
              title={friend}
            >
              {friend.charAt(0)}
            </div>
          ))}
          {remainingCount > 0 && (
            <div style={styles.avatarMore} title={`${remainingCount} more friends`}>
              +{remainingCount}
            </div>
          )}
        </div>
        <div style={styles.friendsText}>{totalCount} {totalCount === 1 ? 'friend' : 'friends'}</div>
      </div>
    );
  };

  const styles = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '12px',
      marginBottom: '16px',
      cursor: 'pointer',
      position: 'relative',
      borderLeft: `4px solid ${getVibeBorderColor(vibe)}`,
      transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out, opacity 0.4s ease-out',
      opacity: isVisible ? 1 : 0,
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.12)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      gap: '8px'
    },
    emoji: {
      fontSize: '24px',
      marginRight: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      backgroundColor: `${getVibeBorderColor(vibe)}15`, // Using the vibe color with 15% opacity
      borderRadius: '10px',
      transition: 'transform 0.15s ease-in-out',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0',
      color: '#1e293b', // slate-800
      flex: '1'
    },
    dateContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      gap: '5px',
    },
    dateIcon: {
      color: '#94a3b8', // slate-400
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      marginRight: '4px',
    },
    dateTime: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      color: '#64748b', // slate-500
      marginBottom: '5px',
    },
    timeHighlight: {
      fontWeight: '500',
      color: '#334155', // slate-700
    },
    timeDetail: {
      color: '#64748b', // slate-500
    },
    location: {
      fontSize: '14px',
      color: '#64748b', // slate-500
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    meta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    friendsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    avatarGroup: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: '#e2e8f0', // slate-200
      color: '#475569', // slate-600
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      border: '1.5px solid white',
    },
    avatarMore: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: '#f1f5f9', // slate-100
      color: '#64748b', // slate-500
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: '600',
      marginLeft: '-8px',
      border: '1.5px solid white',
    },
    friendsText: {
      fontSize: '14px',
      color: '#64748b', // slate-500
    },
    host: {
      fontSize: '14px',
      color: '#2563eb', // blue-600
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    hostBadge: {
      fontSize: '11px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dbeafe', // blue-100
      color: '#2563eb', // blue-600
      padding: '2px 8px',
      borderRadius: '9999px'
    },
    vibeBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      backgroundColor: `${getVibeBorderColor(vibe)}15`, // Using the vibe color with 15% opacity
      color: getVibeBorderColor(vibe),
      padding: '2px 6px',
      borderRadius: '8px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'capitalize',
    }
  };
  
  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.header}>
        <span 
          style={styles.emoji}
          role="img"
          aria-label={`Event emoji: ${emoji}`}
        >
          {emoji}
        </span>
        <h3 style={styles.title}>{title}</h3>
      </div>
      
      <div style={styles.dateTime}>
        <svg style={styles.dateIcon} width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M4.5 3.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-8zm-2 1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-9z"/>
          <path fill="currentColor" d="M11.5 8.5a.5.5 0 0 0 0-1h-6a.5.5 0 0 0 0 1h6z"/>
          <path fill="currentColor" d="M8.5 11.5a.5.5 0 0 0 0-1h-3a.5.5 0 0 0 0 1h3z"/>
          <path fill="currentColor" d="M5.5 2a.5.5 0 0 0-1 0v2.5a.5.5 0 0 0 1 0V2z"/>
          <path fill="currentColor" d="M12.5 2a.5.5 0 0 0-1 0v2.5a.5.5 0 0 0 1 0V2z"/>
        </svg>
        {formatDateTime(date)}
      </div>
      
      <div style={styles.location}>
        <svg style={styles.dateIcon} width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M8 2a4 4 0 0 0-4 4c0 3 4 9 4 9s4-6 4-9a4 4 0 0 0-4-4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
        </svg>
        {location}
      </div>
      
      <div style={styles.meta}>
        {formatFriends(friends, friendsCount)}
        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
          <div style={styles.vibeBadge}>
            <span>{getVibeEmoji(vibe)}</span>
            <span>{vibe}</span>
          </div>
          {isHost && (
            <div style={styles.hostBadge}>
              Host
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropCard;
