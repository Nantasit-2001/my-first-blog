import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import Footer from './components/Footer'
import ArticleSection from './components/ArticleSection'

function App() {
  return (
    <>
    <section>
      <NavBar/>
      <HeroSection/>
      <ArticleSection/>
      <Footer/>
    </section>  
    </>
  )
}
export default App
