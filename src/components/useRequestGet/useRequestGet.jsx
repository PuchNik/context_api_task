import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context'


// Custom hook - получение заметок
export const useRequestGet = () => {
  const { setNotes } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:3000/notes')
      .then((loadedData) => loadedData.json())
      .then((noteData) => setNotes(noteData))

      .finally(() => {
        setIsLoading(false)
      })
  }, [setNotes])

  return {
    isLoading,
  }
}
