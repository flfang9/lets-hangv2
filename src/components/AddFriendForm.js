import React, { useState } from 'react';

const AddFriendForm = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return; // Name is required
    
    onAdd({
      name: name.trim(),
      phone: phone.trim(),
      lastHangout: '' // No hangout yet for new friends
    });
    
    // Reset form
    setName('');
    setPhone('');
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
      padding: '24px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
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
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '8px'
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
    addButton: {
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
    required: {
      color: '#ef4444',
      marginLeft: '4px'
    }
  };
  
  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add Friend</h2>
          <button style={styles.closeButton} onClick={onCancel}>×</button>
        </div>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="friend-name">
              Name<span style={styles.required}>*</span>
            </label>
            <input
              id="friend-name"
              type="text"
              placeholder="Enter friend's name"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="friend-phone">
              Phone (optional)
            </label>
            <input
              id="friend-phone"
              type="tel"
              placeholder="Enter phone number"
              style={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
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
              style={styles.addButton}
              disabled={!name.trim()}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.33301V12.6663" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33331 8H12.6666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Friend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriendForm;
