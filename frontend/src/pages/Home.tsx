import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { Gallery } from '../components/Gallery'
import { AboutSection } from '../components/AboutSection'
import { CarBanner } from '../components/CarBanner'
import { MapPreview } from '../components/MapPreview'

export const Home = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <Features />
      <Gallery />
      <AboutSection />
      <CarBanner />
      <MapPreview />
    </div>
  )
}
