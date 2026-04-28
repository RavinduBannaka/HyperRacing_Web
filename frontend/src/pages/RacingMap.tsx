import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for our racing data
interface Car {
  id: string;
  name: string;
  position: { x: number; y: number };
  speed: number;
  color: string;
  isPlayer: boolean;
}

interface Checkpoint {
  id: string;
  position: { x: number; y: number };
  isActive: boolean;
  isCompleted: boolean;
}

interface GameState {
  isRacing: boolean;
  currentLap: number;
  totalLaps: number;
  time: number;
  speed: number;
}

// Main Racing Map Component
const RacingMap: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    isRacing: false,
    currentLap: 1,
    totalLaps: 3,
    time: 0,
    speed: 0,
  });

  // Map state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Cars and checkpoints data
  const [cars, setCars] = useState<Car[]>([
    {
      id: 'player',
      name: 'You',
      position: { x: 100, y: 200 },
      speed: 120,
      color: '#00ffff',
      isPlayer: true,
    },
    {
      id: 'opponent1',
      name: 'Racer 1',
      position: { x: 150, y: 180 },
      speed: 115,
      color: '#ff00ff',
      isPlayer: false,
    },
    {
      id: 'opponent2',
      name: 'Racer 2',
      position: { x: 80, y: 220 },
      speed: 110,
      color: '#ffff00',
      isPlayer: false,
    },
  ]);

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([
    { id: 'start', position: { x: 100, y: 200 }, isActive: true, isCompleted: false },
    { id: 'cp1', position: { x: 300, y: 150 }, isActive: false, isCompleted: false },
    { id: 'cp2', position: { x: 500, y: 250 }, isActive: false, isCompleted: false },
    { id: 'finish', position: { x: 700, y: 200 }, isActive: false, isCompleted: false },
  ]);

  // Refs for map interaction
  const mapRef = useRef<HTMLDivElement>(null);

  // Game timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameState.isRacing) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          time: prev.time + 0.1,
        }));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState.isRacing]);

  // Simulate car movement
  useEffect(() => {
    if (gameState.isRacing) {
      const interval = setInterval(() => {
        setCars(prevCars =>
          prevCars.map(car => ({
            ...car,
            position: {
              x: car.position.x + (Math.random() - 0.5) * 5,
              y: car.position.y + (Math.random() - 0.5) * 5,
            },
            speed: car.speed + (Math.random() - 0.5) * 10,
          }))
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameState.isRacing]);

  // Map interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    handleZoom(e.deltaY > 0 ? -0.1 : 0.1);
  };

  // Game controls
  const startRace = () => {
    setGameState(prev => ({ ...prev, isRacing: true, time: 0 }));
  };

  const pauseRace = () => {
    setGameState(prev => ({ ...prev, isRacing: false }));
  };

  const resetRace = () => {
    setGameState({
      isRacing: false,
      currentLap: 1,
      totalLaps: 3,
      time: 0,
      speed: 0,
    });
    setCars(prevCars =>
      prevCars.map(car => ({
        ...car,
        position: { x: 100, y: 200 },
        speed: 120,
      }))
    );
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Main Map Container */}
      <div
        ref={mapRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Map Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center',
          }}
          animate={{ scale: zoom }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Racing Track SVG */}
          <svg
            width="800"
            height="400"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 800 400"
          >
            {/* Track Path */}
            <defs>
              <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffff00" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Main Track */}
            <path
              d="M100,200 Q300,150 500,250 Q700,200 700,200 Q500,150 300,200 Q100,250 100,200"
              stroke="url(#trackGradient)"
              strokeWidth="8"
              fill="none"
              filter="url(#glow)"
              className="animate-pulse"
            />

            {/* Inner Track */}
            <path
              d="M120,200 Q320,170 520,230 Q680,200 680,200 Q520,170 320,230 Q120,230 120,200"
              stroke="#00ffff"
              strokeWidth="4"
              fill="none"
              opacity="0.6"
            />

            {/* Road Markings */}
            <path
              d="M100,200 Q300,150 500,250 Q700,200 700,200"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10,10"
              opacity="0.8"
            />
          </svg>

          {/* Checkpoints */}
          <AnimatePresence>
            {checkpoints.map((checkpoint) => (
              <CheckpointMarker
                key={checkpoint.id}
                checkpoint={checkpoint}
                isActive={checkpoint.isActive}
              />
            ))}
          </AnimatePresence>

          {/* Cars */}
          <AnimatePresence>
            {cars.map((car) => (
              <CarIcon
                key={car.id}
                car={car}
                isRacing={gameState.isRacing}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* UI Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left - Mini Map */}
        <div className="absolute top-4 left-4 w-48 h-32 bg-black/50 backdrop-blur-md rounded-lg border border-cyan-400/50 pointer-events-auto">
          <div className="p-2">
            <h3 className="text-cyan-400 text-sm font-bold mb-2">MINI MAP</h3>
            <div className="w-full h-20 bg-gray-800 rounded border border-cyan-400/30 relative">
              {/* Simplified mini map representation */}
              <div className="absolute inset-2">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <path
                    d="M10,25 Q30,15 50,35 Q80,25 80,25 Q50,15 30,35 Q10,35 10,25"
                    stroke="#00ffff"
                    strokeWidth="2"
                    fill="none"
                  />
                  {cars.map((car, index) => (
                    <circle
                      key={car.id}
                      cx={10 + (car.position.x / 8)}
                      cy={25 + (car.position.y / 8) - 25}
                      r="1.5"
                      fill={car.color}
                      className="animate-pulse"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Top Right - Stats */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-lg border border-purple-400/50 p-4 pointer-events-auto">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-purple-400 text-sm">LAP</span>
              <span className="text-white font-bold">{gameState.currentLap}/{gameState.totalLaps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-400 text-sm">TIME</span>
              <span className="text-white font-bold">{gameState.time.toFixed(1)}s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-400 text-sm">SPEED</span>
              <span className="text-white font-bold">{Math.round(gameState.speed)} km/h</span>
            </div>
          </div>
        </div>

        {/* Bottom - Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-lg border border-cyan-400/50 p-4 pointer-events-auto">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRace}
              disabled={gameState.isRacing}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {gameState.isRacing ? 'RACING...' : 'START RACE'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pauseRace}
              disabled={!gameState.isRacing}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              PAUSE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetRace}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/50"
            >
              RESET
            </motion.button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2 pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleZoom(0.2)}
            className="w-10 h-10 bg-black/50 backdrop-blur-md rounded border border-cyan-400/50 text-cyan-400 font-bold hover:bg-cyan-400/20"
          >
            +
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleZoom(-0.2)}
            className="w-10 h-10 bg-black/50 backdrop-blur-md rounded border border-cyan-400/50 text-cyan-400 font-bold hover:bg-cyan-400/20"
          >
            -
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Checkpoint Marker Component
const CheckpointMarker: React.FC<{ checkpoint: Checkpoint; isActive: boolean }> = ({ checkpoint, isActive }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: checkpoint.position.x - 12,
        top: checkpoint.position.y - 12,
      }}
      animate={{
        scale: isActive ? [1, 1.2, 1] : 1,
        opacity: isActive ? [0.8, 1, 0.8] : 0.6,
      }}
      transition={{
        duration: 2,
        repeat: isActive ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <div className={`w-6 h-6 rounded-full border-2 ${
        isActive
          ? 'border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-400/50'
          : 'border-purple-400 bg-purple-400/20'
      }`}>
        <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
          isActive ? 'bg-cyan-400' : 'bg-purple-400'
        }`} />
      </div>
    </motion.div>
  );
};

// Car Icon Component
const CarIcon: React.FC<{ car: Car; isRacing: boolean }> = ({ car, isRacing }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: car.position.x - 8,
        top: car.position.y - 8,
      }}
      animate={{
        x: isRacing ? [0, 2, -2, 0] : 0,
        y: isRacing ? [0, -1, 1, 0] : 0,
      }}
      transition={{
        duration: 0.5,
        repeat: isRacing ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <div
        className="w-4 h-6 rounded-sm border border-white/50 shadow-lg"
        style={{ backgroundColor: car.color }}
      >
        <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5" />
      </div>
      {car.isPlayer && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {car.name}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RacingMap;
