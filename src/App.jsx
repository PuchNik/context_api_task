import './App.css'
import { useState } from 'react'
import MainPage from './pages/mainPage/MainPage.jsx'
import { AppContext } from '../context.js'


function App() {
  // Состояние для хранения заметок и функция для их обновления
  const [notes, setNotes] = useState([])

  return (
    <AppContext.Provider value={{ notes, setNotes }}>
      <MainPage />
    </AppContext.Provider>
  )
}

export default App
