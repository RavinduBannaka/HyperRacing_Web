import blackFormulaCar from '../assets/gallery/black-formula-racing-car.png'
import redFormulaCar from '../assets/gallery/red-formula-racing-car.png'
import yellowFormulaCar from '../assets/gallery/yellow-formula-racing-car.png'
import redBlackPrototypeCar from '../assets/gallery/red-black-prototype-racing-car.png'
import yellowSportsCar from '../assets/gallery/yellow-sports-racing-car.png'
import redSportsCar from '../assets/gallery/red-sports-racing-car.png'

export type Category = {
  name: string
  distance: string
  mood: string
  image: string
  description: string
}

export const categories: Category[] = [
  {
    name: 'Formula Cars',
    distance: '3 builds',
    mood: 'Open-wheel precision',
    image: blackFormulaCar,
    description: 'Lightweight formula machines built for aero grip, reaction speed, and surgical apex control.',
  },
  {
    name: 'Premium Formula',
    distance: 'Elite tier',
    mood: 'Scarlet speed class',
    image: redFormulaCar,
    description: 'Top-spec formula racers with premium liveries and aggressive straight-line pace.',
  },
  {
    name: 'Rookie Formula',
    distance: 'Entry tier',
    mood: 'Bright technical grip',
    image: yellowFormulaCar,
    description: 'Balanced open-wheel cars for mastering racing lines before stepping into elite divisions.',
  },
  {
    name: 'Prototype Racers',
    distance: 'Endurance class',
    mood: 'Hybrid aero dominance',
    image: redBlackPrototypeCar,
    description: 'Red and black prototype machines for long-run stability, speed, and event circuits.',
  },
  {
    name: 'Sports Cars',
    distance: 'GT class',
    mood: 'Wide-body power',
    image: yellowSportsCar,
    description: 'Sports racing builds with road-car silhouettes, heavy downforce, and confident grip.',
  },
  {
    name: 'Premium Cars',
    distance: 'Legend class',
    mood: 'Collector performance',
    image: redSportsCar,
    description: 'High-value racing cards and garage heroes for players chasing standout track style.',
  },
]
