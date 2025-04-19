import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RsvpButtons from '../components/RsvpButtons';
import { RSVP_STATUS } from '../data/sampleDrops';

const SharedEventView = (props) => {
  const eventId = props.match.params.eventId;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userSet, setUserSet] = useState(false);
  const [copied, setCopied] = useState(false);
  const [yourRsvp, setYourRsvp] = useState(RSVP_STATUS.NO_RESPONSE);
  const [showNameInput, setShowNameInput] = useState(false);
  
  // Load event and user info on mount
  useEffect(() => {
    // Check if we have user info in localStorage
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
      setUserSet(true);
    }
    
    // Load event data from localStorage
    const savedDrops = localStorage.getItem('drops');
    if (savedDrops) {
      const parsedDrops = JSON.parse(savedDrops);
      const foundEvent = parsedDrops.find(drop => drop.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
        
        // Check if user has an existing RSVP for this event
        if (storedUser) {
          const userRsvp = foundEvent.friendsRsvp?.find(rsvp => rsvp.name === storedUser);
          if (userRsvp) {
            setYourRsvp(userRsvp.status);
          }
        }
      }
    }
    setLoading(false);
  }, [eventId]);
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleString('en-US', options);
  };
  
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem('userName', userName.trim());
      setUserSet(true);
      setShowNameInput(false);
    }
  };
  
  const handleRsvpChange = (status) => {
    if (!userSet) {
      setShowNameInput(true);
      return;
    }
    
    setYourRsvp(status);
    
    // Update the RSVP in localStorage
    const savedDrops = localStorage.getItem('drops');
    if (savedDrops && event) {
      const parsedDrops = JSON.parse(savedDrops);
      const updatedDrops = parsedDrops.map(drop => {
        if (drop.id === eventId) {
          // Check if user already has an RSVP
          const existingRsvpIndex = drop.friendsRsvp?.findIndex(rsvp => rsvp.name === userName);
          
          if (existingRsvpIndex >= 0 && drop.friendsRsvp) {
            // Update existing RSVP
            const updatedFriendsRsvp = [...drop.friendsRsvp];
            updatedFriendsRsvp[existingRsvpIndex] = {
              ...updatedFriendsRsvp[existingRsvpIndex],
              status
            };
            return { ...drop, friendsRsvp: updatedFriendsRsvp };
          } else {
            // Add new RSVP
            const updatedFriendsRsvp = [
              ...(drop.friendsRsvp || []),
              { name: userName, status, note: '' }
            ];
            return { ...drop, friendsRsvp: updatedFriendsRsvp };
          }
        }
        return drop;
      });
      
      localStorage.setItem('drops', JSON.stringify(updatedDrops));
      
      // Update the current event state
      const updatedEvent = updatedDrops.find(drop => drop.id === eventId);
      if (updatedEvent) {
        setEvent(updatedEvent);
      }
    }
  };
  
  if (loading) {
    return <div style={styles.loading}>Loading event...</div>;
  }
  
  if (!event) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>
          <h2>Event Not Found</h2>
          <p>Sorry, we couldn't find the event you're looking for.</p>
          <Link to="/" style={styles.homeLink}>Go to Home</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.container}>
      {showNameInput && (
        <div style={styles.nameOverlay}>
          <div style={styles.nameModal}>
            <h3 style={styles.nameTitle}>What's your name?</h3>
            <form onSubmit={handleNameSubmit} style={styles.nameForm}>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                style={styles.nameInput}
                autoFocus
              />
              <button type="submit" style={styles.nameButton}>Continue</button>
            </form>
          </div>
        </div>
      )}
      
      <div style={styles.header}>
        <Link to="/" style={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <h1 style={styles.appTitle}>Let's Hang</h1>
      </div>
      
      <div style={styles.eventCard}>
        <div style={styles.eventHeader}>
          <div style={styles.emojiContainer}>{event.emoji}</div>
          <h2 style={styles.eventTitle}>{event.title}</h2>
        </div>
        
        <div style={styles.eventDetail}>
          <div style={styles.detailIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <span style={styles.detailText}>{formatDate(event.date)}</span>
        </div>
        
        <div style={styles.eventDetail}>
          <div style={styles.detailIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <span style={styles.detailText}>{event.location}</span>
        </div>
        
        <div style={styles.vibeContainer}>
          <span style={getVibeStyle(event.vibe)}>{event.vibe}</span>
        </div>
        
        <div style={styles.attendeesContainer}>
          <h3 style={styles.attendeesTitle}>Who's coming</h3>
          <div style={styles.attendeesList}>
            {event.friendsRsvp && event.friendsRsvp.filter(rsvp => rsvp.status === RSVP_STATUS.GOING).map(rsvp => (
              <div key={rsvp.name} style={styles.attendee}>
                <span>{rsvp.name}</span>
                <span style={styles.rsvpStatus}>Going</span>
              </div>
            ))}
            {event.friendsRsvp && event.friendsRsvp.filter(rsvp => rsvp.status === RSVP_STATUS.MAYBE).map(rsvp => (
              <div key={rsvp.name} style={styles.attendee}>
                <span>{rsvp.name}</span>
                <span style={styles.rsvpStatusMaybe}>Maybe</span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.rsvpSection}>
          <h3 style={styles.rsvpTitle}>Your response</h3>
          {userSet ? (
            <div style={styles.rsvpName}>Responding as <strong>{userName}</strong></div>
          ) : (
            <button onClick={() => setShowNameInput(true)} style={styles.setNameButton}>
              Set your name
            </button>
          )}
          <RsvpButtons 
            currentStatus={yourRsvp} 
            onStatusChange={handleRsvpChange} 
            isPast={new Date(event.date) < new Date()}
          />
        </div>
        
        <div style={styles.shareSection}>
          <button onClick={handleCopyLink} style={styles.shareButton}>
            {copied ? 'Copied!' : 'Copy link to share'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get vibe style
const getVibeStyle = (vibe) => {
  const baseStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'capitalize'
  };
  
  const vibeStyles = {
    chill: {
      ...baseStyle,
      backgroundColor: '#fef9c3',
      color: '#854d0e',
      border: '1px solid #facc15'
    },
    silly: {
      ...baseStyle,
      backgroundColor: '#dcfce7',
      color: '#166534',
      border: '1px solid #4ade80'
    },
    sweaty: {
      ...baseStyle,
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #f87171'
    },
    talky: {
      ...baseStyle,
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      border: '1px solid #60a5fa'
    },
    spontaneous: {
      ...baseStyle,
      backgroundColor: '#f3e8ff',
      color: '#6b21a8',
      border: '1px solid #c084fc'
    }
  };
  
  return vibeStyles[vibe] || baseStyle;
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '16px',
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#4b5563'
  },
  notFound: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginTop: '40px'
  },
  homeLink: {
    display: 'inline-block',
    marginTop: '16px',
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    position: 'relative'
  },
  backLink: {
    position: 'absolute',
    left: '0',
    color: '#4b5563',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  appTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '16px',
    marginBottom: '16px'
  },
  eventHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  emojiContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginRight: '12px'
  },
  eventTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  eventDetail: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  detailIcon: {
    width: '24px',
    height: '24px',
    marginRight: '12px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailText: {
    fontSize: '16px',
    color: '#4b5563'
  },
  vibeContainer: {
    marginBottom: '16px'
  },
  attendeesContainer: {
    marginBottom: '24px',
    borderTop: '1px solid #e5e7eb',
    paddingTop: '16px'
  },
  attendeesTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px'
  },
  attendeesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  attendee: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  rsvpStatus: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#15803d'
  },
  rsvpStatusMaybe: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#ca8a04'
  },
  rsvpSection: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '16px',
    marginBottom: '24px'
  },
  rsvpTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px'
  },
  rsvpName: {
    marginBottom: '12px',
    fontSize: '16px',
    color: '#4b5563'
  },
  setNameButton: {
    backgroundColor: '#f1f5f9',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    marginBottom: '12px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  shareSection: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '16px',
    display: 'flex',
    justifyContent: 'center'
  },
  shareButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  nameOverlay: {
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
  nameModal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    width: '90%',
    maxWidth: '400px'
  },
  nameTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1f2937',
    textAlign: 'center'
  },
  nameForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  nameInput: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '16px'
  },
  nameButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default SharedEventView;
