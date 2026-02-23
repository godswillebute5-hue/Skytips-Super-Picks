import { addDays, format } from 'date-fns';

const TEAMS = [
  'Manchester City', 'Liverpool', 'Arsenal', 'Chelsea', 'Manchester Utd',
  'Real Madrid', 'Barcelona', 'Atletico Madrid', 'Bayern Munich', 'Dortmund',
  'PSG', 'Juventus', 'Inter Milan', 'AC Milan', 'Napoli',
  'Ajax', 'Porto', 'Benfica', 'Celtic', 'Rangers', 'Tottenham', 'Newcastle',
  'Aston Villa', 'Brighton', 'West Ham', 'Leverkusen', 'Leipzig', 'Frankfurt',
  'Roma', 'Lazio', 'Atalanta', 'Marseille', 'Lyon', 'Monaco', 'Sporting CP'
];

const LEAGUES = [
  'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1',
  'Champions League', 'Europa League', 'Conference League'
];

const PREDICTION_TYPES = [
  'Over 2.5 Goals', 'Under 2.5 Goals', 'Home Win', 'Away Win', 'Draw',
  'BTTS Yes', 'BTTS No', 'Over 1.5 Goals', 'Under 3.5 Goals', 'Home +1.5 AH'
];

class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }
  
  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  pick(array) {
    return array[Math.floor(this.next() * array.length)];
  }
  
  range(min, max) {
    return min + this.next() * (max - min);
  }
}

export const generateDailyPredictions = (date) => {
  const dateStr = format(date, 'yyyy-MM-dd');
  const seed = dateStr.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const rng = new SeededRandom(seed);
  
  const generateMatch = (minOdds, maxOdds) => {
    const home = rng.pick(TEAMS);
    let away = rng.pick(TEAMS);
    while (away === home) away = rng.pick(TEAMS);
    
    const odds = Number(rng.range(minOdds, maxOdds).toFixed(2));
    const type = rng.pick(PREDICTION_TYPES);
    const league = rng.pick(LEAGUES);
    const confidence = Math.floor(rng.range(75, 98));
    const kickoff = `${Math.floor(rng.range(12, 22))}:${rng.pick(['00', '15', '30', '45'])}`;
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      homeTeam: home,
      awayTeam: away,
      league,
      prediction: type,
      odds,
      confidence,
      kickoff,
      date: dateStr,
      status: 'pending',
      result: null
    };
  };
  
  const twoOdds = [
    generateMatch(1.80, 2.20),
    generateMatch(1.85, 2.15)
  ];
  
  const fiveOdds = [
    generateMatch(1.70, 1.90),
    generateMatch(1.75, 1.95),
    generateMatch(1.80, 2.00)
  ];
  
  const tenOdds = [
    generateMatch(1.65, 1.85),
    generateMatch(1.70, 1.90),
    generateMatch(1.75, 1.95),
    generateMatch(1.80, 2.00)
  ];
  
  return {
    date: dateStr,
    twoOdds,
    fiveOdds,
    tenOdds,
    totalTwoOdds: twoOdds.reduce((a, b) => a * b.odds, 1).toFixed(2),
    totalFiveOdds: fiveOdds.reduce((a, b) => a * b.odds, 1).toFixed(2),
    totalTenOdds: tenOdds.reduce((a, b) => a * b.odds, 1).toFixed(2)
  };
};

export const getTodayPredictions = () => {
  return generateDailyPredictions(new Date());
};

export const getPredictionsForDate = (date) => {
  return generateDailyPredictions(date);
};

export const getLast14DaysHistory = () => {
  const history = [];
  for (let i = 0; i < 14; i++) {
    const date = addDays(new Date(), -i);
    const predictions = generateDailyPredictions(date);
    
    const seed = format(date, 'yyyy-MM-dd').split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const rng = new SeededRandom(seed);
    
    const simulateResult = (match) => ({
      ...match,
      status: 'completed',
      result: rng.next() > 0.25 ? 'win' : 'loss'
    });
    
    const twoOddsResult = predictions.twoOdds.map(simulateResult);
    const allWin = twoOddsResult.every(m => m.result === 'win');
    
    history.push({
      date: predictions.date,
      twoOdds: twoOddsResult,
      result: allWin ? 'win' : 'loss',
      profit: allWin ? '+2.00' : '-1.00'
    });
  }
  return history;
};
