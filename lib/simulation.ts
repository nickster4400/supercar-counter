// Realistic car detection simulation

export const SUPERCAR_BRANDS = [
  { name: 'BMW', color: '#1e88e5', weight: 30 },
  { name: 'Mercedes', color: '#43a047', weight: 25 },
  { name: 'Porsche', color: '#e53935', weight: 15 },
  { name: 'Lamborghini', color: '#fdd835', weight: 8 },
  { name: 'Ferrari', color: '#c62828', weight: 7 },
  { name: 'McLaren', color: '#ff6f00', weight: 5 },
  { name: 'Aston Martin', color: '#00796b', weight: 5 },
  { name: 'Bentley', color: '#5e35b1', weight: 5 },
];

// Get realistic count based on hour (0-23)
export function getHourlyRate(hour: number): number {
  // Rush hours: 7-9am and 5-7pm have highest traffic
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
    return 0.4; // 40% chance per check during rush hour
  }
  // Lunch hour: 12-2pm
  if (hour >= 12 && hour <= 14) {
    return 0.25;
  }
  // Evening: 8pm-12am (nightlife)
  if (hour >= 20 && hour <= 23) {
    return 0.3;
  }
  // Late night: 1-5am (very quiet)
  if (hour >= 1 && hour <= 5) {
    return 0.05;
  }
  // Normal hours
  return 0.15;
}

// Generate hourly data for the past 24 hours
export function generateHourlyData() {
  const data = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourValue = hour.getHours();
    const rate = getHourlyRate(hourValue);

    // Generate realistic count (rate * 60 minutes * random factor)
    const count = Math.floor(rate * 60 * (0.8 + Math.random() * 0.4));

    data.push({
      hour: hour.getHours(),
      time: `${hour.getHours()}:00`,
      count: count,
    });
  }

  return data;
}

// Generate brand distribution
export function generateBrandData() {
  const total = 247; // Today's total (example)

  return SUPERCAR_BRANDS.map(brand => ({
    name: brand.name,
    value: Math.floor(total * (brand.weight / 100) * (0.8 + Math.random() * 0.4)),
    color: brand.color,
  }));
}

// Get random brand based on weights
export function getRandomBrand(): string {
  const totalWeight = SUPERCAR_BRANDS.reduce((sum, b) => sum + b.weight, 0);
  let random = Math.random() * totalWeight;

  for (const brand of SUPERCAR_BRANDS) {
    random -= brand.weight;
    if (random <= 0) return brand.name;
  }

  return SUPERCAR_BRANDS[0].name;
}

// Generate daily data for the past week
export function generateWeeklyData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const dayIndex = (new Date().getDay() - i + 6) % 7;
    const isWeekend = dayIndex === 5 || dayIndex === 6; // Sat or Sun

    // Weekends have more supercars (people showing off)
    const baseCount = isWeekend ? 300 : 220;
    const count = Math.floor(baseCount * (0.9 + Math.random() * 0.2));

    data.push({
      day: days[dayIndex],
      count: count,
    });
  }

  return data;
}
