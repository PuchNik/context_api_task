import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context'

export const useRequestGet = () => {
  const { notes, setNotes } = useContext(AppContext)

  useEffect(() => {
    fetch('http://localhost:3000/notes')
      .then((loadedData) => loadedData.json())
      .then((taskData) => setNotes(taskData))
  }, [notes, setNotes])

  return {
    notes,
    setNotes,
  }
}
