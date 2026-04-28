import blackPhantomRx from '../assets/cars/black-phantom-rx.png'
import blueNitroX from '../assets/cars/blue-nitro-x.png'
import carbonStreetKing from '../assets/cars/carbon-street-king.png'
import crimsonStormGt from '../assets/cars/crimson-storm-gt.png'
import dustRallyX from '../assets/cars/dust-rally-x.png'
import formulaShadowF1 from '../assets/cars/formula-shadow-f1.png'
import limeVenomGt from '../assets/cars/lime-venom-gt.png'
import nightbladeHypercar from '../assets/cars/nightblade-hypercar.png'
import orangeDriftBeast from '../assets/cars/orange-drift-beast.png'
import policeInterceptor from '../assets/cars/police-interceptor.png'
import purpleNeonGt from '../assets/cars/purple-neon-gt.png'
import redlineTurbo from '../assets/cars/redline-turbo.png'
import silverAmgRacer from '../assets/cars/silver-amg-racer.png'
import whiteLightning from '../assets/cars/white-lightning.png'
import yellowFormulaPro from '../assets/cars/yellow-formula-pro.png'

export type CarCategory = 'Hyper Cars' | 'Formula' | 'Drift' | 'Rally' | 'Police' | 'Premium'

export type Car = {
  name: string
  class: CarCategory
  speed: string
  handling: string
  acceleration: string
  price: number
  color: string
  image: string
  blurb: string
  status: 'Unlocked' | 'Locked'
}

export const cars: Car[] = [
  {
    name: 'Crimson Storm GT',
    class: 'Hyper Cars',
    speed: '392 km/h',
    handling: '91',
    acceleration: '96',
    price: 1800,
    color: 'Crimson / Black',
    image: crimsonStormGt,
    blurb: 'A rain-slick hyper GT with violent launch power and cinematic red aero.',
    status: 'Unlocked',
  },
  {
    name: 'Blue Nitro X',
    class: 'Premium',
    speed: '405 km/h',
    handling: '93',
    acceleration: '98',
    price: 2400,
    color: 'Blue / White',
    image: blueNitroX,
    blurb: 'Neon city prototype built for boost lanes, late braking, and elite events.',
    status: 'Locked',
  },
  {
    name: 'Formula Shadow F1',
    class: 'Formula',
    speed: '386 km/h',
    handling: '97',
    acceleration: '94',
    price: 2100,
    color: 'Black / Red',
    image: formulaShadowF1,
    blurb: 'Open-wheel precision with shadow-black aero and race-grade downforce.',
    status: 'Unlocked',
  },
  {
    name: 'Lime Venom GT',
    class: 'Hyper Cars',
    speed: '378 km/h',
    handling: '92',
    acceleration: '93',
    price: 1600,
    color: 'Lime / Carbon',
    image: limeVenomGt,
    blurb: 'A sharp green GT tuned for wet circuits and high-traction exits.',
    status: 'Locked',
  },
  {
    name: 'Black Phantom RX',
    class: 'Premium',
    speed: '414 km/h',
    handling: '95',
    acceleration: '99',
    price: 3000,
    color: 'Black / Gold',
    image: blackPhantomRx,
    blurb: 'Butterfly-door flagship with night-run lighting and luxury race menace.',
    status: 'Locked',
  },
  {
    name: 'Redline Turbo',
    class: 'Drift',
    speed: '356 km/h',
    handling: '90',
    acceleration: '92',
    price: 1200,
    color: 'Red / White',
    image: redlineTurbo,
    blurb: 'Turbo street build that turns wet asphalt into a controlled smoke show.',
    status: 'Unlocked',
  },
  {
    name: 'Police Interceptor',
    class: 'Police',
    speed: '368 km/h',
    handling: '88',
    acceleration: '91',
    price: 1700,
    color: 'Black / White',
    image: policeInterceptor,
    blurb: 'Pursuit-class interceptor with emergency lights and heavyweight grip.',
    status: 'Locked',
  },
  {
    name: 'Orange Drift Beast',
    class: 'Drift',
    speed: '348 km/h',
    handling: '94',
    acceleration: '90',
    price: 1450,
    color: 'Orange / Black',
    image: orangeDriftBeast,
    blurb: 'Smoke-heavy drift weapon with wide-angle steering and brutal style.',
    status: 'Unlocked',
  },
  {
    name: 'Silver AMG Racer',
    class: 'Premium',
    speed: '382 km/h',
    handling: '92',
    acceleration: '93',
    price: 2200,
    color: 'Silver / Red',
    image: silverAmgRacer,
    blurb: 'Silver touring racer with GT aero, premium balance, and night-city poise.',
    status: 'Locked',
  },
  {
    name: 'Nightblade Hypercar',
    class: 'Hyper Cars',
    speed: '421 km/h',
    handling: '96',
    acceleration: '97',
    price: 3200,
    color: 'Black / Neon Blue',
    image: nightbladeHypercar,
    blurb: 'Low, dark, and predatory with blue light signatures and extreme grip.',
    status: 'Locked',
  },
  {
    name: 'Dust Rally X',
    class: 'Rally',
    speed: '332 km/h',
    handling: '98',
    acceleration: '89',
    price: 1350,
    color: 'Green / Black',
    image: dustRallyX,
    blurb: 'Dirt-ready rally monster made for loose surfaces and violent exits.',
    status: 'Unlocked',
  },
  {
    name: 'Purple Neon GT',
    class: 'Premium',
    speed: '399 km/h',
    handling: '93',
    acceleration: '96',
    price: 2600,
    color: 'Purple / Black',
    image: purpleNeonGt,
    blurb: 'Purple neon supercar for city sprints, spotlight runs, and collectors.',
    status: 'Locked',
  },
  {
    name: 'White Lightning',
    class: 'Hyper Cars',
    speed: '407 km/h',
    handling: '94',
    acceleration: '97',
    price: 2750,
    color: 'White / Blue',
    image: whiteLightning,
    blurb: 'Clean white hypercar with blue lamps and explosive top-end speed.',
    status: 'Locked',
  },
  {
    name: 'Yellow Formula Pro',
    class: 'Formula',
    speed: '389 km/h',
    handling: '99',
    acceleration: '93',
    price: 2300,
    color: 'Yellow / Black',
    image: yellowFormulaPro,
    blurb: 'High-visibility formula car built for pure apex accuracy.',
    status: 'Locked',
  },
  {
    name: 'Carbon Street King',
    class: 'Drift',
    speed: '372 km/h',
    handling: '91',
    acceleration: '95',
    price: 1900,
    color: 'Carbon / Orange',
    image: carbonStreetKing,
    blurb: 'Carbon street racer with flame exhaust and aggressive midnight energy.',
    status: 'Unlocked',
  },
]
