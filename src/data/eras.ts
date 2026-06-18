import type { Era } from '../types.ts';

export const eras: Era[] = [
  {
    id: 'cavs-i',
    team: 'Cleveland Cavaliers',
    years: '2003 – 2010',
    title: 'The Chosen One',
    blurb:
      'Straight out of St. Vincent-St. Mary in Akron, Ohio — LeBron entered the NBA at 18 as the most hyped prospect since Michael Jordan. He earned Rookie of the Year in 2004 and back-to-back MVP awards in 2009 and 2010, single-handedly turning the Cavaliers into a championship contender. This was raw greatness finding its form.',
    trophies: [
      { kind: 'roty',     label: 'Rookie of the Year', years: ['2004'] },
      { kind: 'mvp',      label: 'NBA MVP',            years: ['2009', '2010'] },
    ],
    signatureRecipeId: 'akron-power-bowl',
    accent: { primary: '#6F263D', secondary: '#FFB81C', bg: '#1a0a0e' },
  },
  {
    id: 'heat',
    team: 'Miami Heat',
    years: '2010 – 2014',
    title: 'Heatles',
    blurb:
      'LeBron took his talents to South Beach and joined Dwyane Wade and Chris Bosh to form one of basketball\'s most feared Big Threes. Four Finals appearances in four years, back-to-back championships in 2012 and 2013, and four MVP awards cemented LeBron\'s status as the best player on the planet. South Beach brought out the most lethal version of his game.',
    trophies: [
      { kind: 'championship', label: 'NBA Champion',    years: ['2012', '2013'] },
      { kind: 'finals-mvp',   label: 'Finals MVP',      years: ['2012', '2013'] },
      { kind: 'mvp',          label: 'NBA MVP',         years: ['2012', '2013'] },
    ],
    signatureRecipeId: 'south-beach-mahi',
    accent: { primary: '#98002E', secondary: '#F9C74F', bg: '#130008' },
  },
  {
    id: 'cavs-ii',
    team: 'Cleveland Cavaliers',
    years: '2014 – 2018',
    title: 'The Return',
    blurb:
      '"I\'m coming home." LeBron returned to Cleveland with a promise — to bring a championship to Northeast Ohio. In 2016, down 3-1 to the Golden State Warriors in the Finals, LeBron delivered the greatest comeback in Finals history. His chase-down block on Iguodala in Game 7 is one of the most iconic moments in sports. Cleveland got its title. A promise kept.',
    trophies: [
      { kind: 'championship', label: 'NBA Champion', years: ['2016'] },
      { kind: 'finals-mvp',   label: 'Finals MVP',   years: ['2016'] },
    ],
    signatureRecipeId: 'comeback-turkey-burger',
    accent: { primary: '#6F263D', secondary: '#FFB81C', bg: '#1a0a0e' },
  },
  {
    id: 'lakers',
    team: 'Los Angeles Lakers',
    years: '2018 – Present',
    title: 'King of L.A.',
    blurb:
      'LeBron traded the rust belt for La-La Land and didn\'t slow down. He brought a championship to the storied Lakers franchise in 2020, won Finals MVP, and then in February 2023 surpassed Kareem Abdul-Jabbar to become the all-time leading scorer in NBA history. And yes, he still does Taco Tuesday. Some things are sacred.',
    trophies: [
      { kind: 'championship', label: 'NBA Champion',         years: ['2020'] },
      { kind: 'finals-mvp',   label: 'Finals MVP',           years: ['2020'] },
      { kind: 'milestone',    label: 'All-Time Scoring King', years: ['2023'] },
    ],
    signatureRecipeId: 'taco-tuesday-tacos',
    accent: { primary: '#552583', secondary: '#FDB927', bg: '#120b1a' },
  },
];
