import React, { useState, useEffect } from 'react';
import sampleFriends from '../data/sampleFriends';
import sampleFriendGroups from '../data/sampleFriendGroups';

const DropForm = ({ isOpen, onClose, onSave, initialDrop }) => {
  const [friends] = useState(sampleFriends);
  const [friendGroups] = useState(sampleFriendGroups);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [drop, setDrop] = useState({
    emoji: '🎉',
    title: '',
    date: '',
    location: '',
    friendsCount: 0,
    isHost: true,
    vibe: 'chill',
    friends: []
  });

  useEffect(() => {
    if (initialDrop) {
      setDrop(initialDrop);
      // If editing an existing drop, set the selected friends
      if (initialDrop.friends && initialDrop.friends.length > 0) {
        setSelectedFriends(initialDrop.friends);
      }
    } else {
      setDrop({
        emoji: '🎉',
        title: '',
        date: '',
        location: '',
        friendsCount: 0,
        isHost: true,
        vibe: 'chill',
        friends: []
      });
      setSelectedFriends([]);
      setSelectedGroups([]);
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

  // Toggle friend selection
  const toggleFriendSelection = (friendName) => {
    setSelectedFriends(prev => 
      prev.includes(friendName)
        ? prev.filter(name => name !== friendName)
        : [...prev, friendName]
    );
  };

  // Toggle group selection and add/remove all members
  const toggleGroupSelection = (groupId) => {
    // Check if group is already selected
    const isGroupSelected = selectedGroups.includes(groupId);
    
    // Find the group
    const group = friendGroups.find(g => g.id === groupId);
    if (!group) return;
    
    if (isGroupSelected) {
      // Unselect the group
      setSelectedGroups(prev => prev.filter(id => id !== groupId));
      
      // Get group member names
      const memberIds = group.members;
      const memberNames = friends
        .filter(friend => memberIds.includes(friend.id))
        .map(friend => friend.name);
      
      // Remove friends that are only in this group and not in other selected groups
      const otherGroupMemberIds = selectedGroups
        .filter(id => id !== groupId)
        .flatMap(id => {
          const g = friendGroups.find(g => g.id === id);
          return g ? g.members : [];
        });
      
      const otherGroupMemberNames = friends
        .filter(friend => otherGroupMemberIds.includes(friend.id))
        .map(friend => friend.name);
      
      // Keep friends that are in other selected groups
      setSelectedFriends(prev => 
        prev.filter(name => 
          !memberNames.includes(name) || otherGroupMemberNames.includes(name)
        )
      );
    } else {
      // Select the group
      setSelectedGroups(prev => [...prev, groupId]);
      
      // Get friend names from the group member IDs
      const memberNames = friends
        .filter(friend => group.members.includes(friend.id))
        .map(friend => friend.name);
      
      // Add all the members to selected friends (without duplicates)
      setSelectedFriends(prev => {
        const combined = [...prev, ...memberNames];
        return [...new Set(combined)]; // Remove duplicates
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...drop,
      id: initialDrop?.id || Date.now().toString(),
      friends: selectedFriends,
      friendsCount: selectedFriends.length
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
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      fontSize: '16px',
      boxSizing: 'border-box'
    },
    vibeGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    vibeButton: (isSelected, vibe) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: '16px',
      backgroundColor: isSelected ? vibe.bgColor : 'white',
      border: `1px solid ${isSelected ? vibe.borderColor : '#e5e7eb'}`,
      color: isSelected ? vibe.textColor : '#6b7280',
      fontWeight: isSelected ? 600 : 500,
      fontSize: '14px',
      cursor: 'pointer'
    }),
    friendsSections: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    friendsHeader: {
      fontWeight: 600,
      fontSize: '16px',
      color: '#374151',
      marginBottom: '8px'
    },
    groupsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    groupButton: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px 12px',
      borderRadius: '16px',
      backgroundColor: isSelected ? '#eff6ff' : 'white',
      border: `1px solid ${isSelected ? '#93c5fd' : '#e5e7eb'}`,
      color: isSelected ? '#1e40af' : '#4b5563',
      fontWeight: isSelected ? 600 : 500,
      fontSize: '14px',
      cursor: 'pointer'
    }),
    groupEmoji: {
      marginRight: '4px'
    },
    friendsList: {
      maxHeight: '200px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '4px 0'
    },
    friendItem: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: '10px',
      backgroundColor: isSelected ? '#f3f4f6' : 'white',
      border: `1px solid ${isSelected ? '#d1d5db' : '#e5e7eb'}`,
      cursor: 'pointer'
    }),
    friendName: {
      marginLeft: '8px',
      fontSize: '14px',
      color: '#374151'
    },
    submitButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: '16px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{initialDrop ? 'Edit Hang' : 'Create Hang'}</h2>
          <button style={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Emoji selection */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Pick an emoji</label>
            <div style={styles.emojiGrid}>
              {commonEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  style={styles.emojiButton(emoji === drop.emoji)}
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Title field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={drop.title}
              onChange={handleChange}
              placeholder="What's the plan?"
              style={styles.input}
              required
            />
          </div>

          {/* Date and time */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>When?</label>
            <input
              type="datetime-local"
              name="date"
              value={drop.date}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Location */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Where?</label>
            <input
              type="text"
              name="location"
              value={drop.location}
              onChange={handleChange}
              placeholder="Meeting spot"
              style={styles.input}
              required
            />
          </div>

          {/* Vibe selection */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Vibe</label>
            <div style={styles.vibeGrid}>
              {vibeOptions.map((vibe) => (
                <button
                  key={vibe.name}
                  type="button"
                  style={styles.vibeButton(drop.vibe === vibe.name, vibe)}
                  onClick={() => handleVibeSelect(vibe.name)}
                >
                  {vibe.label}
                </button>
              ))}
            </div>
          </div>

          {/* Friends selection */}
          <div style={styles.friendsSections}>
            <div>
              <label style={styles.friendsHeader}>Groups</label>
              <div style={styles.groupsList}>
                {friendGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    style={styles.groupButton(selectedGroups.includes(group.id))}
                    onClick={() => toggleGroupSelection(group.id)}
                  >
                    <span style={styles.groupEmoji}>{group.emoji}</span>
                    {group.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={styles.friendsHeader}>Friends ({selectedFriends.length})</label>
              <div style={styles.friendsList}>
                {friends.map((friend) => (
                  <div
                    key={friend.name}
                    style={styles.friendItem(selectedFriends.includes(friend.name))}
                    onClick={() => toggleFriendSelection(friend.name)}
                  >
                    <span>{friend.emoji}</span>
                    <span style={styles.friendName}>{friend.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            {initialDrop ? 'Save Changes' : 'Create Hang'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DropForm;
