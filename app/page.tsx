'use client';

import { useState, useEffect } from 'react';
import { Car, TrendingUp, Calendar, Clock, BarChart3, PieChart } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { getHourlyRate, generateHourlyData, generateBrandData, generateWeeklyData, getRandomBrand } from '@/lib/simulation';

export default function Home() {
  const [liveCount, setLiveCount] = useState(0);
  const [todayCount, setTodayCount] = useState(247);
  const [recentDetection, setRecentDetection] = useState<string | null>(null);
  const [hourlyData] = useState(generateHourlyData());
  const [weeklyData] = useState(generateWeeklyData());
  const [brandData] = useState(generateBrandData());

  // Simulate realistic car detection based on time of day
  useEffect(() => {
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      const rate = getHourlyRate(hour);

      // Check if a car is detected based on hourly rate
      if (Math.random() < rate) {
        const brand = getRandomBrand();
        setLiveCount(prev => prev + 1);
        setTodayCount(prev => prev + 1);
        setRecentDetection(brand);

        // Clear detection animation after 3 seconds
        setTimeout(() => setRecentDetection(null), 3000);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const peakHour = hourlyData.reduce((max, curr) => curr.count > max.count ? curr : max, hourlyData[0]);
  const mostCommonBrand = brandData.reduce((max, curr) => curr.value > max.value ? curr : max, brandData[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Supercar Counter</h1>
                <p className="text-xs sm:text-sm text-white/50">Miami Economy Index</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs sm:text-sm text-white/70">LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Detection Alert */}
      <AnimatePresence>
        {recentDetection && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 bg-green-500/20 border border-green-500/50 backdrop-blur-xl rounded-xl px-4 py-3 z-50 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <span className="text-green-400 font-medium text-sm">{recentDetection} detected!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-12">
          {/* Live Counter */}
          <div className="lg:col-span-2 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium text-yellow-400">Live Count</span>
            </div>
            <motion.div
              key={liveCount}
              initial={{ scale: 1.2, color: '#fbbf24' }}
              animate={{ scale: 1, color: '#ffffff' }}
              className="text-5xl sm:text-7xl font-bold text-white mb-2"
            >
              {liveCount}
            </motion.div>
            <p className="text-sm sm:text-base text-white/50">Supercars detected since you opened this page</p>
          </div>

          {/* Today's Total */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">Today</span>
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{todayCount}</div>
            <p className="text-sm sm:text-base text-white/50">Total today</p>
          </div>
        </div>

        {/* Camera Feed Placeholder */}
        <div className="bg-black/50 border border-white/10 rounded-2xl overflow-hidden mb-6 sm:mb-12">
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-medium text-white">Miami Beach - Ocean Drive</span>
            </div>

            {/* Simulated detection box */}
            <AnimatePresence>
              {recentDetection && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/3 left-1/3 w-48 h-32 border-2 border-green-400 rounded-lg"
                >
                  <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {recentDetection}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center">
              <Car className="w-12 h-12 sm:w-16 sm:h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-base sm:text-lg">Camera Feed - Simulated Data</p>
              <p className="text-white/20 text-xs sm:text-sm mt-2">AI Detection Active</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-12">
          <StatCard
            icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}
            label="Peak Hour"
            value={peakHour.time}
            subtitle={`${peakHour.count} cars`}
            color="purple"
          />
          <StatCard
            icon={<Car className="w-4 h-4 sm:w-5 sm:h-5" />}
            label="Most Seen"
            value={mostCommonBrand.name}
            subtitle={`${Math.round((mostCommonBrand.value / todayCount) * 100)}%`}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />}
            label="vs Yesterday"
            value="+12%"
            subtitle="247 vs 220"
            color="emerald"
          />
          <StatCard
            icon={<BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />}
            label="Economy Index"
            value="High"
            subtitle="Strong activity"
            color="yellow"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Hourly Trend */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Last 24 Hours</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#ffffff40" style={{ fontSize: '12px' }} />
                <YAxis stroke="#ffffff40" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Trend */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Past 7 Days</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#ffffff40" style={{ fontSize: '12px' }} />
                <YAxis stroke="#ffffff40" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Brand Distribution Today</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={brandData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {brandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #ffffff20',
                      borderRadius: '8px',
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {brandData.map((brand) => (
                <div key={brand.name} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }} />
                    <span className="text-sm font-medium text-white">{brand.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{brand.value}</div>
                  <div className="text-xs text-white/50">{Math.round((brand.value / todayCount) * 100)}% of total</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">About This Project</h2>
          <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
            <p>
              <strong className="text-white">Supercar Counter</strong> is inspired by the <em>Pentagon Pizza Index</em> —
              a theory that pizza delivery orders to the Pentagon spike before major military operations.
            </p>
            <p>
              Similarly, this dashboard tracks Miami's economic activity by counting luxury cars (BMW, Mercedes,
              Lamborghini, Ferrari, Porsche, McLaren, etc.) in real-time. More supercars on the road = more spending = stronger local economy.
            </p>
            <p>
              <strong className="text-yellow-400">🚗 Prototype Mode:</strong> Currently using simulated data with realistic patterns
              (rush hours, weekday vs weekend trends). Real AI detection coming soon!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, subtitle, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  color: string;
}) {
  const colorClasses = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses];

  return (
    <div className={`border rounded-xl p-4 sm:p-6 ${colorClass}`}>
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        {icon}
        <span className="text-xs sm:text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
      {subtitle && <p className="text-xs sm:text-sm opacity-70">{subtitle}</p>}
    </div>
  );
}
