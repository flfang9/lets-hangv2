import React from 'react';
import { RSVP_STATUS } from '../data/sampleDrops';

const RsvpButtons = ({ currentStatus, onStatusChange, isEnabled = true }) => {
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
      padding: '10px 16px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '15px',
      fontWeight: isActive ? '600' : '500',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      backgroundColor: isActive ? getRsvpColor(status, true) : '#f8fafc',
      color: isActive ? '#fff' : '#64748b',
      border: isActive ? 'none' : '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      flex: 1
    }),
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
      

    </div>
  );
};

export default RsvpButtons;
