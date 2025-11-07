import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'

function App() {
  const [data, setData] = useState("")


  useEffect(() => {
    const fetchdata = async () =>{
      const respond = await axios.get("http://localhost:5001/")
      setData(respond.data)
    }
    fetchdata()
  }, [])

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-500">{data} </h1>
    </>
  )
}

export default App
