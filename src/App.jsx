import { useState } from 'react'
import PortfolioWebsite from './PortfolioWebsite'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div>
    <PortfolioWebsite/>
   </div>
      
    </>
  )
}

export default App
