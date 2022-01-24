interface formMap {
  name: string;
  type?: string;
  customFieldId?: string;
  options?: { [key: string]: string };
}

export const formTrelloMap: { [key: string]: formMap } = {
  '2ca71c2c': {
    customFieldId: '61b7fb0e9d67176e8f17f727',
    name: 'Preferred Communication Channel',
    type: 'list',
    options: {
      Email: '61b7fb0e9d67176e8f17f728',
      Phone: '61b7fb0e9d67176e8f17f729',
    },
  },
  '2f935670': {
    customFieldId: '61b7faaa786cc70ba390f53c',
    name: 'Contact Number',
    type: 'text',
  },
  '7ac1bd0e': {
    customFieldId: '61b7fbcf7d6482132ed03039',
    name: 'Located in Australia?',
    type: 'list',
    options: {
      Yes: '61b7fbcf7d6482132ed0303a',
      No: '61b7fbcf7d6482132ed0303b',
    },
  },
  '605ed5ef': {
    customFieldId: '61b7396cf4a84285ae6fa555',
    name: 'Last Name',
    type: 'text',
  },
  '50726db2': {
    customFieldId: '61b7fee7d61680538fe4a85a',
    name: 'Weekly Time Commitment',
    type: 'text',
  },
  '74e596dc': {
    customFieldId: '61b7fb967c9a60171963bf2e',
    name: 'Highest Education Level',
    type: 'list',
    options: {
      'VCE / High School': '61b7fb967c9a60171963bf2f',
      'Graduate Diploma and Graduate Certificate': '61b7fb967c9a60171963bf30',
      'Bachelor Degree': '61b7fb967c9a60171963bf31',
      'Postgraduate Degree': '61b7fb967c9a60171963bf32',
      'Ph. D': '61b7fb967c9a60171963bf33',
    },
  },
  '6bed9d98': {
    customFieldId: '61b73959a66ac53236471e13',
    name: 'First Name',
    type: 'text',
  },
  '12dc94fb': {
    customFieldId: '61ede311269b1b1c6259a617',
    name: 'Contribution to Action Ink Team',
    type: 'text',
  },
  '18ca4cd0': {
    customFieldId: '61b7fc086524312a8bd761e9',
    name: 'Current Employment Status',
    type: 'list',
    options: {
      'Employed (part-time)': '61b7fc086524312a8bd761ea',
      'Employed (full-time)': '61b7fc086524312a8bd761eb',
      'Employed (casual)': '61b7fc086524312a8bd761ec',
      Unemployed: '61b7fc086524312a8bd761ed',
      'Self-employed': '61b7fc086524312a8bd761ee',
    },
  },
  '54d0b7c1': {
    customFieldId: '61b7fba8da85f86de7091d0d',
    name: 'Current Educational Status',
    type: 'text',
  },
  '531cdbf9': {
    customFieldId: '61b73999c4e24b7b374a7fab',
    name: 'Applied Position',
    type: 'list',
    options: {
      'Software Engineer': '61b73999c4e24b7b374a7fac',
      'UI/UX Designer': '61b73999c4e24b7b374a7fad',
      'Project Manager': '61b73999c4e24b7b374a7fae',
    },
  },
  '38453d7d': {
    customFieldId: '61ede38e465de625453f113a',
    name: 'Why Volunteer',
    type: 'text',
  },
  '4046b35f': {
    customFieldId: '61b804764729ad41d6ebecce',
    name: 'Adjustment Requests',
    type: 'text',
  },
  Email: {
    customFieldId: '61b73927efa06c51b113d402',
    name: 'Email',
    type: 'text',
  },
  '74ac89d2': {
    name: 'CV',
  },
};
