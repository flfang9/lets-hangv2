import React, { useState } from 'react';
import sampleFriends from '../data/sampleFriends';
import sampleFriendGroups from '../data/sampleFriendGroups';
import AddFriendForm from '../components/AddFriendForm';
import GroupForm from '../components/GroupForm';

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState('friends'); // 'friends' or 'groups'
  const [friends, setFriends] = useState(sampleFriends);
  const [groups, setGroups] = useState(sampleFriendGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  
  // Filter friends based on search query
  const filteredFriends = searchQuery
    ? friends.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : friends;
    
  // Filter groups based on search query
  const filteredGroups = searchQuery
    ? groups.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : groups;
  
  const handleAddFriend = (newFriend) => {
    // Generate a simple ID (in a real app, this would be handled by the backend)
    const newId = (Math.max(...friends.map(f => parseInt(f.id))) + 1).toString();
    
    // Create a friend object with default avatar (first letter of name)
    const friendToAdd = {
      ...newFriend,
      id: newId,
      avatar: newFriend.name.charAt(0),
      // Assign a random color from a predefined set
      color: ['#4ade80', '#f472b6', '#3b82f6', '#f97316', '#8b5cf6', '#06b6d4'][
        Math.floor(Math.random() * 6)
      ]
    };
    
    setFriends([...friends, friendToAdd]);
    setShowAddForm(false);
  };
  
  const handleAddGroup = (newGroup) => {
    // Generate a simple ID
    const newId = (Math.max(...groups.map(g => parseInt(g.id))) + 1).toString();
    
    // Create a group object
    const groupToAdd = {
      ...newGroup,
      id: newId
    };
    
    if (editingGroup) {
      // Update existing group
      setGroups(groups.map(group => 
        group.id === editingGroup.id ? {...groupToAdd, id: group.id} : group
      ));
    } else {
      // Add new group
      setGroups([...groups, groupToAdd]);
    }
    
    setShowGroupForm(false);
    setEditingGroup(null);
  };
  
  const handleEditGroup = (group) => {
    setEditingGroup(group);
    setShowGroupForm(true);
  };
  
  const styles = {
    container: {
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #e2e8f0',
      marginBottom: '16px'
    },
    tab: (isActive) => ({
      padding: '12px 16px',
      fontWeight: isActive ? '600' : '500',
      color: isActive ? '#3b82f6' : '#64748b',
      borderBottom: isActive ? '2px solid #3b82f6' : 'none',
      cursor: 'pointer',
      fontSize: '16px'
    }),
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e293b'
    },
    searchBar: {
      padding: '10px 16px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      fontSize: '16px',
      width: '100%',
      backgroundColor: '#f8fafc'
    },
    friendsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '8px'
    },
    friendCard: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: '12px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0'
    },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '16px',
      color: 'white',
      marginRight: '12px'
    },
    details: {
      flex: 1
    },
    name: {
      fontWeight: '600',
      fontSize: '16px',
      color: '#334155'
    },
    phone: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '2px'
    },
    lastHangout: {
      fontSize: '12px',
      color: '#94a3b8',
      marginTop: '2px'
    },
    createButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#3b82f6',
      color: 'white',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: 'none',
      cursor: 'pointer',
      zIndex: 10
    },
    groupCard: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: '12px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0'
    },
    groupEmoji: {
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '20px',
      marginRight: '12px'
    },
    groupDetails: {
      flex: 1
    },
    groupName: {
      fontWeight: '600',
      fontSize: '16px',
      color: '#334155'
    },
    memberCount: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '2px'
    },
    editButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#64748b',
      padding: '6px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    noResults: {
      textAlign: 'center',
      padding: '24px',
      color: '#64748b',
      fontSize: '16px'
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Friends</h1>
      </div>
      
      <div style={styles.tabs}>
        <div 
          style={styles.tab(activeTab === 'friends')} 
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </div>
        <div 
          style={styles.tab(activeTab === 'groups')} 
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </div>
      </div>
      
      <input
        type="text"
        placeholder={activeTab === 'friends' ? "Search friends..." : "Search groups..."}
        style={styles.searchBar}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {activeTab === 'friends' ? (
        // Friends list
        filteredFriends.length > 0 ? (
          <div style={styles.friendsList}>
            {filteredFriends.map(friend => (
              <div key={friend.id} style={styles.friendCard}>
                <div style={{...styles.avatar, backgroundColor: friend.color}}>
                  {friend.avatar}
                </div>
                <div style={styles.details}>
                  <div style={styles.name}>{friend.name}</div>
                  <div style={styles.phone}>{friend.phone}</div>
                  <div style={styles.lastHangout}>
                    Last hang: {formatDate(friend.lastHangout)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noResults}>
            {searchQuery ? 'No friends match your search' : 'No friends yet'}
          </div>
        )
      ) : (
        // Groups list
        filteredGroups.length > 0 ? (
          <div style={styles.friendsList}>
            {filteredGroups.map(group => (
              <div key={group.id} style={styles.groupCard}>
                <div style={{...styles.groupEmoji, backgroundColor: `${group.color}20`}}>
                  {group.emoji}
                </div>
                <div style={styles.groupDetails}>
                  <div style={styles.groupName}>{group.name}</div>
                  <div style={styles.memberCount}>
                    {group.members.length} {group.members.length === 1 ? 'friend' : 'friends'}
                  </div>
                </div>
                <button 
                  style={styles.editButton}
                  onClick={() => handleEditGroup(group)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.333 2.333C11.5086 2.1574 11.7573 2.0571 12.0167 2.0571C12.276 2.0571 12.5247 2.1574 12.7003 2.333C12.8759 2.5086 12.9762 2.7573 12.9762 3.0167C12.9762 3.276 12.8759 3.5248 12.7003 3.7004L4.9337 11.467L3.3337 12L3.8667 10.399L11.333 2.333Z" stroke="currentColor" strokeWidth="1.3333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noResults}>
            {searchQuery ? 'No groups match your search' : 'No groups yet'}
          </div>
        )
      )}
      
      <button 
        style={styles.createButton}
        onClick={() => activeTab === 'friends' ? setShowAddForm(true) : setShowGroupForm(true)}
      >
        +
      </button>
      
      {showAddForm && (
        <AddFriendForm 
          onAdd={handleAddFriend}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      {showGroupForm && (
        <GroupForm
          onSave={handleAddGroup}
          onCancel={() => {
            setShowGroupForm(false);
            setEditingGroup(null);
          }}
          friends={friends}
          initialGroup={editingGroup}
        />
      )}
    </div>
  );
};

export default FriendsPage;
