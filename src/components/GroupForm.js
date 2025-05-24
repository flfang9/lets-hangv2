import React, { useState, useEffect } from 'react';

const GroupForm = ({ onSave, onCancel, friends, initialGroup = null }) => {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('👋');
  const [color, setColor] = useState('#3b82f6'); // Default blue
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);
  
  // Common emojis for groups
  const commonEmojis = ['👋', '🎮', '🍕', '🏃', '💪', '🍔', '🎯', '🎓', '🎬', '🍻', '☕', '🎭', '🏖️', '🏀', '⚽', '🎵'];
  
  // Color options
  const colorOptions = [
    { color: '#3b82f6', name: 'Blue' },
    { color: '#22c55e', name: 'Green' },
    { color: '#f97316', name: 'Orange' },
    { color: '#8b5cf6', name: 'Purple' },
    { color: '#ef4444', name: 'Red' },
    { color: '#f59e0b', name: 'Amber' }
  ];
  
  // Initialize form with existing group data if editing
  useEffect(() => {
    if (initialGroup) {
      setName(initialGroup.name || '');
      setEmoji(initialGroup.emoji || '👋');
      setColor(initialGroup.color || '#3b82f6');
      setSelectedFriendIds(initialGroup.members || []);
    }
  }, [initialGroup]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return; // Group name is required
    
    onSave({
      name: name.trim(),
      emoji,
      color,
      members: selectedFriendIds
    });
    
    // Reset form
    resetForm();
  };
  
  const resetForm = () => {
    setName('');
    setEmoji('👋');
    setColor('#3b82f6');
    setSelectedFriendIds([]);
  };
  
  const toggleFriendSelection = (friendId) => {
    setSelectedFriendIds(prev => 
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };
  
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '16px',
      width: '90%',
      maxWidth: '400px',
      maxHeight: '90vh',
      padding: '24px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      overflow: 'auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#334155'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '24px',
      color: '#64748b',
      cursor: 'pointer'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#475569'
    },
    input: {
      padding: '12px 16px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      fontSize: '16px'
    },
    emojiSection: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px'
    },
    emojiButton: (isSelected) => ({
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      borderRadius: '8px',
      cursor: 'pointer',
      backgroundColor: isSelected ? '#e2e8f0' : 'transparent',
      border: isSelected ? '2px solid #3b82f6' : '1px solid #e2e8f0'
    }),
    colorSection: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px'
    },
    colorButton: (colorValue, isSelected) => ({
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: colorValue,
      cursor: 'pointer',
      border: isSelected ? '2px solid #1e293b' : '2px solid transparent',
      boxShadow: isSelected ? '0 0 0 2px white' : 'none'
    }),
    friendsSection: {
      marginTop: '8px'
    },
    friendsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      maxHeight: '160px',
      overflowY: 'auto',
      padding: '4px'
    },
    friendItem: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: '10px',
      backgroundColor: isSelected ? '#dbeafe' : 'white',
      border: `1px solid ${isSelected ? '#93c5fd' : '#e2e8f0'}`,
      cursor: 'pointer'
    }),
    friendAvatar: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '14px',
      color: 'white',
      marginRight: '12px'
    },
    friendName: {
      fontWeight: '500',
      fontSize: '14px',
      color: '#334155'
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '24px'
    },
    cancelButton: {
      padding: '10px 16px',
      borderRadius: '10px',
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    },
    saveButton: {
      padding: '10px 16px',
      borderRadius: '10px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    selectedCount: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#64748b',
      marginTop: '8px'
    },
    required: {
      color: '#ef4444',
      marginLeft: '4px'
    }
  };
  
  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{initialGroup ? 'Edit Group' : 'Create Group'}</h2>
          <button style={styles.closeButton} onClick={onCancel}>×</button>
        </div>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="group-name">
              Group Name<span style={styles.required}>*</span>
            </label>
            <input
              id="group-name"
              type="text"
              placeholder="Enter group name"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Choose an Emoji
            </label>
            <div style={styles.emojiSection}>
              {commonEmojis.map((emojiOption) => (
                <div 
                  key={emojiOption}
                  style={styles.emojiButton(emoji === emojiOption)}
                  onClick={() => setEmoji(emojiOption)}
                >
                  {emojiOption}
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Choose a Color
            </label>
            <div style={styles.colorSection}>
              {colorOptions.map((option) => (
                <div 
                  key={option.color}
                  style={styles.colorButton(option.color, color === option.color)}
                  onClick={() => setColor(option.color)}
                  title={option.name}
                />
              ))}
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Select Friends ({selectedFriendIds.length} selected)
            </label>
            {friends.length > 0 ? (
              <div style={styles.friendsList}>
                {friends.map((friend) => (
                  <div 
                    key={friend.id}
                    style={styles.friendItem(selectedFriendIds.includes(friend.id))}
                    onClick={() => toggleFriendSelection(friend.id)}
                  >
                    <div style={{...styles.friendAvatar, backgroundColor: friend.color}}>
                      {friend.avatar}
                    </div>
                    <div style={styles.friendName}>{friend.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{padding: '12px', color: '#64748b', fontSize: '14px', textAlign: 'center'}}>
                No friends available. Add friends first!
              </div>
            )}
          </div>
          
          <div style={styles.actions}>
            <button 
              type="button" 
              style={styles.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={styles.saveButton}
              disabled={!name.trim() || selectedFriendIds.length === 0}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3337 5.33301L6.00033 12.6663L2.66699 9.33301" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {initialGroup ? 'Save Changes' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
