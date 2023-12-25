import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Infinitescroll from './InfitineLayout'
import Filter from './Filter'
import SearchComponent from './SearchInput'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SearchComponent/>
      <Infinitescroll/>
    </>
  )
}

export default App
