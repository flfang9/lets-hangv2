import React from 'react';
import { RSVP_STATUS } from '../data/sampleDrops';

const RsvpButtons = ({ currentStatus, onStatusChange, onExpandClick }) => {
  const styles = {
    container: {
      marginTop: '12px',
      borderTop: '1px solid #f1f5f9',
      paddingTop: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    buttonsGroup: {
      display: 'flex',
      gap: '8px'
    },
    rsvpButton: (status, isActive) => ({
      padding: '6px 12px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '13px',
      fontWeight: isActive ? '600' : '500',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      backgroundColor: isActive ? getRsvpColor(status, true) : '#f8fafc',
      color: isActive ? '#fff' : '#64748b',
      border: isActive ? 'none' : '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }),
    expandButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#64748b',
      fontSize: '13px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: '6px',
      transition: 'background-color 0.15s ease',
      ':hover': {
        backgroundColor: '#f1f5f9'
      }
    },
    statusIndicator: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '6px'
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
  
  return (
    <div style={styles.container}>
      <div style={styles.buttonsGroup}>
        <button 
          style={styles.rsvpButton(RSVP_STATUS.GOING, currentStatus === RSVP_STATUS.GOING)}
          onClick={() => onStatusChange(RSVP_STATUS.GOING)}
        >
          {getRsvpIcon(RSVP_STATUS.GOING)} Going
        </button>
        <button 
          style={styles.rsvpButton(RSVP_STATUS.MAYBE, currentStatus === RSVP_STATUS.MAYBE)}
          onClick={() => onStatusChange(RSVP_STATUS.MAYBE)}
        >
          {getRsvpIcon(RSVP_STATUS.MAYBE)} Maybe
        </button>
        <button 
          style={styles.rsvpButton(RSVP_STATUS.NOT_GOING, currentStatus === RSVP_STATUS.NOT_GOING)}
          onClick={() => onStatusChange(RSVP_STATUS.NOT_GOING)}
        >
          {getRsvpIcon(RSVP_STATUS.NOT_GOING)} No
        </button>
      </div>
      
      <button 
        style={styles.expandButton}
        onClick={onExpandClick}
      >
        Details
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default RsvpButtons;
