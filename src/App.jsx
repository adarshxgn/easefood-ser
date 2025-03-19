import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './Pages/AboutPage'
import HomePage from './Pages/HomePage'
import CartPage from './Pages/CartPage'
import Landingpage from './Pages/Landingpage'
import TableTrackPage from './Pages/TableTrackPage'
import { useContext } from 'react'
import { pinAuthentication } from './Context API/ContextShare'
import Payment from './Pages/Payment'
import History from './Pages/History'

function App() {
  const {isAuthorized,setIsAuthorized} = useContext(pinAuthentication)
  return (
  <>
<Header/>
<Routes>
  <Route path='/' element={<Landingpage/>}/> 
  <Route path='table-track-page' element={<TableTrackPage/>}/>
  <Route path='home-page' element={<HomePage/>}/>
  <Route path='/about' element={<AboutPage/>}/>
  <Route path='/cart' element={<CartPage/>}/>
  <Route path='payment' element={<Payment/>}/>
  <Route path='history' element={<History/>}/>
</Routes>
<Footer/>
    </>
  )
}

export default App