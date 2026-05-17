import { useState } from 'react'
import { RESTAURANT } from './config'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Reservation from './components/Reservation'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import NameChanger from './components/NameChanger'

export default function App() {
  const [restaurantName, setRestaurantName] = useState(RESTAURANT.name)

  return (
    <div className="relative bg-dark-900 min-h-screen text-white overflow-x-hidden">
      {/* Page loader */}
      <Loader />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar restaurantName={restaurantName} />

      {/* Main sections */}
      <main>
        <Hero restaurantName={restaurantName} />
        <About />
        <Menu />
        <Gallery />
        <Reservation />
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer restaurantName={restaurantName} />

      {/* Demo name changer widget */}
      <NameChanger name={restaurantName} onChangeName={setRestaurantName} />
    </div>
  )
}