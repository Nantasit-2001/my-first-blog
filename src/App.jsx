import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './component/NavBar'
import HeroSection from './component/HeroSection'

function App() {
  return (
    <>
    <section>
      <NavBar/>
      <HeroSection/>
    </section>  
    </>
  )
}
export default App
