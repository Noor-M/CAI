// All site copy lives here so it can be updated without touching the layout.
// Sources: alpbach.org/club-alpbach-iraq, the CAI brand kit (roll-up, PowerPoint, letterhead).

export const links = {
  email: 'club.iraq@alpbach.network',
  instagram: 'https://www.instagram.com/clubalpbachiraq/',
  facebook: 'https://www.facebook.com/ClubAlpbachIraq',
  linkedin: 'https://www.linkedin.com/company/cairaq/',
  twitter: 'https://twitter.com/ClubAlpbachIraq',
  efaClubPage: 'https://www.alpbach.org/club-alpbach-iraq',
  efa: 'https://www.alpbach.org',
  // The Club Alpbach Iraq page on alpbach.org links to the current scholarship call.
  scholarships: 'https://www.alpbach.org/club-alpbach-iraq',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'forum', label: 'Forum Alpbach' },
  { id: 'identity', label: 'Inspiration for the Brand Identity' },
  { id: 'scholarship', label: 'Scholarship' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  tag: 'Forum Alpbach Network',
  lead:
    'Club Alpbach Iraq (CAI) represents the European Forum Alpbach in Iraq. We promote dialogue, test new ideas and build mutual understanding, so that Iraq’s youth can take part in global discussions.',
  facts: ['Iraq', 'Alpbach, Tyrol', 'Forum Alpbach Network'],
}

export const about = {
  title: 'A bridge between Iraq and Alpbach',
  paragraphs: [
    'Club Alpbach Iraq is the Iraqi chapter of the Forum Alpbach Network (FAN), a community of clubs and alumni around the world connected to the European Forum Alpbach.',
    'We facilitate exchange and reflection between Iraqi and international young people: we bring Iraqi voices to Alpbach, and bring what is learned in Alpbach back home to Iraq.',
  ],
  pillars: [
    { title: 'Dialogue', text: 'Open conversations across disciplines, regions and generations.' },
    { title: 'New ideas', text: 'A space to test ideas with peers and experts from all over the world.' },
    { title: 'Understanding', text: 'Building mutual understanding between Iraq and the international community.' },
  ],
}

export const forum = {
  title: 'What is the European Forum Alpbach?',
  paragraphs: [
    'The European Forum Alpbach is an interdisciplinary platform for science, politics, business and culture, held every summer in the Tyrolean mountain village of Alpbach, Austria. Since 1945 it has brought people together to discuss the questions of our time.',
    'Speakers, experts and scholarship holders from all parts of the world meet for open debate. The open character of the forum promotes tolerance towards other opinions and consensus across state, ideological and disciplinary boundaries.',
  ],
  program: [
    {
      title: 'Seminar Week',
      label: 'CIRCLE',
      text: 'Interdisciplinary seminars led by renowned academics. Scholarship holders attend seminars and form lasting connections with peers from across the world.',
      image: 'brand/alpbach-congress.jpg',
      zoom: true, // close-up of the round courtyard
    },
    {
      title: 'Symposia',
      label: 'STAGE',
      text: 'Focused conferences on health, technology, politics, economics, art and culture, with large panel discussions, break-out sessions and workshops.',
      image: 'brand/alpbach-congress.jpg',
      position: 'center 20%', // the terrace crowd and the mountains
    },
    {
      title: 'Fireside Chats',
      label: 'FIRE SIDE CHAT',
      text: 'Informal meetings and fireside conversations, where difficult topics can be discussed openly with leading figures, away from the public.',
      image: 'brand/fireside-chat.jpg',
    },
  ],
}

export const identity = {
  title: 'Two rivers, one piece',
  text: [
    'Our mark is a globe crossed by two lines: Dijla and Furat, the Tigris and the Euphrates. The rivers that shaped Mesopotamia run through every Club Alpbach Iraq design, from our roll-up to our certificates.',
    'They stand for where we come from and for what we do: two streams that run apart and meet, the way Iraq and Alpbach meet through our members.',
  ],
  values: [
    { title: 'Trust', text: 'Honest dialogue starts with trust between people who see the world differently.' },
    { title: 'One Piece', text: 'Many backgrounds, one community. Iraq’s diversity is its strength.' },
  ],
}

export const scholarship = {
  title: 'Go to Alpbach',
  lead:
    'Through the Forum Alpbach Network, young people from Iraq can apply for scholarships to take part in the European Forum Alpbach. Scholarships typically cover participation and accommodation and open the door to a unique international network.',
  steps: [
    { n: '01', title: 'Apply', text: 'Follow our channels for the call for applications and submit yours through the Forum Alpbach scholarship portal.' },
    { n: '02', title: 'Get selected', text: 'Applications are reviewed and selected scholarship holders are welcomed into the CAI community.' },
    { n: '03', title: 'Experience Alpbach', text: 'Join seminars, symposia and fireside chats with thousands of participants in Tyrol.' },
    { n: '04', title: 'Bring it home', text: 'Share what you learned through CAI events and help the next generation get there.' },
  ],
}

export const team = [
  { name: 'Asma Jwtyar Ali', role: 'President' },
  { name: 'Khalil Hassan', role: 'Vice President & Treasurer' },
  { name: 'Noor Mohammed', role: 'Scholarship & Engagement Officer' },
  { name: 'Mohammed Ali', role: 'Events & Admin Officer' },
]

// Add real quotes from CAI scholarship holders here; the section stays hidden while empty.
// Example: { quote: '...', name: 'Full Name', meta: 'Scholarship holder 2025' }
export const testimonials = []
