import React, { useState } from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Categories from '../components/Categories'
import ProductDisplay from '../components/ProductDisplay'
import Offer from '../components/Offer'

const Home = () => {

  const [category, setCategory] = useState('All')
  return (
    <>
    <Hero />
    <Features />
    <Categories category={category} setCategory={setCategory}/>
    <ProductDisplay category={category}/>
    <Offer />
    </>
  )
}

export default Home