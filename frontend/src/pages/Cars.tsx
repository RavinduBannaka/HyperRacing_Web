import { Cars as CarsGrid } from '../components/Cars'
import { Circuit } from '../components/Circuit'
import { Gallery as GalleryGrid } from '../components/Gallery'

export const Cars = () => {
  return (
    <>
      <CarsGrid
        eyebrow="Hyper Garage"
        title="Choose Your Racing Machine"
        description="Browse the new Hyper Racing collection, filter by class, compare stats, and unlock your next track weapon."
      />
      <Circuit
        eyebrow="Garage Categories"
        title="Choose your racing class"
        description="Explore formula racers, prototype machines, sports cars, and premium builds from the Hyper Racing garage."
      />
      <GalleryGrid />
    </>
  )
}
