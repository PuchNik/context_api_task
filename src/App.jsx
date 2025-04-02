import './App.css'
import { useState } from 'react'
import MainPage from './components/MainPage/MainPage'
import { AppContext } from '../context.js'

function App() {
  const [notes, setNotes] = useState([])

  return (
    <>
      <AppContext.Provider value={{ notes, setNotes }}>
        <MainPage />
      </AppContext.Provider>
    </>
  )
}
export default App
