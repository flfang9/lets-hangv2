// Sample data for Let's Hang app

// RSVP status options
export const RSVP_STATUS = {
  GOING: 'going',
  MAYBE: 'maybe',
  NOT_GOING: 'not_going',
  NO_RESPONSE: 'no_response'
};

// Sample photo images (using placeholder images)
const PLACEHOLDER_IMAGES = [
  'https://source.unsplash.com/random/800x600/?pizza',
  'https://source.unsplash.com/random/800x600/?party',
  'https://source.unsplash.com/random/800x600/?friends',
  'https://source.unsplash.com/random/800x600/?food',
  'https://source.unsplash.com/random/800x600/?drinks',
  'https://source.unsplash.com/random/800x600/?restaurant',
  'https://source.unsplash.com/random/800x600/?run',
  'https://source.unsplash.com/random/800x600/?coffee',
  'https://source.unsplash.com/random/800x600/?park',
  'https://source.unsplash.com/random/800x600/?game',
  'https://source.unsplash.com/random/800x600/?videogame',
  'https://source.unsplash.com/random/800x600/?gaming'
];

const sampleDrops = [
  {
    id: '0',
    emoji: '🎮',
    title: 'Game Night at Riley\'s',
    date: '2025-04-01T19:00', // Past event date
    location: 'Riley\'s Apartment, 42 Oak St',
    friendsCount: 4,
    isHost: false,
    vibe: 'silly',
    friends: ['Riley', 'Quinn', 'Sam', 'Casey'],
    yourRsvp: RSVP_STATUS.GOING,
    rsvpNote: 'Brought snacks!',
    photoLink: 'https://photos.app.goo.gl/examplelink123', // Your photo link
    friendsRsvp: [
      { 
        name: 'Riley', 
        status: RSVP_STATUS.GOING, 
        note: 'Can\'t wait to destroy everyone at Mario Kart!',
        photoLink: 'https://photos.google.com/share/AF1QipMxample'
      },
      { 
        name: 'Quinn', 
        status: RSVP_STATUS.GOING, 
        note: 'Bringing extra controllers',
        photoLink: 'https://share.icloud.com/photos/example2'
      },
      { 
        name: 'Sam', 
        status: RSVP_STATUS.GOING 
      },
      { 
        name: 'Casey', 
        status: RSVP_STATUS.MAYBE, 
        note: 'Might be late' 
      }
    ],
    photos: [
      {
        id: '001',
        url: PLACEHOLDER_IMAGES[10],
        caption: 'Epic game night!',
        uploadedBy: 'Riley',
        timestamp: '2025-04-01T21:30:00'
      },
      {
        id: '002',
        url: PLACEHOLDER_IMAGES[11],
        caption: 'Victory pose',
        uploadedBy: 'Quinn',
        timestamp: '2025-04-01T22:15:00'
      }
    ]
  },
  {
    id: '1',
    emoji: '🍕',
    title: 'Pizza Night at Roberta\'s',
    date: '2025-04-19T19:00',
    location: 'Roberta\'s Pizza, 261 Moore St',
    friendsCount: 5,
    isHost: true,
    vibe: 'chill',
    friends: ['Alex', 'Jamie', 'Taylor', 'Morgan', 'Jordan'],
    yourRsvp: RSVP_STATUS.GOING,
    rsvpNote: '',
    friendsRsvp: [
      { name: 'Alex', status: RSVP_STATUS.GOING },
      { name: 'Jamie', status: RSVP_STATUS.GOING },
      { name: 'Taylor', status: RSVP_STATUS.GOING },
      { name: 'Morgan', status: RSVP_STATUS.GOING },
      { name: 'Jordan', status: RSVP_STATUS.GOING }
    ],
    photos: [
      {
        id: '101',
        url: PLACEHOLDER_IMAGES[0],
        caption: 'Pizza party vibes',
        uploadedBy: 'Alex',
        timestamp: '2025-04-19T20:00:00'
      },
      {
        id: '102',
        url: PLACEHOLDER_IMAGES[1],
        caption: 'Roberta\'s Pizza is the best',
        uploadedBy: 'Jamie',
        timestamp: '2025-04-19T21:00:00'
      }
    ]
  },
  {
    id: '2',
    emoji: '🏃',
    title: 'Morning Run + Coffee',
    date: '2025-04-20T07:30',
    location: 'Central Park Reservoir',
    friendsCount: 2,
    isHost: false,
    vibe: 'sweaty',
    friends: ['Chris', 'Pat'],
    yourRsvp: RSVP_STATUS.MAYBE,
    rsvpNote: '',
    friendsRsvp: [
      { name: 'Chris', status: RSVP_STATUS.GOING },
      { name: 'Pat', status: RSVP_STATUS.GOING, note: 'Will bring water bottles' }
    ],
    photos: [
      {
        id: '201',
        url: PLACEHOLDER_IMAGES[6],
        caption: 'Early morning vibes',
        uploadedBy: 'Chris',
        timestamp: '2025-04-20T08:45:00'
      },
      {
        id: '202',
        url: PLACEHOLDER_IMAGES[7],
        caption: 'Post-run coffee hit different',
        uploadedBy: 'Pat',
        timestamp: '2025-04-20T09:30:00'
      }
    ]
  },
  {
    id: '3',
    emoji: '🎮',
    title: 'Game Night: Mario Kart',
    date: '2025-04-21T20:00',
    location: 'My Place',
    friendsCount: 6,
    isHost: true,
    vibe: 'silly',
    friends: ['Riley', 'Casey', 'Sydney', 'Avery', 'Blake', 'Jessie'],
    yourRsvp: RSVP_STATUS.GOING,
    rsvpNote: '',
    friendsRsvp: [
      { name: 'Riley', status: RSVP_STATUS.GOING },
      { name: 'Casey', status: RSVP_STATUS.GOING },
      { name: 'Sydney', status: RSVP_STATUS.GOING },
      { name: 'Avery', status: RSVP_STATUS.GOING },
      { name: 'Blake', status: RSVP_STATUS.GOING },
      { name: 'Jessie', status: RSVP_STATUS.GOING }
    ],
    photos: [
      {
        id: '301',
        url: PLACEHOLDER_IMAGES[9],
        caption: 'Game night setup',
        uploadedBy: 'Riley',
        timestamp: '2025-04-21T19:30:00'
      },
      {
        id: '302',
        url: PLACEHOLDER_IMAGES[10],
        caption: 'Mario Kart tournament',
        uploadedBy: 'Casey',
        timestamp: '2025-04-21T21:00:00'
      }
    ]
  },
  {
    id: '4',
    emoji: '🎬',
    title: 'Movie: Dune Part 3',
    date: '2025-04-22T19:45',
    location: 'AMC Empire 25',
    friendsCount: 4,
    isHost: true,
    vibe: 'chill',
    friends: ['Sam', 'Alex', 'Jordan', 'Taylor']
  },
  {
    id: '5',
    emoji: '🍻',
    title: 'Happy Hour',
    date: '2025-04-23T17:30',
    location: 'The Alchemist',
    friendsCount: 8,
    isHost: false,
    vibe: 'talky',
    friends: ['Morgan', 'Casey', 'Jamie', 'Blake', 'Sam', 'Jessie', 'Riley', 'Sydney']
  },
  {
    id: '6',
    emoji: '🏊',
    title: 'Beach Day!',
    date: '2025-04-25T11:00',
    location: 'Rockaway Beach',
    friendsCount: 5,
    isHost: true,
    vibe: 'sweaty',
    friends: ['Chris', 'Pat', 'Alex', 'Taylor', 'Sydney']
  },
  {
    id: '7',
    emoji: '🧘',
    title: 'Sunset Yoga',
    date: '2025-04-20T18:00',
    location: 'Prospect Park',
    friendsCount: 3,
    isHost: false,
    vibe: 'chill',
    friends: ['Morgan', 'Jamie', 'Casey']
  },
  {
    id: '8',
    emoji: '💃',
    title: 'Surprise Party! (Don\'t tell Sam)',
    date: '2025-04-27T20:00',
    location: 'Secret Location - Text for details',
    friendsCount: 12,
    isHost: true,
    vibe: 'spontaneous',
    friends: ['Everyone except Sam!']
  },
  {
    id: '9',
    emoji: '🥾',
    title: 'Hiking + Picnic',
    date: '2025-04-28T09:30',
    location: 'Bear Mountain State Park',
    friendsCount: 4,
    isHost: true,
    vibe: 'sweaty',
    friends: ['Pat', 'Chris', 'Jordan', 'Riley']
  },
  {
    id: '10',
    emoji: '🍳',
    title: 'Brunch',
    date: '2025-04-21T11:00',
    location: 'Egg Shop',
    friendsCount: 3,
    isHost: false,
    vibe: 'talky',
    friends: ['Jamie', 'Alex', 'Pat']
  }
];

export default sampleDrops;
