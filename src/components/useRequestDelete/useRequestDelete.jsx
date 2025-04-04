import { useContext } from 'react'
import { AppContext } from '../../../context'


// Custom Hook - удаление заметок
export const useRequestDelete = () => {
  const { setNotes } = useContext(AppContext)

  const deleteNote = (id) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: 'DELETE',
    })
      .then((rowResponse) => rowResponse.json())
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
      })
  }

  return {
    deleteNote,
  }
}
