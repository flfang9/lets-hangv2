import React, { useState } from 'react';
import { RSVP_STATUS } from '../data/sampleDrops';

const RsvpButtons = ({ currentStatus, onStatusChange, onExpandClick, isPast = false, isEnabled = true }) => {
  const styles = {
    container: {
      marginTop: '12px',
      paddingTop: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    buttonsGroup: {
      display: 'flex',
      gap: '10px',
      width: '100%'
    },
    rsvpButton: (status, isActive) => ({
      padding: '12px 16px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '15px',
      fontWeight: isActive ? '600' : '500',
      cursor: isPast ? 'default' : 'pointer',
      opacity: isPast ? 0.7 : 1,
      transition: 'all 0.15s ease',
      backgroundColor: isActive ? getRsvpColor(status, true) : '#f8fafc',
      color: isActive ? '#fff' : '#64748b',
      border: isActive ? 'none' : '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      flex: 1,
      touchAction: 'manipulation'
    }),
    statusIndicator: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '6px'
    },
    detailsButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      padding: '10px 16px',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '500',
      width: '100%',
      marginTop: '12px'
    }
  };
  
  const getRsvpColor = (status, isBg = false) => {
    const colors = {
      [RSVP_STATUS.GOING]: isBg ? '#22c55e' : '#22c55e',       // Green
      [RSVP_STATUS.MAYBE]: isBg ? '#f59e0b' : '#f59e0b',       // Amber
      [RSVP_STATUS.NOT_GOING]: isBg ? '#ef4444' : '#ef4444',   // Red
      [RSVP_STATUS.NO_RESPONSE]: isBg ? '#94a3b8' : '#94a3b8'  // Slate
    };
    return colors[status] || colors[RSVP_STATUS.NO_RESPONSE];
  };
  
  const getRsvpIcon = (status) => {
    switch (status) {
      case RSVP_STATUS.GOING:
        return '✓';
      case RSVP_STATUS.MAYBE:
        return '?';
      case RSVP_STATUS.NOT_GOING:
        return '✕';
      default:
        return '';
    }
  };
  
  const handleStatusClick = (status) => {
    if (isPast) return; // Prevent changing RSVP for past events
    
    // Call the parent's onStatusChange
    onStatusChange(status);
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonsGroup}>
        <button 
          style={styles.rsvpButton(RSVP_STATUS.GOING, currentStatus === RSVP_STATUS.GOING)}
          onClick={() => handleStatusClick(RSVP_STATUS.GOING)}
          disabled={isPast}
          aria-label="Going"
        >
          {getRsvpIcon(RSVP_STATUS.GOING)} Going
        </button>
        <button 
          style={styles.rsvpButton(RSVP_STATUS.MAYBE, currentStatus === RSVP_STATUS.MAYBE)}
          onClick={() => handleStatusClick(RSVP_STATUS.MAYBE)}
          disabled={isPast}
          aria-label="Maybe"
        >
          {getRsvpIcon(RSVP_STATUS.MAYBE)} Maybe
        </button>
        <button 
          style={styles.rsvpButton(RSVP_STATUS.NOT_GOING, currentStatus === RSVP_STATUS.NOT_GOING)}
          onClick={() => handleStatusClick(RSVP_STATUS.NOT_GOING)}
          disabled={isPast}
          aria-label="No"
        >
          {getRsvpIcon(RSVP_STATUS.NOT_GOING)} No
        </button>
      </div>
      
      {currentStatus !== RSVP_STATUS.NO_RESPONSE && onExpandClick && (
        <button 
          style={styles.detailsButton}
          onClick={onExpandClick}
          aria-label="View details"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          More Details
        </button>
      )}
    </div>
  );
};

export default RsvpButtons;
