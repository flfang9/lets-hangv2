import React, { useState } from 'react';
import { RSVP_STATUS } from '../data/sampleDrops';

const RsvpExpanded = ({ 
  currentStatus, 
  note, 
  friendsRsvp, 
  onStatusChange, 
  onNoteChange, 
  onClose,
  photoLink = '',
  onPhotoLinkChange,
  isEventPast = false
}) => {
  const [localNote, setLocalNote] = useState(note || '');
  const [localPhotoLink, setLocalPhotoLink] = useState(photoLink || '');
  const [noteSaved, setNoteSaved] = useState(false);
  
  const handleNoteChange = (e) => {
    setLocalNote(e.target.value);
    setNoteSaved(false);
  };
  
  const handleNoteSave = () => {
    onNoteChange(localNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000); // Hide success message after 2 seconds
  };
  
  const handleNoteBlur = () => {
    // Note: We're keeping onBlur for backward compatibility
    onNoteChange(localNote);
  };
  
  const handleNoteKeyDown = (e) => {
    // Save note when pressing Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleNoteSave();
    }
  };
  
  const handlePhotoLinkChange = (e) => {
    setLocalPhotoLink(e.target.value);
  };
  
  const handlePhotoLinkBlur = () => {
    if (onPhotoLinkChange) {
      onPhotoLinkChange(localPhotoLink);
    }
  };
  
  const styles = {
    container: {
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      padding: '16px',
      marginTop: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0',
      animation: 'fadeIn 0.2s ease-out'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    title: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#334155'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#64748b',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.15s ease',
      ':hover': {
        backgroundColor: '#e2e8f0'
      }
    },

    noteSection: {
      marginBottom: '16px'
    },
    noteLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#475569',
      marginBottom: '6px',
      display: 'block'
    },
    photoLinkHelper: {
      fontSize: '12px',
      fontWeight: 'normal',
      color: '#94a3b8',
      display: 'block',
      marginTop: '2px'
    },
    urlInput: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      color: '#334155',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      transition: 'border-color 0.15s ease',
      outline: 'none',
      ':focus': {
        borderColor: '#93c5fd'
      }
    },
    noteInput: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      color: '#334155',
      resize: 'none',
      minHeight: '80px',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      transition: 'border-color 0.15s ease',
      outline: 'none',
      ':focus': {
        borderColor: '#93c5fd'
      }
    },
    friendsSection: {
      marginTop: '20px'
    },
    friendsHeader: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#475569',
      marginBottom: '8px'
    },
    friendsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      maxHeight: '180px',
      overflowY: 'auto',
      padding: '6px 0'
    },
    friendItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 8px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      border: '1px solid #e2e8f0'
    },
    friendName: {
      fontWeight: '500',
      color: '#334155',
      marginRight: '8px'
    },
    statusBadge: (status) => ({
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      borderRadius: '99px',
      backgroundColor: getRsvpColorLight(status),
      color: getRsvpColor(status),
      fontSize: '12px',
      fontWeight: '600',
      marginLeft: 'auto'
    }),
    friendNote: {
      marginTop: '4px',
      fontSize: '12px',
      color: '#64748b',
      fontStyle: 'italic'
    }
  };
  
  const getRsvpColor = (status, isBg = false) => {
    const colors = {
      [RSVP_STATUS.GOING]: isBg ? '#22c55e' : '#16a34a',       // Green
      [RSVP_STATUS.MAYBE]: isBg ? '#f59e0b' : '#d97706',       // Amber
      [RSVP_STATUS.NOT_GOING]: isBg ? '#ef4444' : '#dc2626',   // Red
      [RSVP_STATUS.NO_RESPONSE]: isBg ? '#94a3b8' : '#64748b'  // Slate
    };
    return colors[status] || colors[RSVP_STATUS.NO_RESPONSE];
  };
  
  const getRsvpColorLight = (status) => {
    const colors = {
      [RSVP_STATUS.GOING]: '#dcfce7',     // Green light
      [RSVP_STATUS.MAYBE]: '#fef3c7',     // Amber light
      [RSVP_STATUS.NOT_GOING]: '#fee2e2',  // Red light
      [RSVP_STATUS.NO_RESPONSE]: '#f1f5f9' // Slate light
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
        return '-';
    }
  };
  
  const rsvpStatusText = {
    [RSVP_STATUS.GOING]: 'Going',
    [RSVP_STATUS.MAYBE]: 'Maybe',
    [RSVP_STATUS.NOT_GOING]: 'Not Going',
    [RSVP_STATUS.NO_RESPONSE]: 'No Response'
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>RSVP Details</h3>
        <button style={styles.closeButton} onClick={onClose}>×</button>
      </div>
      

      
      <div style={styles.noteSection}>
        <label style={styles.noteLabel} htmlFor="rsvp-note">Add a note (optional)</label>
        <textarea 
          id="rsvp-note"
          style={styles.noteInput}
          value={localNote}
          onChange={handleNoteChange}
          onKeyDown={handleNoteKeyDown}
          onBlur={handleNoteBlur}
          placeholder="Enter any additional details... (Ctrl+Enter to save)"
        />
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center'}}>
          <button 
            type="button"
            onClick={handleNoteSave}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Save Note
          </button>
          {noteSaved && (
            <div style={{color: '#16a34a', fontSize: '14px', fontWeight: '500'}}>
              ✓ Note saved
            </div>
          )}
        </div>
      </div>
      
      {/* Photo link section - only shown for past events */}
      {isEventPast && (
        <div style={styles.noteSection}>
          <label style={styles.noteLabel} htmlFor="photo-link">
            Shared Photo Album Link (optional)
            <span style={styles.photoLinkHelper}>Google Photos, Apple Photos, etc.</span>
          </label>
          <input 
            id="photo-link"
            type="url"
            style={styles.urlInput}
            value={localPhotoLink}
            onChange={handlePhotoLinkChange}
            onBlur={handlePhotoLinkBlur}
            placeholder="https://photos.app.goo.gl/..."
          />
        </div>
      )}
      
      {friendsRsvp && friendsRsvp.length > 0 && (
        <div style={styles.friendsSection}>
          <h4 style={styles.friendsHeader}>Friends' RSVPs</h4>
          <div style={styles.friendsList}>
            {friendsRsvp.map((friend, index) => (
              <div key={`${friend.name}-${index}`} style={styles.friendItem}>
                <span style={styles.friendName}>{friend.name}</span>
                <span style={styles.statusBadge(friend.status)}>
                  {rsvpStatusText[friend.status]}
                </span>
                {friend.note && (
                  <div style={styles.friendNote}>"{friend.note}"</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RsvpExpanded;
