import React from 'react';

const CreateButton = ({ onClick, isInline = false }) => {
  const baseButtonStyles = {
    backgroundColor: '#2563eb', // blue-600
    color: 'white',
    fontWeight: 600,
    borderRadius: '12px',
    padding: '12px 24px',
    textAlign: 'center',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    fontSize: '14px'
  };

  const styles = {
    button: isInline ? {
      ...baseButtonStyles,
      width: '100%',
      marginBottom: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    } : {
      ...baseButtonStyles,
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 50,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    buttonHover: {
      backgroundColor: '#1d4ed8' // blue-700
    }
  };

  return (
    <button
      onClick={onClick}
      style={styles.button}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
      aria-label="Create new hang"
    >
      <span>+ CREATE HANG</span>
    </button>
  );
};

export default CreateButton;
