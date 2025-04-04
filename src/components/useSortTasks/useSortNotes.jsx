import { useContext } from 'react'
import { AppContext } from '../../../context'


// Custom hook - сортировка заметки
export const UseSortNotes = () => {
  const { notes, setNotes } = useContext(AppContext)

  // Сортировка заметок по заголовку
  const sortedNotes = () => {
    const sortedTasks = [...notes].sort((a, b) =>
      a.title.localeCompare(b.title)
    )
    setNotes(sortedTasks)
  }

  return {
    sortedNotes,
  }
}
