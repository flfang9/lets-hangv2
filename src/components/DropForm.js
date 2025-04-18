import React, { useState, useEffect } from 'react';

const DropForm = ({ isOpen, onClose, onSave, initialDrop }) => {
  const [drop, setDrop] = useState({
    emoji: '🎉',
    title: '',
    date: '',
    location: '',
    friendsCount: 0,
    isHost: true,
    vibe: 'chill'
  });

  useEffect(() => {
    if (initialDrop) {
      setDrop(initialDrop);
    } else {
      setDrop({
        emoji: '🎉',
        title: '',
        date: '',
        location: '',
        friendsCount: 0,
        isHost: true,
        vibe: 'chill'
      });
    }
  }, [initialDrop, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrop((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmojiSelect = (emoji) => {
    setDrop((prev) => ({ ...prev, emoji }));
  };

  const handleVibeSelect = (vibe) => {
    setDrop((prev) => ({ ...prev, vibe }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...drop,
      id: initialDrop?.id || Date.now().toString()
    });
    onClose();
  };

  // Common emojis for events
  const commonEmojis = ['🎉', '🍔', '🍕', '🎮', '🏖️', '🏕️', '🎸', '🎬', '🏀', '⚽', '🎨', '📚'];

  // Vibe options with colors
  const vibeOptions = [
    { name: 'chill', label: 'Chill', color: 'yellow', bgColor: '#fef9c3', borderColor: '#facc15', textColor: '#854d0e' },
    { name: 'silly', label: 'Silly', color: 'green', bgColor: '#dcfce7', borderColor: '#4ade80', textColor: '#166534' },
    { name: 'sweaty', label: 'Sweaty', color: 'red', bgColor: '#fee2e2', borderColor: '#f87171', textColor: '#991b1b' },
    { name: 'talky', label: 'Talky', color: 'blue', bgColor: '#dbeafe', borderColor: '#60a5fa', textColor: '#1e40af' },
    { name: 'spontaneous', label: 'Spontaneous', color: 'purple', bgColor: '#f3e8ff', borderColor: '#c084fc', textColor: '#6b21a8' },
  ];

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px 16px',
      width: '100%',
      maxWidth: '28rem',
      margin: '0 16px',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#1f2937'
    },
    closeButton: {
      color: '#6b7280',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    },
    closeIcon: {
      width: '24px',
      height: '24px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      color: '#6b7280'
    },
    emojiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '8px'
    },
    emojiButton: (isSelected) => ({
      fontSize: '24px',
      padding: '8px',
      borderRadius: '12px',
      border: isSelected ? '2px solid #2563eb' : '1px solid #e5e7eb',
      backgroundColor: isSelected ? '#eff6ff' : 'transparent',
      cursor: 'pointer'
    }),
    selectedEmoji: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '4px'
    },
    emojiPreview: {
      fontSize: '24px',
      marginRight: '8px'
    },
    emojiLabel: {
      fontSize: '12px',
      color: '#6b7280'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      outlineColor: '#2563eb'
    },
    vibeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px'
    },
    vibeButton: (vibe, selected) => ({
      padding: '8px',
      fontSize: '12px',
      border: `1px solid ${selected ? vibe.borderColor : '#e5e7eb'}`,
      borderRadius: '12px',
      backgroundColor: selected ? vibe.bgColor : 'transparent',
      color: selected ? vibe.textColor : '#4b5563',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }),
    buttonGroup: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px'
    },
    cancelButton: {
      flex: 1,
      padding: '12px 0',
      color: '#4b5563',
      fontWeight: 500,
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    submitButton: {
      flex: 1,
      padding: '12px 0',
      backgroundColor: '#2563eb',
      color: 'white',
      fontWeight: 500,
      borderRadius: '12px',
      border: 'none',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {initialDrop ? 'Edit Drop' : 'Create Drop'}
          </h2>
          <button 
            onClick={onClose}
            style={styles.closeButton}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={styles.closeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Emoji</label>
            <div style={styles.emojiGrid}>
              {commonEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  style={styles.emojiButton(drop.emoji === emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div style={styles.selectedEmoji}>
              <span style={styles.emojiPreview}>{drop.emoji}</span>
              <span style={styles.emojiLabel}>Selected emoji</span>
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={drop.title}
              onChange={handleChange}
              style={styles.input}
              placeholder="What's happening?"
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="date" style={styles.label}>Date & Time</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={drop.date}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="location" style={styles.label}>Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={drop.location}
              onChange={handleChange}
              style={styles.input}
              placeholder="Where?"
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Vibe</label>
            <div style={styles.vibeGrid}>
              {vibeOptions.map((vibe) => (
                <button
                  key={vibe.name}
                  type="button"
                  onClick={() => handleVibeSelect(vibe.name)}
                  style={styles.vibeButton(vibe, drop.vibe === vibe.name)}
                >
                  {vibe.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.submitButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              {initialDrop ? 'Save Changes' : 'Create Drop'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DropForm;
