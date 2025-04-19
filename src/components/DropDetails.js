import React, { useState } from 'react';
import RsvpButtons from './RsvpButtons';
import RsvpExpanded from './RsvpExpanded';
import { RSVP_STATUS } from '../data/sampleDrops';

const DropDetails = ({ 
  drop, 
  onClose, 
  onEditClick, 
  onRsvpChange,
  showRsvpExpanded,
  setShowRsvpExpanded
}) => {
  const { 
    emoji, 
    title, 
    date, 
    location, 
    friendsCount, 
    isHost, 
    vibe = 'chill', 
    friends = [], 
    yourRsvp = RSVP_STATUS.NO_RESPONSE,
    rsvpNote = '',
    friendsRsvp = [] 
  } = drop;
  
  // Check if the event date is in the past
  const isEventPast = () => {
    const eventDate = new Date(date);
    const currentDate = new Date();
    return eventDate < currentDate;
  };
  
  // Format date and time with proper formatting
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

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
  
  const [copied, setCopied] = useState(false);
  
  // Generate shareable link
  const getShareableLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/event/${drop.id}`;
  };
  
  // Handle copy to clipboard
  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const link = getShareableLink();
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '16px'
    },
    container: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      border: '1px solid #e2e8f0',
      animation: 'fadeIn 0.2s ease-out'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #f1f5f9',
      padding: '16px',
      borderLeft: `4px solid ${getVibeBorderColor(vibe)}`,
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      backgroundColor: '#f8fafc'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#64748b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      transition: 'background-color 0.15s ease',
      ':hover': {
        backgroundColor: '#f1f5f9'
      }
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      flex: 1
    },
    emoji: {
      fontSize: '28px',
      marginRight: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      backgroundColor: `${getVibeBorderColor(vibe)}15`, // Using the vibe color with 15% opacity
      borderRadius: '12px'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1e293b',
      margin: 0
    },
    content: {
      padding: '16px'
    },
    detailsSection: {
      marginBottom: '16px'
    },
    detailLabel: {
      fontWeight: '600',
      color: '#475569',
      marginBottom: '4px',
      fontSize: '14px'
    },
    detailValue: {
      color: '#334155',
      fontSize: '16px'
    },
    vibeTag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '8px',
      backgroundColor: `${getVibeBorderColor(vibe)}15`, // Using the vibe color with 15% opacity
      color: getVibeBorderColor(vibe),
      fontWeight: '600',
      fontSize: '14px',
      textTransform: 'capitalize'
    },
    friendsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px'
    },
    friendChip: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: '#f1f5f9',
      borderRadius: '20px',
      padding: '4px 10px',
      fontSize: '14px',
      color: '#475569'
    },
    friendAvatar: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      color: '#475569'
    },
    hostBadge: {
      backgroundColor: '#eff6ff',
      color: '#3b82f6',
      padding: '2px 8px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      marginTop: '16px',
      display: 'inline-block'
    },
    shareButton: {
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      fontWeight: '500',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'background-color 0.15s ease',
    },
    shareButtonCopied: {
      backgroundColor: '#dcfce7',
      color: '#16a34a',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      fontWeight: '500',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'background-color 0.15s ease',
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '20px',
      padding: '16px',
      borderTop: '1px solid #f1f5f9'
    },
    detailsButton: {
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      fontWeight: '500',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'background-color 0.15s ease',
      ':hover': {
        backgroundColor: '#e2e8f0'
      }
    },
    editButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'background-color 0.15s ease',
      ':hover': {
        backgroundColor: '#2563eb'
      }
    },
    rsvpContainer: {
      marginTop: '16px',
      borderTop: '1px solid #f1f5f9',
      paddingTop: '16px'
    }
  };
  
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.titleContainer}>
            <div style={styles.emoji}>{emoji}</div>
            <h2 style={styles.title}>{title}</h2>
          </div>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div style={styles.content}>
          <div style={styles.detailsSection}>
            <div style={styles.detailLabel}>Date & Time</div>
            <div style={styles.detailValue}>{formatDateTime(date)}</div>
          </div>
          
          <div style={styles.detailsSection}>
            <div style={styles.detailLabel}>Location</div>
            <div style={styles.detailValue}>{location}</div>
          </div>
          
          <div style={styles.detailsSection}>
            <div style={styles.detailLabel}>Vibe</div>
            <div style={styles.vibeTag}>
              <span>{getVibeEmoji(vibe)}</span>
              <span>{vibe}</span>
            </div>
          </div>
          
          <div style={styles.detailsSection}>
            <div style={styles.detailLabel}>Friends ({friendsCount})</div>
            <div style={styles.friendsContainer}>
              {friends.map((friend, index) => (
                <div key={index} style={styles.friendChip}>
                  <div style={styles.friendAvatar}>{friend.charAt(0)}</div>
                  <span>{friend}</span>
                </div>
              ))}
            </div>
          </div>
          
          {isHost && (
            <div style={styles.hostBadge}>You're hosting this event</div>
          )}
          
          <div style={styles.rsvpContainer}>
            <RsvpButtons 
              currentStatus={yourRsvp} 
              onStatusChange={(newStatus) => {
                if (onRsvpChange) {
                  onRsvpChange(newStatus, rsvpNote);
                }
              }}
              onExpandClick={() => setShowRsvpExpanded(!showRsvpExpanded)}
            />
            
            {showRsvpExpanded && (
              <RsvpExpanded 
                currentStatus={yourRsvp}
                note={rsvpNote}
                friendsRsvp={friendsRsvp || []}
                isEventPast={isEventPast()}
                photoLink={drop.photoLink || ''}
                onStatusChange={(newStatus) => {
                  if (onRsvpChange) {
                    onRsvpChange(newStatus, rsvpNote);
                  }
                }}
                onNoteChange={(newNote) => {
                  if (onRsvpChange) {
                    onRsvpChange(yourRsvp, newNote);
                  }
                }}
                onPhotoLinkChange={(newPhotoLink) => {
                  if (onRsvpChange) {
                    // We're using the RSVP change handler to also handle photo links
                    onRsvpChange(yourRsvp, rsvpNote, newPhotoLink);
                  }
                }}
                onClose={() => setShowRsvpExpanded(false)}
              />
            )}
          </div>
        </div>
        
        <div style={styles.actions}>
          <button 
            style={copied ? styles.shareButtonCopied : styles.shareButton}
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Share
              </>
            )}
          </button>
          
          {isHost && (
            <button 
              style={styles.editButton} 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onEditClick) onEditClick();
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.333 2.33301C11.5086 2.15741 11.7573 2.05713 12.0167 2.05713C12.276 2.05713 12.5247 2.15741 12.7003 2.33301C12.8759 2.5086 12.9762 2.75732 12.9762 3.01668C12.9762 3.27603 12.8759 3.52476 12.7003 3.70035L4.93367 11.467L3.33301 11.9997L3.86634 10.399L11.333 2.33301Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDetails;
